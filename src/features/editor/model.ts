import type { ImageLayer, StudioDocument, StudioLayer, TextLayer } from "./types.ts";

export const STORAGE_KEY = "creation-studio-document-v1";
export const AREA_WIDTH = 300;
export const AREA_HEIGHT = 360;
export const MAX_LAYERS = 40;
export const MAX_DOCUMENT_BYTES = 6 * 1024 * 1024;

const MIN_LAYER_SIZE = 12;
const MAX_IMAGE_DIMENSION = 16384;
const MAX_TEXT_LENGTH = 400;
const ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;
const PRODUCT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9:/._-]{0,255}$/;
const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
const FONT_FAMILIES = new Set(["Arial", "Georgia", "Verdana"]);
const PRODUCT_COLORS = new Set(["ivory", "ink", "sage"]);
const PRODUCT_SIZES = new Set(["S", "M", "L", "XL"]);

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const finiteOr = (value: number, fallback: number) =>
  Number.isFinite(value) ? value : fallback;

function bounds(width: number, height: number, rotation: number) {
  const radians = (rotation * Math.PI) / 180;
  const cosine = Math.abs(Math.cos(radians));
  const sine = Math.abs(Math.sin(radians));
  return {
    width: width * cosine + height * sine,
    height: width * sine + height * cosine,
  };
}

export function constrainLayer<T extends StudioLayer>(layer: T): T {
  let width = Math.max(0.01, finiteOr(layer.width, 120));
  let height = Math.max(0.01, finiteOr(layer.height, 80));
  const rotation = ((finiteOr(layer.rotation, 0) + 180) % 360 + 360) % 360 - 180;
  let outer = bounds(width, height, rotation);
  // Fit both dimensions together so resizing and extreme image ratios stay proportional.
  // The area limit takes precedence when a very thin image cannot reach the minimum size.
  const minimumScale = Math.max(1, MIN_LAYER_SIZE / width, MIN_LAYER_SIZE / height);
  const scale = Math.min(minimumScale, AREA_WIDTH / outer.width, AREA_HEIGHT / outer.height);
  width *= scale;
  height *= scale;
  outer = bounds(width, height, rotation);
  const centerX = clamp(finiteOr(layer.x, 0) + width / 2, outer.width / 2, AREA_WIDTH - outer.width / 2);
  const centerY = clamp(finiteOr(layer.y, 0) + height / 2, outer.height / 2, AREA_HEIGHT - outer.height / 2);
  const constrained = {
    ...layer,
    x: centerX - width / 2,
    y: centerY - height / 2,
    width,
    height,
    rotation,
  };
  if (constrained.kind === "text") {
    const fontSize = clamp(finiteOr(constrained.fontSize, 40), 8, 160);
    constrained.fontSize = clamp(fontSize * Math.min(1, scale), 8, 160);
  }
  return constrained;
}

export function createTextLayer(text = "Öz izini qoy."): TextLayer {
  return {
    id: crypto.randomUUID(),
    kind: "text",
    x: 40,
    y: 120,
    width: 220,
    height: 110,
    rotation: 0,
    text: text.slice(0, MAX_TEXT_LENGTH),
    fontFamily: "Arial",
    fontSize: 40,
    color: "#202832",
  };
}

function isRasterDataUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length > MAX_DOCUMENT_BYTES) return false;
  const match = /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if (!match || match[2].length % 4 !== 0) return false;
  try {
    const header = atob(match[2].slice(0, 32));
    if (match[1] === "png") return header.startsWith("\x89PNG\r\n\x1a\n");
    if (match[1] === "jpeg") return header.startsWith("\xff\xd8\xff");
    return header.startsWith("RIFF") && header.slice(8, 12) === "WEBP";
  } catch {
    return false;
  }
}

function isImageDimension(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0 && value <= MAX_IMAGE_DIMENSION;
}

export function createImageLayer(dataUrl: string, naturalWidth: number, naturalHeight: number): ImageLayer {
  if (!isRasterDataUrl(dataUrl) || !isImageDimension(naturalWidth) || !isImageDimension(naturalHeight)) {
    throw new Error("Şəkil PNG, JPEG və ya WebP formatında və etibarlı ölçüdə olmalıdır.");
  }
  const scale = Math.min(210 / naturalWidth, 260 / naturalHeight);
  const width = naturalWidth * scale;
  const height = naturalHeight * scale;
  return constrainLayer({
    id: crypto.randomUUID(),
    kind: "image",
    x: (AREA_WIDTH - width) / 2,
    y: (AREA_HEIGHT - height) / 2,
    width,
    height,
    rotation: 0,
    dataUrl,
    naturalWidth,
    naturalHeight,
  });
}

