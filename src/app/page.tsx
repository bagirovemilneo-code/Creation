import Image from "next/image";
import Link from "next/link";
import { ShirtPreview } from "@/components/shirt-preview";
import { UiIcon } from "@/components/ui-icon";

const designIdeas = [
  { name: "Sözün imzandır.", design: "type" as const, color: "#f7f5ee", className: "market-look-type" },
  { name: "Öz orbitində.", design: "orbit" as const, color: "#303633", className: "market-look-orbit" },
  { name: "Bir az rəng. Tam sən.", design: "flower" as const, color: "#f7f5ee", className: "market-look-flower" },
];

export default function Home() {
  return <div className="market-home">
    <section className="market-hero">
      <div className="market-hero-copy">
        <h1>İdeyanı<br /><span>geyin.</span></h1>
        <p className="market-intro">Mətnin, şəklin, üslubun. Öz t-shirt dizaynını Creation studiyasında yarat.</p>
        <div className="market-hero-actions">
          <Link className="market-button" href="/products">Yaratmağa başla <UiIcon name="arrow" /></Link>
          <Link className="market-text-link" href="#nece-isleyir">Necə işləyir <UiIcon name="down" /></Link>
        </div>
      </div>
      <div className="market-hero-art">
        <div className="market-hero-product">
          <Image className="market-hero-photo" src="/images/creation-hero-v1.webp" width={1122} height={1402} sizes="(max-width: 640px) 100vw, 48vw" loading="eager" alt="Krem t-shirt üzərində nümunə dizaynın yaradıcı önizləməsi" />
          <div className="market-hero-print" aria-hidden="true"><span>Öz izini<br />qoy.</span></div>
          <div className="market-hero-bottom"><span>Klassik T-shirt</span><Link href="/editor?product=classic-tshirt" aria-label="Klassik T-shirt üçün studiyanı aç"><UiIcon name="arrow" /></Link></div>
        </div>
      </div>
    </section>

    <section className="market-ideas" aria-labelledby="ideas-title">
      <div className="market-section-heading"><div><h2 id="ideas-title">Sənin üslubun.<br /><span>Sənin başlanğıcın.</span></h2></div><p>Bir sözlə və ya bir təsvirlə başla.<br />Qalanını özün yarat.</p></div>
      <div className="market-looks">{designIdeas.map(idea => <article className="market-look" key={idea.design}>
        <Link href="/editor?product=classic-tshirt" className={"market-look-image " + idea.className} aria-label={idea.name + " — studiyanı aç"}><ShirtPreview color={idea.color} design={idea.design} /></Link>
        <div className="market-look-description"><h3>{idea.name}</h3><Link href="/editor?product=classic-tshirt" aria-label={idea.name + " — öz dizaynını yarat"}><UiIcon name="arrow" /></Link></div>
      </article>)}</div>
    </section>

    <section className="market-process" id="nece-isleyir" aria-labelledby="process-title">
      <div className="market-section-heading"><div><h2 id="process-title">Fikirdən ilk dizayna.</h2></div><Link className="market-text-link" href="/editor?product=classic-tshirt">Studiyanı kəşf et <UiIcon name="arrow" /></Link></div>
      <div className="market-steps">
        <article><span className="market-step-icon"><UiIcon name="product" /></span><h3>Məhsulunu seç.</h3><p>T-shirt ilə başla. Rəngini və ölçüsünü studiyada seç.</p></article>
        <article><span className="market-step-icon"><UiIcon name="text" /></span><h3>Dizaynını yarat.</h3><p>Mətn və şəkil əlavə et. Yerini, ölçüsünü və rəngini özün müəyyən et.</p></article>
        <article><span className="market-step-icon"><UiIcon name="check" /></span><h3>Eskizini saxla.</h3><p>Dizaynı önizlə və bu brauzerdə saxla. İstədiyin vaxt davam et.</p></article>
      </div>
    </section>
    <section className="market-last-call"><div><h2>İlk fikrinə<br />yer aç.</h2></div><Link className="market-button market-button-secondary" href="/editor?product=classic-tshirt">Studiyanı aç <UiIcon name="arrow" /></Link></section>
  </div>;
}