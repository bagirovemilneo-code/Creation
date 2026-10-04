# İlk dizayn studiyası

## Cari axın
Ana səhifədən məhsullara keç → t-shirt üçün studiyanı aç → dizaynını dəyiş → bu brauzerdə saxla.

## Hazır prototip
- Pəncərəni dolduran studiya: alət zolağı, açılıb-bağlanan parametr paneli və sərbəst mərkəzi önizləmə sahəsi.
- Geniş ekranda iş sahəsi ekrana sığır; parametr panelinin məzmunu öz daxilində sürüşür.
- Redaktə və təmiz önizləmə rejimləri; sessiya daxilində məhsulun zoom səviyyəsini dəyişmək.
- 300×360 məntiqi piksel sahəsi və ön t-shirt önizləməsi.
- Mətn əlavə etmək, font/ölçü/rəng seçmək, hazır mətn ideyalarından başlamaq.
- PNG, JPEG və WebP yükləmək (2 MB-a qədər); şəkil məzmunu brauzerdə qalır.
- Qatı seçmək, sürüşdürmək, küncdən və ya rəqəm ilə ölçüsünü dəyişmək, döndərmək.
- Qatları önə/arxaya çəkmək, silmək, 15 addıma qədər geri almaq.
- Klaviatura ilə qat seçmək və ox düymələri ilə hərəkət etdirmək.
- Demo məhsulun rəngini və ölçüsünü seçmək.
- Dizaynı localStorage-da saxlamaq və səhifə açıldıqda bərpa etmək.
- JSON schema, sərhədlər, raster fayl tipi, sənəd həcmi və qat sayı yoxlanır.
- Sığmayan mətn üçün seçilmiş qatın parametrlərində xəbərdarlıq göstərilir.

Zoom yalnız iş sahəsinin görünüşünü dəyişir; saxlanmış dizaynın koordinatlarını və ölçülərini dəyişmir. Önizləmə rejimi seçim çərçivələrini və redaktə idarələrini gizlədir. Mətn, şəkil, qatlar, məhsul seçimi, undo/redo və lokal saxlama funksiyaları hər iki görünüş arasında qorunur.

## Növbəti qərarlar
1. Həqiqi t-shirt variantları və hər variantın Shopify ID-si.
2. Lokal çapçının çap ölçüləri, koordinat sistemi, DPI və qəbul etdiyi fayl formatı.
3. Dizaynın serverdə saxlanması, asset storage və məhsul/variantla əlaqəsi.
4. Çap üçün export, təhlükəsiz sahə və real ölçüdə resolution check.
5. AI generasiya axını, kredit modeli və istifadəçinin təsdiqlədiyi dizayn.

## Sərhədlər
Bu önizləmə çap nəticəsinə zəmanət vermir. Rənglər və ölçülər nümunədir.
Shopify kataloquna qoşulmaq variant mapping-i avtomatik etmir.
AI və sifariş funksiyaları bu mərhələdə aktiv deyil.
