import Link from "next/link";
import { getCatalog } from "@/features/catalog/catalog";

export const revalidate = 300;

export default async function Products() {
  let catalog;
  try { catalog = await getCatalog(); }
  catch { return <section className="page"><h1>Kataloq hazırda açılmır.</h1><p className="intro">Bir qədər sonra yenidən yoxla.</p><Link className="button" href="/">Ana səhifə</Link></section>; }
  return <section className="page"><p className="eyebrow">İLK KOLLEKSİYA</p><h1>Bir ideya ilə başla.</h1>
    {catalog.mode === "demo" && <p className="badge">Demo kataloq · satış aktiv deyil</p>}
    <div className="grid">{catalog.products.map(product => <article className="card" key={product.id}>
      <h2>{product.title}</h2><p>{product.description}</p>
      {catalog.mode === "shopify" && <p>{new Intl.NumberFormat("az-AZ", { style: "currency", currency: product.priceRange.minVariantPrice.currencyCode }).format(Number(product.priceRange.minVariantPrice.amount))}</p>}
      <Link className="button" href="/editor">Studiya haqqında ↗</Link>
    </article>)}</div>
    {catalog.products.length === 0 && <p>Hələ məhsul əlavə edilməyib.</p>}
  </section>;
}

