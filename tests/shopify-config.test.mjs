import test from "node:test";
import assert from "node:assert/strict";
import { readShopifyConfig } from "../src/lib/shopify/config.ts";

test("empty credentials enable demo mode", () => {
  assert.equal(readShopifyConfig({}), null);
});
test("partial credentials fail instead of silently showing demo", () => {
  assert.throws(() => readShopifyConfig({ SHOPIFY_STORE_DOMAIN: "test.myshopify.com" }));
  assert.throws(() => readShopifyConfig({ SHOPIFY_STOREFRONT_PRIVATE_TOKEN: "test" }));
});
test("domain cannot redirect private token to another host", () => {
  for (const domain of ["https://test.myshopify.com", "test.myshopify.com.evil.com", "test.myshopify.com/path", "test.myshopify.com@evil.com"]) {
    assert.throws(() => readShopifyConfig({ SHOPIFY_STORE_DOMAIN: domain, SHOPIFY_STOREFRONT_PRIVATE_TOKEN: "test" }));
  }
});
test("valid config pins a stable API version", () => {
  assert.deepEqual(readShopifyConfig({ SHOPIFY_STORE_DOMAIN: "test.myshopify.com", SHOPIFY_STOREFRONT_PRIVATE_TOKEN: "test" }), { domain: "test.myshopify.com", token: "test", version: "2026-07" });
  assert.throws(() => readShopifyConfig({ SHOPIFY_STORE_DOMAIN: "test.myshopify.com", SHOPIFY_STOREFRONT_PRIVATE_TOKEN: "test", SHOPIFY_STOREFRONT_API_VERSION: "latest" }));
});

