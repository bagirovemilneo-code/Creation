import Link from "next/link";
import { ShirtPreview } from "@/components/shirt-preview";
import { UiIcon } from "@/components/ui-icon";
import { getCatalog } from "@/features/catalog/catalog";

export const revalidate = 300;

export default async function Products() {
  let catalog;
  try { catalog = await getCatalog(); }
  catch {
    return <section className="market-catalog market-catalog-error"><h1>Kataloq hazırda açılmır.</h1><p className="market-intro">Mağaza ilə bağlantı alınmadı. Bir qədər sonra yenidən yoxla.</p><Link className="market-button" href="/">Ana səhifə <UiIcon name="arrow" /></Link></section>;
  }
  return <section className="market-catalog">
    <div className="market-catalog-heading"><div><h1>İlk kətanını seç.</h1><p className="market-intro">Bir məhsul. Tamamilə sənin dizaynın.</p></div><span className="market-badge">{catalog.mode === "demo" ? "Nümunə kataloq" : "Dizayn kataloqu"}</span></div>
    {catalog.products.length > 0 ? <div className="market-products-grid">{catalog.products.map(product => {
      const editorHref = "/editor?product=" + encodeURIComponent(product.handle) + "&title=" + encodeURIComponent(product.title);
      return <article className="market-product" key={product.id}>
        <Link href={editorHref} className="market-product-image" aria-label={product.title + " — studiyada dizayn et"}><ShirtPreview design="blank" /><span className="market-product-image-arrow"><UiIcon name="arrow" /></span></Link>
        <div className="market-product-info">
          <div className="market-product-meta"><span>{catalog.mode === "demo" ? "T-shirt" : "Fərdiləşdirilən məhsul"}</span>{catalog.mode === "shopify" && <span>{new Intl.NumberFormat("az-AZ", { style: "currency", currency: product.priceRange.minVariantPrice.currencyCode }).format(Number(product.priceRange.minVariantPrice.amount))}</span>}</div>
          <h2>{product.title}</h2><p>{product.description}</p>
          <div className="market-product-features"><span><UiIcon name="text" />Mətn</span><span><UiIcon name="image" />Şəkil</span><span><UiIcon name="layers" />Qatlar</span></div>
          <Link className="market-button" href={editorHref}>Dizaynını yarat <UiIcon name="arrow" /></Link>
        </div>
      </article>;
    })}</div> : <div className="market-empty"><UiIcon name="product" /><h2>Yeni məhsullar hazırlanır.</h2><p>Hələ kataloqa məhsul əlavə edilməyib.</p><Link className="market-button" href="/editor">Studiyanı aç <UiIcon name="arrow" /></Link></div>}
    <aside className="market-catalog-note"><div><h2>Əvvəlcə dizaynını yoxla.</h2><p>Məhsul rəngləri, ölçüləri və çap sahəsi nümunədir. Dizayn bu brauzerdə saxlanır; sifariş hələ aktiv deyil.</p></div><Link className="market-text-link" href="/editor?product=classic-tshirt">Studiyaya keç <UiIcon name="arrow" /></Link></aside>
  </section>;
}