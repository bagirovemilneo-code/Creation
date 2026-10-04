# Layihə planı
## Məqsəd
AI-native personalized products platform. Başlanğıc məhsul: t-shirt.
Model: custom frontend + custom editor + Shopify headless + gələcəkdə lokal çapçı.
Sonrakı imkanlar: hoodie, creator marketplace, Printify ilə xarici fulfillment.

## Cari mərhələ — 2026-10-04
- Next.js App Router + TypeScript + Tailwind + ESLint.
- Ana səhifə, demo kataloq və editor üçün başlanğıc səhifə.
- Server-only Shopify Storefront client və məhsul sorğusu.
- Payment, checkout, printer və AI generation implement edilmir.
- Real mağaza bağlantısı token və domen olmadığı üçün yoxlanmayıb.
- Editor yalnız placeholder və ilkin document type-dır; canvas implement edilməyib.

## Yol xəritəsi
1. Azərbaycan payment imkanları və lokal çapçı tələblərini araşdırmaq.
2. Unit economics: məhsul, çap, çatdırılma və əməliyyat xərcləri.
3. V1 funksiyalarını dondurmaq.
4. Editor specification: text, font, drag/resize, layers, print area, DPI.
5. AI sistemi və kredit modeli.
6. UX/UI prototype.
7. Admin və printer paneli.
8. MVP development.
9. Real sifariş testi.
10. 50–100 sifarişdən sonra nəticələrə əsasən böyümək.

## Növbəti texniki addım
T-shirt variantları və çap sahəsi təsdiqləndikdən sonra editor specification hazırlamaq.
Real Shopify bağlantısı üçün Headless kanalının Storefront private token-i və mağaza domeni lazımdır.
Checkout uyğunluğu və Azərbaycan payment imkanları ayrıca yoxlanmalıdır; mövcud qərar bunu təsdiqləmir.

