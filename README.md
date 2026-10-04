# Creation platform
AI-native fərdiləşdirilmiş məhsul platformasının ilkin reposu.

## İlk dəfə açmaq
VS Code → File → Open Folder → bu qovluğu seç.
Terminal → New Terminal (PowerShell):

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Brauzer: http://localhost:3000. .env.local artıq varsa onu yenidən kopyalama.
Node.js 24 LTS və npm istifadə olunur. Hazırkı kompüterdə asılılıqlar quraşdırılıbsa birbaşa npm run dev kifayətdir.

## Struktur
```text
src/app/                 Səhifələr və əsas layout
src/components/          Paylaşılan görünüş komponentləri
src/features/catalog/    Demo və Shopify kataloqu
src/features/editor/     İlkin design document tipi
src/lib/shopify/          Server client, config, GraphQL sorğuları
docs/PROJECT_PLAN.md      Qərarlar, sərhədlər və yol xəritəsi
tests/                   Konfiqurasiya yoxlamaları
```

## Shopify hazırlığı
Boş .env.local ilə demo kataloq işləyir. Canlı qoşulma üçün sonra:
1. Shopify admin-də Headless kanalı və storefront yarat.
2. Məhsullara oxuma icazəsi ver, məhsulları həmin kanala yayımla.
3. SHOPIFY_STORE_DOMAIN dəyərinə yalnız shop-name.myshopify.com yaz.
4. SHOPIFY_STOREFRONT_PRIVATE_TOKEN dəyərinə private Storefront token yaz (Admin API token deyil).
5. Serveri yenidən başladıb /products səhifəsini yoxla.

Private token yalnız serverdə qalır; NEXT_PUBLIC_ ilə başlamamalıdır.
API versiyası 2026-07 olaraq sabitlənib. Kataloq 5 dəqiqəlik cache istifadə edir.
Client build-time kataloq oxunması üçün nəzərdə tutulub. Gələcəkdə buyer-driven sorğular əlavə ediləndə etibarlı hosting/proxy-dən buyer IP alınaraq Shopify-Storefront-Buyer-IP başlığı ötürülməlidir.
HTTP, GraphQL və timeout xətaları idarə olunur. Canlı bağlantı xətası demo məhsul kimi gizlədilmir.
Bu mərhələdə 12 məhsula qədər oxunur; pagination, variant seçimi və runtime response validation gələcək işdir.

## Yoxlamalar
```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

## Sərhədlər
Editor placeholder-dır. AI, hesablar, design storage, cart/checkout, payment və printer inteqrasiyası yoxdur.
Real Shopify bağlantısı credentials olmadan yoxlanmayıb.
Lokal Git repo; GitHub remote və deployment yaradılmayıb.

Rəsmi istinadlar:
- https://nextjs.org/docs/app/getting-started/installation
- https://shopify.dev/docs/api/storefront/2026-07


## Son yoxlama — 2026-10-04
Lint, TypeScript, 4 config testi və production build uğurludur. /, /products, /editor HTTP 200 qaytarır.
Npm audit: lint alətlərinin braces asılılıq zəncirində 5 high xəbərdarlığı var; avtomatik downgrade tətbiq edilməyib.

