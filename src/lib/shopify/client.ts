import "server-only";
import { readShopifyConfig } from "./config";

export async function shopifyQuery<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const config = readShopifyConfig(process.env);
  if (!config) throw new Error("Shopify hələ qoşulmayıb.");
  // Intended for build-time catalog reads. Buyer-driven requests need a trusted buyer IP.
  const response = await fetch(`https://${config.domain}/api/${config.version}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Shopify-Storefront-Private-Token": config.token },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(10000),
    cache: "force-cache",
    next: { revalidate: 300 },
  });
  if (!response.ok) throw new Error(`Shopify sorğusu uğursuz oldu (HTTP ${response.status}).`);
  const result = await response.json() as { data?: T; errors?: unknown[] };
  if (result.errors?.length || !result.data) throw new Error("Shopify etibarlı məlumat qaytarmadı.");
  return result.data;
}

