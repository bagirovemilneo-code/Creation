# Creation — vizual istiqamət

## Təməl — 2026-10-05

Sayt və studiya eyni vizual dildə danışır: soyuq ağ və mirvari boz səthlər, qrafit mətn və düymələr, sakit mavi aksent. Məhsul və kampaniya şəkilləri öz rəngini saxlayır.

Rəng, yazı və idarəetmə tokenləri `src/app/globals.css` faylındakı `:root` blokunda saxlanır. Yeni komponentlər bu tokenlərdən istifadə etməlidir; eyni məqsəd üçün ayrıca rəng və düymə üslubu yaradılmamalıdır.

- Əsas səth: `--bg`; panel: `--paper`; ağ səth: `--paper-strong`; iş sahəsi: `--canvas`.
- Mətn: `--ink`, `--ink-soft`, `--muted`. Mavi `--accent` seçili vəziyyət və klaviatura fokusuna aiddir.
- Şrift: `--font-sans`. Başlıqlar 600 çəkidə; kampaniyanın əsas başlığı 650 çəkidə verilir. Sətirlər sıx, amma üst-üstə düşmür.
- İdarəetmə yazısı: 14 px; etiket: minimum 12 px; əsas mətn: 16 px.
- Əsas düymə: minimum 52 px; yığcam düymə: 44 px; kənar radiusu: 8 px. Normal, hover, basılma və fokus vəziyyətləri saxlanır.
- Səth radiusu: 12 px. Kölgələr yalnız səthlərin ayrılması və düymənin basılma hissi üçün istifadə edilir.
- `prefers-reduced-motion` üçün animasiya və keçidlər söndürülür.

`src/app/editor/studio.css` yalnız studiyanın yerləşməsi, alətləri və canvas davranışını idarə edir; rəng və şrift təməlini qlobal tokenlərdən alır. Qlobal CSS-də `.studio-*` qaydaları təkrarlanmamalıdır.

## Addım-addım işləmə sırası

1. **Tamamlandı:** qlobal rəng, tipoqrafiya, düymə və səth təməli; toqquşan editor qaydalarının təmizlənməsi.
2. **Tamamlandı:** sayt başlığı və ana səhifənin hero kompozisiyası. Elan zolağı və dekorativ hero etiketləri çıxarılıb; açıq səthdə güclü başlıq, qrafit CTA və ayrıca foto sahəsi var. Header desktop-da 84 px, mobil ekranda 72 px-dir. 760 px-dən aşağıda klaviatura ilə işləyən mobil menyu açılır; Escape, kənara klik və keçid seçimi ilə bağlanır.
3. **Növbəti:** ana səhifənin qalan bölmələri — məhsul şəkilləri, kartlar, mətn sıxlığı və bölmələrarası ritm.
4. Məhsul kataloqu və studiya detalları — eyni üslubla, hər səhifə ayrıca yoxlanaraq.

Hər addım desktop və mobil görünüşdə yoxlanır. Bu iş dizayn mərhələsidir; payment, checkout və printer inteqrasiyası bu mərhələyə daxil deyil.
