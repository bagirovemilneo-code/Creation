import Image from "next/image";
import Link from "next/link";

const editorialLooks = [
  {
    title: "Mətnlə yarat",
    description: "Sözünü geyin.",
    image: "/images/creation-hero-v1.webp",
    position: "50% 24%",
  },
  {
    title: "Şəkildən yarat",
    description: "Vizualını məhsula çevir.",
    image: "/images/creation-hero-v1.webp",
    position: "42% 48%",
  },
  {
    title: "Tam sənlik",
    description: "Rəngindən yerləşiminə qədər.",
    image: "/images/creation-hero-v1.webp",
    position: "63% 50%",
  },
];

const steps = [
  {
    number: "01",
    title: "Məhsulunu seç",
    description:
      "Başlanğıc üçün t-shirt seç. Rəngini və ölçünü studiyada müəyyən et.",
  },
  {
    number: "02",
    title: "Dizaynını yarat",
    description:
      "Mətn, şəkil və şəxsi ideyanı əlavə et. Hər detalı özün idarə et.",
  },
  {
    number: "03",
    title: "Hazırla",
    description:
      "Dizaynını önizlə, son toxunuşları et və məhsulunu sifarişə hazırla.",
  },
];

export default function Home() {
  return (
    <div className="creation-home">
      {/* HERO */}
      <section className="creation-hero">
        <div className="creation-hero-copy">
          <p className="creation-kicker">CREATION STUDIO</p>

          <h1>
            İdeyanı
            <br />
            geyin.
          </h1>

          <p className="creation-hero-text">
            Sənin fikrin.
            <br />
            Sənin dizaynın.
            <br />
            Sənin məhsulun.
          </p>

          <div className="creation-hero-actions">
            <Link
              className="creation-primary-button"
              href="/editor?product=classic-tshirt"
            >
              Dizayn etməyə başla
              <span aria-hidden="true">↗</span>
            </Link>

            <Link className="creation-link" href="#how-it-works">
              Necə işləyir
              <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>

        <div className="creation-hero-media">
          <Image
            src="/images/creation-hero-v1.webp"
            alt="Creation t-shirt dizayn nümunəsi"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 58vw"
            className="creation-hero-image"
          />

          <div className="creation-hero-caption">
            <span>Creation / 001</span>
            <span>Öz dizaynını yarat</span>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="creation-statement">
        <p>Hazır dizayn seçmə.</p>
        <p>Özünü yarat.</p>
      </section>

      {/* EDITORIAL LOOKS */}
      <section className="creation-editorial">
        <div className="creation-section-head">
          <div>
            <p className="creation-kicker">SƏNİN BAŞLANĞICIN</p>

            <h2>
              Bir fikir kifayətdir.
              <br />
              Qalanı sənindir.
            </h2>
          </div>

          <p className="creation-section-copy">
            Bir söz, şəkil və ya sadəcə bir hiss. Creation onu geyinə
            biləcəyin məhsula çevirmək üçün sənə boş bir səth verir.
          </p>
        </div>

        <div className="creation-look-grid">
          {editorialLooks.map((item, index) => (
            <article className="creation-look" key={item.title}>
              <Link
                href="/editor?product=classic-tshirt"
                className="creation-look-media"
                aria-label={`${item.title} — studiyanı aç`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                  className="creation-look-image"
                  style={{ objectPosition: item.position }}
                />

                <span className="creation-look-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>

              <div className="creation-look-info">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <Link
                  href="/editor?product=classic-tshirt"
                  aria-label={`${item.title} — yarat`}
                  className="creation-round-link"
                >
                  ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section
        className="creation-process"
        id="how-it-works"
        aria-labelledby="process-title"
      >
        <div className="creation-process-heading">
          <p className="creation-kicker">NECƏ İŞLƏYİR</p>

          <h2 id="process-title">
            Fikirdən
            <br />
            məhsula.
          </h2>
        </div>

        <div className="creation-steps">
          {steps.map((step) => (
            <article className="creation-step" key={step.number}>
              <span className="creation-step-number">{step.number}</span>

              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURE */}
      <section className="creation-feature">
        <div className="creation-feature-media">
          <Image
            src="/images/creation-hero-v1.webp"
            alt="Creation məhsul detalı"
            fill
            sizes="(max-width: 768px) 100vw, 52vw"
            className="creation-feature-image"
          />
        </div>

        <div className="creation-feature-copy">
          <p className="creation-kicker creation-kicker-light">
            SƏNİN MƏHSULUN
          </p>

          <h2>
            Dizayn sadəcə
            <br />
            ekranda qalmasın.
          </h2>

          <p>
            Məqsədimiz sadəcə bir şəkil yaratmaq deyil. Sənin ideyanı real,
            toxuna biləcəyin və geyinə biləcəyin məhsula çevirməkdir.
          </p>

          <Link
            href="/products"
            className="creation-secondary-button"
          >
            Məhsullara bax
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="creation-final">
        <p className="creation-kicker">CREATION</p>

        <div className="creation-final-inner">
          <h2>
            Sənin ideyan.
            <br />
            Sənin məhsulun.
          </h2>

          <Link
            href="/editor?product=classic-tshirt"
            className="creation-primary-button creation-primary-button-light"
          >
            Studiyanı aç
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}