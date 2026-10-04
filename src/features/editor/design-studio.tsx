"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import {
  AREA_WIDTH, AREA_HEIGHT, MAX_LAYERS, STORAGE_KEY,
  createDocument, createTextLayer, createImageLayer, updateLayer, moveLayer, parseDocument,
} from "./model";
import type { StudioDocument, StudioLayer, TextLayer } from "./types";

const garmentColors = [
  { id: "ivory", label: "Krem", value: "#f7f5ee" },
  { id: "ink", label: "Qara", value: "#303633" },
  { id: "sage", label: "Adaçayı", value: "#adb5a0" },
] as const;
const fonts = ["Arial", "Georgia", "Verdana"] as const;
type Tab = "text" | "image" | "layers";
type Drag = { id: string; mode: "move" | "resize"; x: number; y: number; original: StudioLayer; moved: boolean; document: StudioDocument };

export function DesignStudio({ productId, productTitle }: { productId?: string; productTitle?: string }) {
  const [document, setDocument] = useState<StudioDocument>(() => {
    const initial = createDocument();
    if (productId) initial.product.id = productId;
    if (productTitle) initial.product.title = productTitle;
    return initial;
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("text");
  const [status, setStatus] = useState("Yeni dizayn");
  const [message, setMessage] = useState("");
  const [scale, setScale] = useState(0.7);
  const [history, setHistory] = useState({ undo: 0, redo: 0 });
  const [showGuides, setShowGuides] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [textOverflow, setTextOverflow] = useState(false);
  const documentRef = useRef(document);
  const textRef = useRef<HTMLSpanElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const past = useRef<StudioDocument[]>([]);
  const future = useRef<StudioDocument[]>([]);
  const selected = document.layers.find(layer => layer.id === selectedId);
  const selectedText = selected?.kind === "text" ? selected : undefined;
  const garment = garmentColors.find(color => color.id === document.product.color)!;

  useEffect(() => { documentRef.current = document; }, [document]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const node = textRef.current;
      setTextOverflow(Boolean(node && (node.scrollHeight > node.clientHeight + 1 || node.scrollWidth > node.clientWidth + 1)));
    });
    return () => cancelAnimationFrame(frame);
  }, [selectedText, scale]);

  useEffect(() => {
    const node = areaRef.current;
    if (!node) return;
    const observer = new ResizeObserver(entries => setScale(entries[0].contentRect.width / AREA_WIDTH));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const saved = parseDocument(raw);
        if (!saved) { setMessage("Saxlanmış dizayn açılmadı. Yeni dizaynla davam edə bilərsən."); return; }
        // A product selection should always open that product rather than another saved one.
        if (productId && saved.product.id !== productId) return;
        setDocument(saved);
        setStatus("Saxlanmış dizayn açıldı");
      } catch { setMessage("Brauzerdə yaddaşa giriş mümkün olmadı."); }
    });
    return () => cancelAnimationFrame(frame);
  }, [productId]);

  function checkpoint(snapshot = document) {
    past.current = [...past.current.slice(-14), snapshot];
    future.current = [];
    setHistory({ undo: past.current.length, redo: 0 });
  }
  function commit(next: StudioDocument, remember = true, previous = document) {
    if (remember) checkpoint(previous);
    setDocument(next);
    setStatus("Saxlanmamış dəyişikliklər");
    setMessage("");
  }
  function patchLayer(patch: Partial<StudioLayer>) {
    if (selected) commit(updateLayer(document, selected.id, patch));
  }
  function addText(text = "Sənin sözün.", style?: Partial<TextLayer>) {
    if (document.layers.length >= MAX_LAYERS) { setMessage("Ən çox 40 qat əlavə edə bilərsən."); return; }
    const layer = { ...createTextLayer(text), ...style };
    commit({ ...document, layers: [...document.layers, layer] });
    setSelectedId(layer.id);
    setTab("text");
  }
  function undo() {
    const previous = past.current.pop();
    if (!previous) return;
    future.current.push(document);
    setDocument(previous); setSelectedId(null); setStatus("Saxlanmamış dəyişikliklər");
    setHistory({ undo: past.current.length, redo: future.current.length });
  }
  function redo() {
    const next = future.current.pop();
    if (!next) return;
    past.current.push(document);
    setDocument(next); setSelectedId(null); setStatus("Saxlanmamış dəyişikliklər");
    setHistory({ undo: past.current.length, redo: future.current.length });
  }
  function save() {
    try {
      const raw = JSON.stringify(document);
      if (!parseDocument(raw)) { setMessage("Dizayn saxlanmadı. Şəkil həcmini və qatları yoxla."); return; }
      localStorage.setItem(STORAGE_KEY, raw);
      setStatus("Bu brauzerdə saxlanıb");
      setMessage("Dizayn bu brauzerdə saxlandı. Eyni brauzerdə studiyaya qayıdanda açılacaq.");
    } catch { setMessage("Yaddaş doludur və ya bağlıdır. Şəkillərin sayını azaldıb yenidən yoxla."); }
  }
  async function upload(file?: File) {
    if (!file) return;
    if (document.layers.length >= MAX_LAYERS) { setMessage("Ən çox 40 qat əlavə edə bilərsən."); return; }
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) { setMessage("PNG, JPG və ya WebP şəkli seç."); return; }
    if (file.size > 2 * 1024 * 1024) { setMessage("Şəkil ən çox 2 MB ola bilər."); return; }
    setUploading(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("read"));
        reader.readAsDataURL(file);
      });
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img); img.onerror = () => reject(new Error("decode")); img.src = dataUrl;
      });
      const layer = createImageLayer(dataUrl, image.naturalWidth, image.naturalHeight);
      const latest = documentRef.current;
      if (latest.layers.length >= MAX_LAYERS) throw new Error("layers");
      const next = { ...latest, layers: [...latest.layers, layer] };
      if (!parseDocument(JSON.stringify(next))) throw new Error("size");
      commit(next, true, latest); setSelectedId(layer.id); setTab("image");
      setMessage("Şəkil əlavə edildi. Sürüşdürərək yerini dəyiş.");
    } catch { setMessage("Şəkil əlavə edilmədi. Etibarlı və daha kiçik bir şəkil seç."); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  }
  function beginDrag(event: PointerEvent<HTMLElement>, layer: StudioLayer, mode: "move" | "resize") {
    if (event.button !== 0) return;
    event.preventDefault(); event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedId(layer.id);
    setTab(layer.kind === "text" ? "text" : "image");
    dragRef.current = { id: layer.id, mode, x: event.clientX, y: event.clientY, original: layer, moved: false, document };
  }
  function drag(event: PointerEvent) {
    const active = dragRef.current;
    if (!active) return;
    const dx = (event.clientX - active.x) / scale;
    const dy = (event.clientY - active.y) / scale;
    if (!active.moved && Math.abs(dx) + Math.abs(dy) < 2) return;
    if (!active.moved) { checkpoint(active.document); active.moved = true; }
    if (active.mode === "move") {
      setDocument(prev => updateLayer(prev, active.id, { x: active.original.x + dx, y: active.original.y + dy }));
    } else {
      const ratio = Math.max(0.25, Math.min(3, (active.original.width + dx) / active.original.width));
      setDocument(prev => updateLayer(prev, active.id, {
        width: active.original.width * ratio, height: active.original.height * ratio,
        ...(active.original.kind === "text" ? { fontSize: active.original.fontSize * ratio } : {}),
      }));
    }
    setStatus("Saxlanmamış dəyişikliklər");
  }
  function deleteSelected() {
    if (!selected) return;
    commit({ ...document, layers: document.layers.filter(layer => layer.id !== selected.id) });
    setSelectedId(null);
  }
  function newDesign() {
    const fresh = createDocument();
    fresh.product = { ...document.product };
    commit(fresh); setSelectedId(null);
  }

  return <section className="studio">
    <div className="studio-topbar">
      <div className="studio-title"><Link href="/products" aria-label="Məhsullara qayıt">←</Link>
        <div><h1>Dizayn studiyası<span>01</span></h1><p>{status}</p></div>
      </div>
      <div className="studio-actions">
        <button type="button" className="studio-icon-button" onClick={undo} disabled={!history.undo} aria-label="Geri al" title="Geri al">↶</button>
        <button type="button" className="studio-icon-button" onClick={redo} disabled={!history.redo} aria-label="Yenidən et" title="Yenidən et">↷</button>
        <button type="button" className="studio-save" onClick={save}>Dizaynı saxla <span>↗</span></button>
      </div>
    </div>
    <div className="studio-workspace">
      <aside className="studio-tools" aria-label="Dizayn alətləri">
        <p className="studio-kicker">SƏNİN YARADICILIQ KİTİN</p>
        <div className="studio-tabs" role="tablist" aria-label="Alətlər">
          {([["text", "T", "Mətn"], ["image", "▧", "Şəkil"], ["layers", "▱", "Qatlar"]] as const).map(([id, icon, label]) =>
            <button type="button" key={id} role="tab" tabIndex={tab === id ? 0 : -1} aria-selected={tab === id} aria-controls={"panel-" + id} id={"tab-" + id} onClick={() => setTab(id)} onKeyDown={event => {
              const tabs: Tab[] = ["text", "image", "layers"];
              const index = tabs.indexOf(id);
              const next = event.key === "ArrowRight" ? tabs[(index + 1) % 3] : event.key === "ArrowLeft" ? tabs[(index + 2) % 3] : event.key === "Home" ? tabs[0] : event.key === "End" ? tabs[2] : undefined;
              if (next) { event.preventDefault(); setTab(next); event.currentTarget.parentElement?.querySelector<HTMLButtonElement>("#tab-" + next)?.focus(); }
            }}><span>{icon}</span>{label}</button>)}
        </div>
        <div className="studio-tool-content" role="tabpanel" id={"panel-" + tab} aria-labelledby={"tab-" + tab}>
          {tab === "text" && <>
            <h2>Bir sözlə başla.</h2><p className="studio-muted">Sənə aid bir cümlə. Ya da sadəcə adın.</p>
            <button type="button" className="studio-add" onClick={() => addText()}>＋ Mətn əlavə et</button>
            {selectedText && <div className="studio-fields">
              <label>Mətn<textarea aria-label="Dizayn mətni" maxLength={240} value={selectedText.text} onChange={event => patchLayer({ text: event.target.value })} rows={3} /></label>
              {textOverflow && <p className="studio-overflow" role="status">Mətnin bir hissəsi çərçivəyə sığmır. Şrifti kiçilt, çərçivəni böyüt və ya mətni qısalt.</p>}
              <label>Şrift<select value={selectedText.fontFamily} onChange={event => patchLayer({ fontFamily: event.target.value as TextLayer["fontFamily"] })}>{fonts.map(font => <option key={font}>{font}</option>)}</select></label>
              <div className="studio-field-row">
                <label>Ölçü<input aria-label="Mətn ölçüsü" type="number" min={8} max={160} value={Math.round(selectedText.fontSize)} onChange={event => { const size = Number(event.target.value); if (size >= 8 && size <= 160) patchLayer({ fontSize: size }); }} /></label>
                <label>Rəng<input aria-label="Mətn rəngi" type="color" value={selectedText.color} onChange={event => patchLayer({ color: event.target.value })} /></label>
              </div>
            </div>}
            <div className="studio-templates"><p className="studio-kicker">İLK İLHAM</p>
              <button type="button" onClick={() => addText("öz ritmində.", { fontFamily: "Georgia", fontSize: 32 })}><em>öz ritmində.</em><span>＋</span></button>
              <button type="button" onClick={() => addText("BAKU\nSTATE OF MIND", { fontSize: 28 })}><strong>BAKU<br />STATE OF MIND</strong><span>＋</span></button>
            </div>
          </>}
          {tab === "image" && <>
            <h2>Öz təsvirini gətir.</h2><p className="studio-muted">İllüstrasiya, foto və ya öz loqon.</p>
            <button type="button" className="studio-upload" onClick={() => fileRef.current?.click()} disabled={uploading}><span>↥</span><strong>{uploading ? "Şəkil açılır…" : "Şəkil seç"}</strong><small>PNG, JPG, WebP · ən çox 2 MB</small></button>
            <p className="studio-hint">Şəffaf fonlu PNG dizaynın t-shirt üzərində təbii görünməsinə kömək edir.</p>
          </>}
          {tab === "layers" && <>
            <h2>Hər şey öz yerində.</h2><p className="studio-muted">Yuxarıdakı qat önizləmədə öndə görünür.</p>
            <div className="studio-layer-list">{[...document.layers].reverse().map(layer =>
              <button type="button" key={layer.id} aria-pressed={selectedId === layer.id} onClick={() => setSelectedId(layer.id)}><span>{layer.kind === "text" ? "T" : "▧"}</span><strong>{layer.kind === "text" ? layer.text || "Boş mətn" : "Yüklənmiş şəkil"}</strong></button>)}</div>
            {!document.layers.length && <p className="studio-hint">Mətn və ya şəkil əlavə edəndə qatlar burada görünəcək.</p>}
          </>}
        </div>
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" className="studio-hidden-input" aria-label="Şəkil faylı" onChange={event => void upload(event.target.files?.[0])} />
        <div className="studio-ai-note"><span>✳</span><div><strong>İdeyadan təsvirə</strong><p>AI ilə yaratma növbəti mərhələdə.</p></div><small>Tezliklə</small></div>
      </aside>
      <div className="studio-preview">
        <div className="studio-preview-heading"><span><i /> Canlı önizləmə</span><button type="button" onClick={() => setShowGuides(!showGuides)} aria-pressed={showGuides}>{showGuides ? "Çərçivəni gizlət" : "Çərçivəni göstər"}</button></div>
        <div className="studio-garment" style={{ "--shirt-color": garment.value } as CSSProperties}>
          <svg className="studio-shirt" viewBox="0 0 520 580" aria-hidden="true">
            <defs><filter id="shirt-shadow"><feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity=".09" /></filter></defs>
            <path d="M174 71 95 110 37 208 123 251 151 206 141 510Q260 539 379 510L369 206 397 251 483 208 425 110 346 71Q260 112 174 71Z" fill={garment.value} stroke={document.product.color === "ink" ? "#444e46" : "#d2d0c5"} strokeWidth="1.5" filter="url(#shirt-shadow)" />
            <path d="M195 81Q260 159 325 81" fill="none" stroke={document.product.color === "ink" ? "#444e46" : "#d2d0c5"} strokeWidth="4" />
            <path d="M144 497Q260 524 376 497M53 205 126 242M394 242 467 205" fill="none" stroke={document.product.color === "ink" ? "#444e46" : "#dedcd2"} />
          </svg>
          <div ref={areaRef} className={"studio-print-area" + (showGuides ? " with-guides" : "")} onPointerDown={event => { if (event.target === event.currentTarget) setSelectedId(null); }}>
            {showGuides && <span className="studio-area-label">DİZAYN SAHƏSİ</span>}
            <div className="studio-layer-space" style={{ width: AREA_WIDTH, height: AREA_HEIGHT, transform: `scale(${scale})` }} onPointerMove={drag} onPointerUp={() => { dragRef.current = null; }} onPointerCancel={() => { dragRef.current = null; }} onPointerDown={event => { if (event.target === event.currentTarget) setSelectedId(null); }}>
              {document.layers.map(layer => <div key={layer.id} role="button" tabIndex={0} aria-label={layer.kind === "text" ? "Mətn: " + layer.text : "Şəkil qatı"} aria-pressed={layer.id === selectedId} className={"studio-canvas-layer" + (layer.id === selectedId ? " selected" : "")}
                style={{ left: layer.x, top: layer.y, width: layer.width, height: layer.height, transform: `rotate(${layer.rotation}deg)` }}
                onPointerDown={event => beginDrag(event, layer, "move")}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedId(layer.id); setTab(layer.kind === "text" ? "text" : "image"); }
                  const delta = event.shiftKey ? 10 : 2;
                  const positions: Record<string, { x?: number; y?: number }> = { ArrowLeft: { x: layer.x - delta }, ArrowRight: { x: layer.x + delta }, ArrowUp: { y: layer.y - delta }, ArrowDown: { y: layer.y + delta } };
                  if (positions[event.key]) { event.preventDefault(); commit(updateLayer(document, layer.id, positions[event.key])); }
                }}>
                {layer.kind === "text" ? <span ref={layer.id === selectedId ? textRef : undefined} className="studio-canvas-text" style={{ fontFamily: layer.fontFamily, fontSize: layer.fontSize, color: layer.color }}>{layer.text}</span> :
                  /* User raster data URLs are validated before rendering; next/image optimization is unnecessary. */
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={layer.dataUrl} alt="" draggable={false} />}
                {layer.id === selectedId && <span className="studio-resize-handle" style={{ width: 24 / scale, height: 24 / scale, right: -12 / scale, bottom: -12 / scale, borderWidth: 2 / scale }} aria-hidden="true" onPointerDown={event => beginDrag(event, layer, "resize")} />}
              </div>)}
            </div>
          </div>
        </div>
        <div className="studio-preview-bottom"><span>Ön tərəf</span><p>Qatı seç və sürüşdür. Küncdən ölçüsünü dəyiş.</p><span>2D önizləmə</span></div>
      </div>
      <aside className="studio-details" aria-label="Məhsul və qat parametrləri">
        <p className="studio-kicker">SƏNİN KƏTANIN</p><h2>{document.product.title}</h2><p className="studio-muted">Klassik forma. Tamamilə sənin imzan.</p>
        <div className="studio-detail-group"><p>Rəng <span>{garment.label}</span></p><div className="studio-swatches">{garmentColors.map(color => <button type="button" key={color.id} aria-label={color.label + " t-shirt"} aria-pressed={document.product.color === color.id} style={{ background: color.value }} onClick={() => commit({ ...document, product: { ...document.product, color: color.id } })} />)}</div></div>
        <div className="studio-detail-group"><p>Ölçü</p><div className="studio-sizes">{(["S", "M", "L", "XL"] as const).map(size => <button type="button" key={size} aria-pressed={document.product.size === size} onClick={() => commit({ ...document, product: { ...document.product, size } })}>{size}</button>)}</div></div>
        <p className="studio-hint">Rəng və ölçülər nümunədir. Məhsul variantları satışdan əvvəl təsdiqlənəcək.</p>
        {selected && <div className="studio-selection">
          <p className="studio-kicker">SEÇİLMİŞ QAT</p>
          <div className="studio-field-row"><label>En<input aria-label="Qatın eni" type="number" min={20} max={300} value={Math.round(selected.width)} onChange={event => { const width = Number(event.target.value); if (width >= 20 && width <= 300) { const ratio = width / selected.width; patchLayer({ width, height: selected.height * ratio, ...(selected.kind === "text" ? { fontSize: selected.fontSize * ratio } : {}) }); } }} /></label>
            <label>Dönmə<input aria-label="Qatın dönməsi" type="number" min={-180} max={180} value={Math.round(selected.rotation)} onChange={event => { const rotation = Number(event.target.value); if (rotation >= -180 && rotation <= 180) patchLayer({ rotation }); }} /></label></div>
          <div className="studio-field-row"><label>X<input aria-label="Üfüqi mövqe" type="number" min={0} max={300} value={Math.round(selected.x)} onChange={event => patchLayer({ x: Number(event.target.value) })} /></label><label>Y<input aria-label="Şaquli mövqe" type="number" min={0} max={360} value={Math.round(selected.y)} onChange={event => patchLayer({ y: Number(event.target.value) })} /></label></div>
          {selected.kind === "text" && <label>Çərçivənin hündürlüyü<input aria-label="Mətn çərçivəsinin hündürlüyü" type="number" min={12} max={360} value={Math.round(selected.height)} onChange={event => { const height = Number(event.target.value); if (height >= 12 && height <= 360) patchLayer({ height }); }} /></label>}
          <div className="studio-layer-controls"><button type="button" onClick={() => commit(moveLayer(document, selected.id, "backward"))}>↓ Arxaya</button><button type="button" onClick={() => commit(moveLayer(document, selected.id, "forward"))}>↑ Önə</button><button type="button" onClick={deleteSelected}>Sil</button></div>
        </div>}
        <div className="studio-summary"><span>{document.layers.length} qat</span><span>{document.product.size} / {garment.label}</span></div>
        <button type="button" className="studio-new" onClick={newDesign}>Yeni dizayna başla ↗</button>
        <div className="studio-prototype"><strong>İlk eskizini yarat.</strong><p>Hazırda dizaynı önizləyə və bu brauzerdə saxlaya bilərsən. Sifariş növbəti mərhələdə açılacaq.</p></div>
      </aside>
    </div>
    <div className="studio-message" role="status" aria-live="polite">{message || "İdeyanı sına. Dizayn sahəsi və önizləmə ölçüləri hələ çap üçün təsdiqlənməyib."}</div>
  </section>;
}
