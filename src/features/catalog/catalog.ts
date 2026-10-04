import "server-only";
import { readShopifyConfig } from "@/lib/shopify/config";
import { shopifyQuery } from "@/lib/shopify/client";
import { PRODUCTS_QUERY } from "@/lib/shopify/queries";

export type Product = {
  id: string; handle: string; title: string; description: string; availableForSale: boolean;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

export async function getCatalog(): Promise<{ mode: "demo" | "shopify"; products: Product[] }> {
  if (!readShopifyConfig(process.env)) return { mode: "demo", products: [{
    id: "demo-tshirt", handle: "classic-tshirt", title: "Klassik T-shirt",
    description: "Bir söz, bir təsvir, öz üslubun. Bu sadə səthi sənə aid dizayna çevir.",
    availableForSale: false, priceRange: { minVariantPrice: { amount: "0", currencyCode: "AZN" } },
  }] };
  const data = await shopifyQuery<{ products: { nodes: Product[] } }>(PRODUCTS_QUERY);
  return { mode: "shopify", products: data.products.nodes };
}