export function createDocument(): StudioDocument {
  return {
    schemaVersion: 1,
    id: crypto.randomUUID(),
    product: { id: "demo-tshirt", title: "Klassik T-shirt", color: "ivory", size: "M" },
    area: { width: AREA_WIDTH, height: AREA_HEIGHT },
    layers: [createTextLayer()],
  };
}

export function updateLayer(document: StudioDocument, id: string, patch: Partial<StudioLayer>): StudioDocument {
  const index = document.layers.findIndex((layer) => layer.id === id);
  if (index === -1) return document;
  const original = document.layers[index];
  const updated = constrainLayer({ ...original, ...patch, id: original.id, kind: original.kind } as StudioLayer);
  return { ...document, layers: document.layers.map((layer, position) => position === index ? updated : layer) };
}

export function moveLayer(document: StudioDocument, id: string, direction: "forward" | "backward"): StudioDocument {
  const index = document.layers.findIndex((layer) => layer.id === id);
  const destination = index + (direction === "forward" ? 1 : -1);
  if (index === -1 || destination < 0 || destination >= document.layers.length) return document;
  const layers = [...document.layers];
  [layers[index], layers[destination]] = [layers[destination], layers[index]];
  return { ...document, layers };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, keys: string[]) {
  return Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key));
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isLayer(value: unknown): value is StudioLayer {
  if (!isRecord(value) || typeof value.id !== "string" || !ID_PATTERN.test(value.id)) return false;
  if (![value.x, value.y, value.width, value.height, value.rotation].every(isFiniteNumber)) return false;
  const x = value.x as number;
  const y = value.y as number;
  const width = value.width as number;
  const height = value.height as number;
  const rotation = value.rotation as number;
  if (width <= 0 || width > AREA_WIDTH || height <= 0 || height > AREA_HEIGHT || rotation < -180 || rotation >= 180) return false;
  const outer = bounds(width, height, rotation);
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const tolerance = 0.000001;
  if (centerX - outer.width / 2 < -tolerance || centerX + outer.width / 2 > AREA_WIDTH + tolerance ||
      centerY - outer.height / 2 < -tolerance || centerY + outer.height / 2 > AREA_HEIGHT + tolerance) return false;
  const transformKeys = ["id", "kind", "x", "y", "width", "height", "rotation"];
  if (value.kind === "text") {
    return hasExactKeys(value, [...transformKeys, "text", "fontFamily", "fontSize", "color"]) &&
      typeof value.text === "string" && value.text.length <= MAX_TEXT_LENGTH &&
      typeof value.fontFamily === "string" && FONT_FAMILIES.has(value.fontFamily) &&
      isFiniteNumber(value.fontSize) && value.fontSize >= 8 && value.fontSize <= 160 &&
      typeof value.color === "string" && HEX_COLOR_PATTERN.test(value.color);
  }
  if (value.kind === "image") {
    return hasExactKeys(value, [...transformKeys, "dataUrl", "naturalWidth", "naturalHeight"]) &&
      isRasterDataUrl(value.dataUrl) && isImageDimension(value.naturalWidth) && isImageDimension(value.naturalHeight);
  }
  return false;
}

export function parseDocument(raw: string): StudioDocument | null {
  if (typeof raw !== "string" || raw.length > MAX_DOCUMENT_BYTES || new TextEncoder().encode(raw).byteLength > MAX_DOCUMENT_BYTES) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || !hasExactKeys(value, ["schemaVersion", "id", "product", "area", "layers"]) || value.schemaVersion !== 1 ||
        typeof value.id !== "string" || !ID_PATTERN.test(value.id)) return null;
    if (!isRecord(value.area) || !hasExactKeys(value.area, ["width", "height"]) || value.area.width !== AREA_WIDTH || value.area.height !== AREA_HEIGHT) return null;
    if (!isRecord(value.product) || !hasExactKeys(value.product, ["id", "title", "color", "size"]) ||
        typeof value.product.id !== "string" || !PRODUCT_ID_PATTERN.test(value.product.id) ||
        typeof value.product.title !== "string" || !value.product.title.trim() || value.product.title.length > 160 ||
        typeof value.product.color !== "string" || !PRODUCT_COLORS.has(value.product.color) ||
        typeof value.product.size !== "string" || !PRODUCT_SIZES.has(value.product.size)) return null;
    if (!Array.isArray(value.layers) || value.layers.length > MAX_LAYERS || !value.layers.every(isLayer) ||
        new Set(value.layers.map((layer) => layer.id)).size !== value.layers.length) return null;
    return value as StudioDocument;
  } catch {
    return null;
  }
}
