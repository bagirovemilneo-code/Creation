# Layihə planı
## Məqsəd
AI-native personalized products platform. Başlanğıc məhsul: t-shirt.
Model: custom frontend + custom editor + Shopify headless + gələcəkdə lokal çapçı.
Sonrakı imkanlar: hoodie, creator marketplace, Printify ilə xarici fulfillment.

## Cari mərhələ — 2026-10-04
- Next.js App Router + TypeScript + Tailwind + ESLint.
- Ana səhifə, məhsul seçimi və interaktiv dizayn studiyası.
- Server-only Shopify Storefront client və məhsul sorğusu.
- Payment, checkout, printer və AI generation implement edilmir.
- Real mağaza bağlantısı token və domen olmadığı üçün yoxlanmayıb.
- Editor prototipi: mətn və raster şəkil, drag/resize, font/rəng, dönmə, qat sırası və silmə, undo/redo.
- Dizayn JSON-u bu brauzerdə manual saxlanır, uyğun məhsula qayıdanda yenidən açılır.
- Məhsul rəng/ölçü seçimi demo üçündür; Shopify variant ID-ləri hələ bağlanmayıb.
- Editor 300×360 məntiqi önizləmə pikselindən istifadə edir; real çap ölçüsü və DPI deyil.
- Studiyanın iş sahəsi bütün pəncərəni tutur: ayrıca alət zolağı, açılıb-bağlanan parametr paneli və mərkəzdə məhsul.
- Studiyada redaktə/önizləmə rejimi və sessiya daxilində zoom var; geniş ekranda səhifə sürüşmür, uzun alət panelləri öz daxilində sürüşür.

## Dizayn mərhələsi
İlk axın: ana səhifə → məhsul seçimi → dizayn studiyası.
Ana səhifə və kataloq: açıq krem, tünd yaşıl, lime aksent, böyük tipoqrafiya.
Studiya: soyuq boz iş sahəsi, qrafit alət zolağı, ağ idarəetmə panelləri, aydın tipoqrafiya və dolğun düymələr. Dekorativ alt qeydlər çıxarılıb; məhsulun nümunə statusu parametr panelində göstərilir.
T-shirt önizləməsində rəngə uyğun işıq, yumşaq kölgə, yaxa və tikiş detalları var; bunlar vizual effektlərdir, çap ölçülərini və dizayn məlumatını dəyişmir.
Ana səhifə və kataloq sayt naviqasiyasını saxlayır. /editor birbaşa studiya iş sahəsi kimi açılır; onun idarəetmə paneli saytın başlıq və altlığını əvəz edir.
İşlək prototip üzərində istifadəçi axını və editor davranışı yoxlanır.
Tələblər: docs/EDITOR_V1.md.

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
Editor prototipini istifadəçi ilə sınamaq, axın və dizaynı dəqiqləşdirmək.
Sonra t-shirt variantları və çap sahəsini təsdiqləyib real ölçülərlə editor specification-ı yeniləmək.
Real Shopify bağlantısı üçün Headless kanalının Storefront private token-i və mağaza domeni lazımdır.
Checkout uyğunluğu və Azərbaycan payment imkanları ayrıca yoxlanmalıdır; mövcud qərar bunu təsdiqləmir.
