import Link from "next/link";
import { ShirtPreview } from "@/components/shirt-preview";

const designIdeas = [
  { id: "01", name: "Bir söz, çox şey.", type: "MƏTN İLƏ", design: "type" as const, color: "#f8f6ef", className: "market-look-type" },
  { id: "02", name: "Öz orbitində.", type: "FORMA İLƏ", design: "orbit" as const, color: "#20352c", className: "market-look-orbit" },
  { id: "03", name: "Bir az rəng. Bir az sən.", type: "TƏSVİR İLƏ", design: "flower" as const, color: "#f8f6ef", className: "market-look-flower" },
];

export default function Home() {
  return (
    <div className="market-home">
      <section className="market-hero">
        <div className="market-hero-copy">
          <p className="market-eyebrow"><span /> SƏNİN İDEYAN. SƏNİN İMZAN.</p>
          <h1>Sadəcə<br />geyinmə.<br /><em>Özünü yarat.</em></h1>
          <p className="market-intro">Ağlındakı bir fikir. Sevdiyin bir söz. Tam sənə aid bir dizayn. Hamısı bir t-shirt ilə başlayır.</p>
          <div className="market-hero-actions">
            <Link className="market-button" href="/products">Yaratmağa başla <span aria-hidden="true">↗</span></Link>
            <Link className="market-text-link" href="#nece-isleyir">Necə işləyir? <span aria-hidden="true">↓</span></Link>
          </div>
          <p className="market-note">İlkin prototip · dizayn et və brauzerində saxla</p>
        </div>
        <div className="market-hero-art">
          <div className="market-art-grid" aria-hidden="true" />
          <div className="market-main-preview">
            <div className="market-preview-top"><span>SƏNİN BOŞ KƏTANIN</span><span>001</span></div>
            <ShirtPreview />
            <div className="market-preview-bottom"><span>T-SHIRT / ÖN TƏRƏF</span><span aria-hidden="true">↗</span></div>
          </div>
          <div className="market-small-preview"><ShirtPreview color="#20352c" design="orbit" /><span>ÖZ ORBİTİNDƏ.</span></div>
          <div className="market-art-sticker" aria-hidden="true"><svg viewBox="0 0 80 80"><path d="m40 2 8 22 22-10-10 22 18 4-18 7 10 22-22-10-8 19-8-19-22 10 10-22-18-7 18-4-10-22 22 10Z" fill="currentColor" /></svg></div>
          <div className="market-art-caption"><span aria-hidden="true">✦</span> Boş bir səth. Sonsuz ideya.</div>
        </div>
      </section>

      <div className="market-manifesto"><span>MƏTN.</span><span>ŞƏKİL.</span><span>FANTAZİYA.</span><span className="market-manifesto-you">VƏ SƏN. <i aria-hidden="true">✳</i></span></div>

      <section className="market-ideas" aria-labelledby="ideas-title">
        <div className="market-section-heading">
          <div><p className="market-eyebrow">BAŞLAMAQ ÜÇÜN BİR FİKİR</p><h2 id="ideas-title">Bir t-shirt.<br /><em>Min cür sən.</em></h2></div>
          <p>Burada tək bir doğru dizayn yoxdur.<br />Bu nümunələr sadəcə başlanğıc fikirləridir.<br />İmza sənindir.</p>
        </div>
        <div className="market-looks">
          {designIdeas.map(idea => <article className="market-look" key={idea.id}>
            <div className={`market-look-image ${idea.className}`}><span className="market-look-number">/{idea.id}</span><ShirtPreview color={idea.color} design={idea.design} /></div>
            <div className="market-look-description"><div><p>{idea.type}</p><h3>{idea.name}</h3></div><Link href="/editor?product=classic-tshirt" aria-label={`${idea.name} — dizayn studiyasını aç`}><span aria-hidden="true">↗</span></Link></div>
          </article>)}
        </div>
      </section>

      <section className="market-process" id="nece-isleyir" aria-labelledby="process-title">
        <div className="market-section-heading"><div><p className="market-eyebrow">İDEYADAN DİZAYNA</p><h2 id="process-title">Üç addım.<br /><em>Tam sənin.</em></h2></div><Link className="market-text-link" href="/editor">Studiyaya keç <span aria-hidden="true">↗</span></Link></div>
        <div className="market-steps">
          <article><span className="market-step-number">01</span><h3>Səthini seç.</h3><p>İlk kətanımız t-shirt-dür. Studiyada rəngini seç və dizayn sahəsini gör.</p></article>
          <article><span className="market-step-number">02</span><h3>İzini qoy.</h3><p>Mətnini yaz, şəklini əlavə et. Yerini, ölçüsünü və rəngini özün müəyyənləşdir.</p></article>
          <article><span className="market-step-number">03</span><h3>İdeyanı saxla.</h3><p>Dizaynını brauzerində saxla və istədiyin vaxt davam et. Bu mərhələdə satış aktiv deyil.</p></article>
        </div>
      </section>

      <section className="market-last-call"><div><p className="market-eyebrow">İLK FİKRİN HAZIRDIR?</p><h2>Söz səndə.<br /><em>Kətan bizdə.</em></h2></div><Link className="market-button market-button-lime" href="/editor">Studiyanı aç <span aria-hidden="true">↗</span></Link><span className="market-last-spark" aria-hidden="true">✳</span></section>
    </div>
  );
}
