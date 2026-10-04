import test from "node:test";
import assert from "node:assert/strict";
import {
  AREA_WIDTH, AREA_HEIGHT, MAX_DOCUMENT_BYTES, MAX_LAYERS,
  createDocument, createTextLayer, createImageLayer, constrainLayer,
  updateLayer, moveLayer, parseDocument,
} from "../src/features/editor/model.ts";

const PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aD7EAAAAASUVORK5CYII=";
const clone = (value) => JSON.parse(JSON.stringify(value));

test("prototype documents use logical pixels and survive a storage round trip", () => {
  const document = createDocument();
  document.layers.push(createImageLayer(PNG, 1000, 500));
  assert.deepEqual(document.area, { width: 300, height: 360 });
  assert.deepEqual(parseDocument(JSON.stringify(document)), document);
  assert.notEqual(createDocument().id, document.id);
});

test("moving and resizing keep the rotated layer inside the design area", () => {
  for (const rotation of [-180, -135, -45, 0, 40, 90, 540]) {
    const original = { ...createTextLayer(), x: -900, y: 900, width: 999, height: 999, rotation };
    const result = constrainLayer(original);
    const radians = result.rotation * Math.PI / 180;
    const outerWidth = result.width * Math.abs(Math.cos(radians)) + result.height * Math.abs(Math.sin(radians));
    const outerHeight = result.width * Math.abs(Math.sin(radians)) + result.height * Math.abs(Math.cos(radians));
    assert.ok(result.x + result.width / 2 - outerWidth / 2 >= -0.000001);
    assert.ok(result.x + result.width / 2 + outerWidth / 2 <= AREA_WIDTH + 0.000001);
    assert.ok(result.y + result.height / 2 - outerHeight / 2 >= -0.000001);
    assert.ok(result.y + result.height / 2 + outerHeight / 2 <= AREA_HEIGHT + 0.000001);
    const document = createDocument();
    document.layers = [result];
    assert.deepEqual(parseDocument(JSON.stringify(document)), document);
    assert.equal(original.x, -900);
  }
});

test("image layers keep the uploaded aspect ratio and reject active content", () => {
  const image = createImageLayer(PNG, 1200, 600);
  assert.equal(image.width / image.height, 2);
  assert.equal(image.x, (AREA_WIDTH - image.width) / 2);
  assert.throws(() => createImageLayer("data:image/svg+xml;base64,PHN2Zz4=", 100, 100));
  assert.throws(() => createImageLayer("data:image/png;base64,PHN2Zz4=", 100, 100));
  assert.throws(() => createImageLayer("https://example.com/image.png", 100, 100));
  assert.throws(() => createImageLayer(PNG, 0, 100));
});

test("oversized proportional resizes retain the requested aspect ratio", () => {
  const image = constrainLayer({ ...createImageLayer(PNG, 1000, 500), width: 440, height: 220 });
  assert.equal(image.width, 300);
  assert.equal(image.height, 150);
  assert.equal(image.width / image.height, 2);
  const skinny = createImageLayer(PNG, 16000, 1);
  assert.ok(Math.abs(skinny.width / skinny.height - 16000) < 0.000001);
  assert.ok(skinny.width <= AREA_WIDTH);
  assert.ok(skinny.height > 0);
});

test("rotated text and its font shrink by the same factor when fitting the area", () => {
  const desired = { ...createTextLayer(), width: 440, height: 220, fontSize: 80, rotation: 45 };
  const fitted = constrainLayer(desired);
  const expectedScale = AREA_WIDTH / ((desired.width + desired.height) * Math.SQRT1_2);
  assert.ok(Math.abs(fitted.width - desired.width * expectedScale) < 0.000001);
  assert.ok(Math.abs(fitted.height - desired.height * expectedScale) < 0.000001);
  assert.ok(Math.abs(fitted.fontSize - desired.fontSize * expectedScale) < 0.000001);
  assert.ok(Math.abs(fitted.width / fitted.height - 2) < 0.000001);
  const document = createDocument();
  document.layers = [fitted];
  assert.deepEqual(parseDocument(JSON.stringify(document)), document);
});

