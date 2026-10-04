export function readShopifyConfig(env: Record<string, string | undefined>) {
  const domain = env.SHOPIFY_STORE_DOMAIN?.trim();
  const token = env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim();
  const version = env.SHOPIFY_STOREFRONT_API_VERSION?.trim() || "2026-07";
  if (!domain && !token) return null;
  if (!domain || !token) throw new Error("Shopify konfiqurasiyası natamamdır.");
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(domain)) {
    throw new Error("Shopify domeni shop-name.myshopify.com formatında olmalıdır.");
  }
  if (!/^20\d{2}-(01|04|07|10)$/.test(version)) throw new Error("Shopify API versiyası yanlışdır.");
  return { domain, token, version };
}

