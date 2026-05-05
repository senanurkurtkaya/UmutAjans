export type ProductMenuItem = {
  title: string;
  slug: string;
  description: string;
  href: string;
  image?: string;
  categoryKey: 'baski' | 'dis-mekan' | 'promosyon';
};

export type ProductMenuCategory = {
  key: ProductMenuItem['categoryKey'];
  title: string;
};

export const PRODUCT_MENU_CATEGORIES: ProductMenuCategory[] = [
  { key: 'baski', title: 'BASKI BÖLÜMÜ' },
  { key: 'dis-mekan', title: 'DIŞ MEKAN GÖRSEL REKLAM İŞLERİ' },
  { key: 'promosyon', title: 'PROMOSYONLAR' },
];

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function makeItem(
  categoryKey: ProductMenuItem['categoryKey'],
  title: string,
  description: string,
  image?: string
): ProductMenuItem {
  const slug = slugify(title);
  return {
    categoryKey,
    title,
    slug,
    description,
    href: `/urunler/${slug}`,
    image,
  };
}

export const PRODUCT_MENU_ITEMS: ProductMenuItem[] = [
  // BASKI BÖLÜMÜ
  makeItem('baski', 'Ambalaj Kutu', 'Ürün ambalajı ve özel kutu çözümleri.'),
  makeItem('baski', 'Antetli Kağıt', 'Kurumsal yazışmalar için antetli kağıt baskısı.'),
  makeItem('baski', 'Baskılı Klasör', 'Markanıza özel sunum ve evrak klasörleri.'),
  makeItem('baski', 'Baskılı Koli', 'Nakliye ve stok için baskılı koli üretimi.'),
  makeItem('baski', 'Bayrak (Makam bayrağı, masa bayrağı vb.)', 'Kurumsal ve organizasyon bayrak çözümleri.'),
  makeItem('baski', 'Broşür', 'Tanıtım için broşür tasarım ve baskı.'),
  makeItem('baski', 'Cepli Dosya', 'Evraklar için cepli dosya üretimi.'),
  makeItem('baski', 'Çanta (karton, bez, sırt çantası)', 'Taşıma çantaları; karton, bez ve daha fazlası.'),
  makeItem('baski', 'Çipli Kimlik Kartları', 'Güvenli erişim için çipli kart çözümleri.'),
  makeItem('baski', 'Davetiye', 'Davetiyeler için kaliteli kağıt ve baskı seçenekleri.'),
  makeItem('baski', 'Defter', 'Kurumsal defter ve ajanda üretimi.'),
  makeItem('baski', 'Dergi', 'Dergi baskısı ve ciltleme seçenekleri.'),
  makeItem('baski', 'Dik notluk', 'Masaüstü kullanım için dik notluk baskısı.'),
  makeItem('baski', 'Kartvizit', 'Premium kartvizit; mat, parlak ve özel dokular.'),
  makeItem('baski', 'Katalog', 'Ürün katalogları için profesyonel baskı.'),
  makeItem('baski', 'Küp notluk', 'Markalı küp notluk üretimi.'),
  makeItem('baski', 'Magnet', 'Tanıtım amaçlı magnet baskı çözümleri.'),
  makeItem('baski', 'Sticker', 'Kesimli sticker ve etiket üretimi.'),
  makeItem('baski', 'Takvim', 'Duvar ve masa takvimleri; markanıza özel.'),
  makeItem('baski', 'Yaka kartı (Yaka İpi)', 'Etkinlik ve kurumsal yaka kartı çözümleri.'),
  makeItem('baski', 'Zarf', 'Kurumsal zarflar; ebat ve kağıt seçenekleri.'),

  // DIŞ MEKAN GÖRSEL REKLAM İŞLERİ
  makeItem('dis-mekan', 'Backdrop', 'Etkinlik ve sahne arkası backdrop üretimi.'),
  makeItem('dis-mekan', 'Branda', 'Dayanıklı branda baskı ve uygulama.'),
  makeItem('dis-mekan', 'Buzlu Folyo Uygulamaları', 'Cam yüzeyler için buzlu folyo çözümleri.'),
  makeItem('dis-mekan', 'Cam Giydirme İşlemleri', 'Mağaza ve ofis camlarına giydirme uygulaması.'),
  makeItem('dis-mekan', 'Cephe Giydirme', 'Bina cepheleri için görsel kaplama çözümleri.'),
  makeItem('dis-mekan', 'Cephe tabela (ışıklı, ışıksız, kutu harf, germe vb.)', 'Tabela tasarım, üretim ve montaj.'),
  makeItem('dis-mekan', 'Dış Mekan Görsel Reklam İşleri', 'Outdoor reklam üretim ve uygulama hizmetleri.'),
  makeItem('dis-mekan', 'Folyo', 'Araç, cam ve yüzeyler için folyo baskı.'),
  makeItem('dis-mekan', 'Kapı isimlikleri', 'Kapı ve yönlendirme isimlikleri.'),
  makeItem('dis-mekan', 'Light box', 'Işıklı lightbox üretim ve uygulama.'),
  makeItem('dis-mekan', 'One Vision', 'Görüş sağlayan delikli folyo çözümleri.'),
  makeItem('dis-mekan', 'Örümcek Stand', 'Modüler örümcek stand sistemleri.'),
  makeItem('dis-mekan', 'Rollup', 'Taşınabilir rollup banner çözümleri.'),
  makeItem('dis-mekan', 'Totem', 'Dış mekan totem tabela üretimi.'),
  makeItem('dis-mekan', 'Yönlendirme Levhaları', 'İç/dış mekan yönlendirme levhaları.'),

  // PROMOSYONLAR
  makeItem('promosyon', 'Anahtarlık', 'Markalı anahtarlık seçenekleri.'),
  makeItem('promosyon', 'Bardak Altlığı', 'Promosyon bardak altlığı üretimi.'),
  makeItem('promosyon', 'Baskılı Araç Kokusu', 'Markanıza özel baskılı araç kokuları.'),
  makeItem('promosyon', 'Çakmak', 'Promosyon çakmak baskısı.'),
  makeItem('promosyon', 'Defter', 'Promosyon defter ve ajanda.'),
  makeItem('promosyon', 'Fincan', 'Fincan baskı ve kurumsal setler.'),
  makeItem('promosyon', 'Kalem', 'Kurumsal kalem baskı seçenekleri.'),
  makeItem('promosyon', 'Kupa bardak', 'Kupa bardak baskı ve tasarım.'),
  makeItem('promosyon', 'Mousepad', 'Masaüstü mousepad baskısı.'),
  makeItem('promosyon', 'Organizer Defter', 'Organizer defter setleri.'),
  makeItem('promosyon', 'Plaket', 'Özel gün ve ödül plaketi üretimi.'),
  makeItem('promosyon', 'Powerbank', 'Markalı powerbank baskısı.'),
  makeItem('promosyon', 'Rozet', 'Rozet üretimi ve baskısı.'),
  makeItem('promosyon', 'Saat', 'Promosyon saat seçenekleri.'),
  makeItem('promosyon', 'Set', 'Kurumsal hediye setleri.'),
  makeItem('promosyon', 'Silgi', 'Promosyon silgi baskısı.'),
  makeItem('promosyon', 'Şapka', 'Şapka üzerine baskı/işleme.'),
  makeItem('promosyon', 'Şemsiye', 'Promosyon şemsiye baskısı.'),
  makeItem('promosyon', 'Tabak Plaket', 'Tabak plaket üretimi.'),
  makeItem('promosyon', 'Tişört', 'Tişört baskı ve kurumsal giyim.'),
];

