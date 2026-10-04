import Link from "next/link";
import { ShirtPreview } from "@/components/shirt-preview";
import { getCatalog } from "@/features/catalog/catalog";

export const revalidate = 300;

export default async function Products() {
  let catalog;
  try {
    catalog = await getCatalog();
  } catch {
    return <section className="market-catalog market-catalog-error"><p className="market-eyebrow">MƏHSULLAR</p><h1>Kataloq hazırda<br /><em>açılmır.</em></h1><p className="market-intro">Mağaza ilə bağlantı alınmadı. Bir qədər sonra yenidən yoxla.</p><Link className="market-button" href="/">Ana səhifə <span aria-hidden="true">↗</span></Link></section>;
  }
  return (
    <section className="market-catalog">
      <div className="market-catalog-heading"><div><p className="market-eyebrow">SƏNİN NÖVBƏTİ KƏTANIN</p><h1>Bir ideya ilə<br /><em>başla.</em></h1></div><div className="market-catalog-explainer"><p>Məhsulunu seç.<br />Dizaynını studiyada yarat.<br />Qalanı sənin fantaziyandır.</p><span className="market-badge"><i aria-hidden="true" />{catalog.mode === "demo" ? "Demo kataloq · satış aktiv deyil" : "Kataloq · dizayn prototipi"}</span></div></div>
      {catalog.products.length > 0 ? <div className="market-products-grid">{catalog.products.map((product, index) => {
        const editorHref = `/editor?product=${encodeURIComponent(product.handle)}&title=${encodeURIComponent(product.title)}`;
        return <article className="market-product" key={product.id}>
          <Link href={editorHref} className="market-product-image" aria-label={`${product.title} — studiyada dizayn et`}><div className="market-product-image-label"><span>YARADICILIQ ÜÇÜN SƏTH</span><span>/{String(index + 1).padStart(2, "0")}</span></div><ShirtPreview design="blank" /><span className="market-product-image-caption">İllüstrativ məhsul görünüşü</span><span className="market-product-image-arrow" aria-hidden="true">↗</span></Link>
          <div className="market-product-info"><div className="market-product-meta"><span>{catalog.mode === "demo" ? "İLK MƏHSUL / T-SHIRT" : "MƏHSUL"}</span>{catalog.mode === "shopify" && <span>{new Intl.NumberFormat("az-AZ", { style: "currency", currency: product.priceRange.minVariantPrice.currencyCode }).format(Number(product.priceRange.minVariantPrice.amount))}</span>}</div><h2>{product.title}</h2><p>{product.description}</p><Link className="market-button" href={editorHref}>Studiyada dizayn et <span aria-hidden="true">↗</span></Link></div>
        </article>;
      })}</div> : <div className="market-empty"><span aria-hidden="true">✳</span><h2>Yeni kətanlar hazırlanır.</h2><p>Hələ kataloqa məhsul əlavə edilməyib.</p><Link className="market-text-link" href="/editor">Dizayn prototipini aç ↗</Link></div>}
      <aside className="market-catalog-note"><span aria-hidden="true">✳</span><div><h2>Əvvəlcə ideyanı yoxla.</h2><p>Studiyada mətn və şəkillə dizayn qura, onu brauzerində saxlaya bilərsən. Məhsul ölçüləri və çap sahəsi prototip üçündür; sifariş və çap imkanları növbəti mərhələdə hazırlanacaq.</p></div><Link className="market-text-link" href="/editor">Studiyanı kəşf et <span aria-hidden="true">↗</span></Link></aside>
    </section>
  );
}