test("updates preserve identity and leave the previous document unchanged", () => {
  const document = createDocument();
  const previous = clone(document);
  const selected = document.layers[0];
  const updated = updateLayer(document, selected.id, { text: "Yeni fikir", x: -20, id: "replacement" });
  assert.equal(updated.layers[0].text, "Yeni fikir");
  assert.equal(updated.layers[0].id, selected.id);
  assert.equal(updated.layers[0].x, 0);
  assert.deepEqual(document, previous);
  assert.equal(updateLayer(document, "missing", { x: 30 }), document);
});

test("layer ordering moves one position toward the top or bottom without mutation", () => {
  const document = createDocument();
  document.layers.push(createTextLayer("İkinci"), createTextLayer("Üçüncü"));
  const ids = document.layers.map((layer) => layer.id);
  const raised = moveLayer(document, ids[0], "forward");
  assert.deepEqual(raised.layers.map((layer) => layer.id), [ids[1], ids[0], ids[2]]);
  assert.deepEqual(moveLayer(raised, ids[0], "backward"), document);
  assert.deepEqual(document.layers.map((layer) => layer.id), ids);
  assert.equal(moveLayer(document, ids[0], "backward"), document);
  assert.equal(moveLayer(document, ids[2], "forward"), document);
});

test("import rejects duplicate IDs, unsafe identities and malformed transforms", () => {
  const cases = [
    (document) => document.layers.push(clone(document.layers[0])),
    (document) => { document.id = "../outside"; },
    (document) => { document.layers[0].id = "<script>"; },
    (document) => { document.layers[0].x = "40"; },
    (document) => { document.layers[0].width = -5; },
    (document) => { document.layers[0].height = 0; },
    (document) => { document.layers[0].rotation = 360; },
    (document) => { document.layers[0].x = 900; },
    (document) => { document.layers[0].fontSize = 1000; },
    (document) => { document.layers[0].fontFamily = "url(evil)"; },
    (document) => { document.layers[0].color = "url(evil)"; },
    (document) => { document.layers[0].extra = "unsupported"; },
  ];
  for (const mutate of cases) {
    const document = createDocument();
    mutate(document);
    assert.equal(parseDocument(JSON.stringify(document)), null);
  }
  assert.equal(parseDocument(JSON.stringify(createDocument()).replace('"x":40', '"x":1e309')), null);
});

test("import rejects invalid products and unsupported document schemas", () => {
  const cases = [
    (document) => { document.schemaVersion = 2; },
    (document) => { document.area.width = 301; },
    (document) => { document.product.color = "red"; },
    (document) => { document.product.size = "XXL"; },
    (document) => { document.product.id = ""; },
    (document) => { document.product.title = "  "; },
    (document) => { document.coordinateUnit = "mm"; },
  ];
  for (const mutate of cases) {
    const document = createDocument();
    mutate(document);
    assert.equal(parseDocument(JSON.stringify(document)), null);
  }
  const document = createDocument();
  document.product.id = "gid://shopify/Product/123";
  assert.deepEqual(parseDocument(JSON.stringify(document)), document);
});

test("imports reject oversized documents and accept the maximum layer count", () => {
  const document = createDocument();
  document.layers = Array.from({ length: MAX_LAYERS }, () => createTextLayer());
  assert.deepEqual(parseDocument(JSON.stringify(document)), document);
  document.layers.push(createTextLayer());
  assert.equal(parseDocument(JSON.stringify(document)), null);
  assert.equal(parseDocument(" ".repeat(MAX_DOCUMENT_BYTES + 1)), null);
  assert.equal(parseDocument("{"), null);
  assert.equal(parseDocument("null"), null);
});

test("imports reject unsafe image URLs and invalid image dimensions", () => {
  for (const dataUrl of ["javascript:alert(1)", "data:image/svg+xml;base64,PHN2Zz4=", "data:image/png;base64,PHN2Zz4=", "data:image/png;base64,invalid", "https://example.com/image.png"]) {
    const document = createDocument();
    document.layers = [{ ...createImageLayer(PNG, 100, 100), dataUrl }];
    assert.equal(parseDocument(JSON.stringify(document)), null);
  }
  const document = createDocument();
  document.layers = [{ ...createImageLayer(PNG, 100, 100), naturalWidth: 0 }];
  assert.equal(parseDocument(JSON.stringify(document)), null);
});
