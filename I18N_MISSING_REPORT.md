# i18n Eksik Çeviri Raporu

Proje yapısı bozulmadan tespit edilen çevirisi olmayan / i18n dışı kalan metinler.

---

## 1. Mesaj dosyalarında eksik anahtarlar (kodda kullanılıyor, JSON’da yok)

### About sayfası
- **Dosya:** `app/[locale]/(public)/about/page.tsx`
- **Eksik anahtarlar:** `about.description1`, `about.description2`
- Sayfa `t('description1')` ve `t('description2')` kullanıyor; `messages/en.json` ve `messages/tr.json` içinde `about` altında bu anahtarlar yok.

### Metadata (About)
- **Kullanım:** `about/page.tsx` → `generateMetadataFromTranslations({ titleKey: 'metadata.about.title', descriptionKey: 'metadata.about.description' })`
- **Eksik:** `metadata.about.title` ve `metadata.about.description`
- Şu an sadece `metadata.home` var; `metadata.about` bloku eklenmeli.

---

## 2. Sabit (hardcoded) metinler – çeviri kullanılmıyor

### Admin – Service Cards (Yeni kart)
- **Dosya:** `app/[locale]/(admin)/admin/service-cards/new/page.tsx`
- `alert("Başlık gir")`
- `alert("Resim seç")`
- `alert("Upload hatası")`
- `alert("DB kayıt hatası")`
- `alert("Kart eklendi")`
- Başlık: `Yeni Service Kart`
- Placeholder: `Başlık`
- Buton: `Kaydet`

### Admin – Products (Yeni ürün)
- **Dosya:** `app/[locale]/(admin)/admin/products/new/page.tsx`
- `alert("Dosya seçmelisiniz")`
- `alert("Ürün eklendi")`
- Başlık: `Yeni Ürün`
- Placeholder: `Başlık`
- Buton: `Kaydet`

### Admin – Portfolio (Yeni proje)
- **Dosya:** `app/[locale]/(admin)/admin/portfolio/new/page.tsx`
- `alert("Görsel yüklenemedi")`
- `alert("Proje eklenirken hata oluştu")`
- Başlık: `Yeni Portfolio Projesi`
- Placeholder: `Başlık`, `Slug`, `Proje açıklaması`, `Client`, `Year`, `Category`
- Buton: `Projeyi Kaydet`

### Admin – Portfolio (Düzenle)
- **Dosya:** `app/[locale]/(admin)/admin/portfolio/[id]/edit/page.tsx`
- `alert("Görsel yüklenemedi")`
- `alert("Güncelleme hatası")`
- Başlık: `Portfolio Düzenle`
- Yükleme metni: `Loading...`
- Buton: `Güncelle`

### Admin – Services (Yeni hizmet)
- **Dosya:** `app/[locale]/(admin)/admin/services/new/page.tsx`
- Başlık: `Create New Service`
- Label: `Title`, `Description`, `Icon`, `Published`
- Buton: `Save`
- Select seçenekleri (hepsi sabit Türkçe):  
  `Kartvizit / El ilanı / Bloknot`, `Broşür / Katalog / Dergi / Menü`, `Zarf / Davetiye`, `Cepli dosya`, `Etiket / Sticker`, `Barkod etiket`, `Poster / Afiş / Rollup`, `Promosyon ürünleri`, `Plaket`, `Ajanda`, `Kurumsal kimlik / Masa isimliği`, `Tekstil baskı`, `Bez çanta`, `Magnet baskı`, `Takvim`, `Diğer`

### Admin – Services [id] (Düzenle)
- **Dosya:** `app/[locale]/(admin)/admin/services/[id]/page.tsx`
- Aynı icon select seçenekleri (Türkçe sabit).

### Admin – Hero
- **Dosya:** `app/[locale]/(admin)/admin/hero/page.tsx`
- Başlık: `Hero Slider Yönetimi`
- Placeholder: `Başlık`, `Alt Başlık` (formda kullanılıyor; admin.homepage’deki placeholder anahtarları kullanılabilir)

### Admin – Settings
- **Dosya:** `app/[locale]/(admin)/admin/settings/page.tsx`
- Yükleme metni: `Loading...`
- Kaydetme sırasında buton metni: `'...'` (saving ? '...' : t('save')) – “...” çeviri değil, kabul edilebilir; “Loading...” çeviri olmalı.

### Admin – Offers (StatusButton)
- **Dosya:** `app/[locale]/(admin)/admin/offers/StatusButton.tsx`
- Buton metni: `'...'`, `'New'`, `'Done'` (İngilizce sabit; admin.offersPage.new/done kullanılmalı).

### Genel UI bileşenleri
- **skip-link.tsx:** `Skip to main content`
- **theme-toggle.tsx:** `Toggle theme` (sr-only), `Light`, `Dark`, `System`
- **sheet.tsx:** `Close` (sr-only)
- **error-boundary.tsx:** `Something went wrong`

### Dil seçici
- **language-switcher.tsx:** `English`, `Türkçe` (mobile), `aria-label="Dil seçimi"`

---

## 3. Özet tablo

| Konum | Tür | Örnek metin |
|-------|-----|-------------|
| messages (about) | Eksik anahtar | description1, description2 |
| messages (metadata) | Eksik anahtar | metadata.about.title, metadata.about.description |
| admin/service-cards/new | alert + UI | Başlık gir, Yeni Service Kart, Kaydet |
| admin/products/new | alert + UI | Dosya seçmelisiniz, Yeni Ürün, Kaydet |
| admin/portfolio/new | alert + UI | Görsel yüklenemedi, Yeni Portfolio Projesi, Projeyi Kaydet |
| admin/portfolio/[id]/edit | alert + UI | Güncelleme hatası, Portfolio Düzenle, Loading..., Güncelle |
| admin/services/new | UI + select | Create New Service, Title, Save, icon seçenekleri |
| admin/services/[id] | UI | icon select seçenekleri |
| admin/hero | UI | Hero Slider Yönetimi |
| admin/settings | UI | Loading... |
| admin/offers/StatusButton | UI | New, Done |
| skip-link | UI | Skip to main content |
| theme-toggle | UI | Toggle theme, Light, Dark, System |
| sheet | UI | Close |
| error-boundary | UI | Something went wrong |
| language-switcher | UI | English, Türkçe, Dil seçimi |

---

## 4. Önerilen adımlar

1. **messages:** `about.description1`, `about.description2` ve `metadata.about.title`, `metadata.about.description` ekleyin (en + tr).
2. **Admin sayfaları:** İlgili sayfalarda `useTranslations('admin')` veya uygun namespace kullanıp bu metinleri çeviri anahtarına taşıyın; `admin` (ve gerekirse yeni alt anahtarlar) için en/tr mesajları ekleyin.
3. **Ortak UI:** Skip link, theme toggle, sheet, error boundary ve dil seçici için ortak bir namespace (ör. `common` veya `ui`) açıp çevirileri oraya alın.
4. **alert():** Tüm `alert()` metinlerini çeviri anahtarıyla değiştirin (örn. `t('errors.uploadFailed')`) ve mesaj dosyalarına ekleyin.
5. **Icon select (services):** Seçenekleri çeviri anahtarına bağlayın (value İngilizce/tutarlı kalabilir; görünen metin `t()` ile).

Bu rapor sadece tespit amaçlıdır; proje yapısı veya çalışan kod değiştirilmemiştir.
