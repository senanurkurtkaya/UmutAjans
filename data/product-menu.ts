export type ProductMenuItem = {
  name: string;
  slug: string;
  shortDescription: string;
  imageUrl?: string | null;
};

export type ProductMenuCategory = {
  title: string;
  slug: string;
  items: ProductMenuItem[];
};

const slugify = (input: string) =>
  input
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

const SLUG_OVERRIDES: Record<string, string> = {
  'Bayrak (Makam bayrağı, masa bayrağı vb.)': 'bayrak',
  'Cephe tabela (ışıklı, ışıksız, kutu harf, germe vb.)': 'cephe-tabela',
  'Yaka kartı (Yaka İpi)': 'yaka-karti',
  'Dış Mekan Görsel Reklam İşleri': 'dis-mekan-gorsel-reklam-isleri',
};

function item(name: string, shortDescription: string, overrideSlug?: string): ProductMenuItem {
  const slug = overrideSlug ?? SLUG_OVERRIDES[name] ?? slugify(name);
  return { name, slug, shortDescription, imageUrl: null };
}

export const PRODUCT_MENU: ProductMenuCategory[] = [
  {
    title: 'BASKI BÖLÜMÜ',
    slug: 'baski-bolumu',
    items: [
      item('Ambalaj Kutu', 'Ürün ambalajı ve özel kutu çözümleri.'),
      item('Antetli Kağıt', 'Kurumsal yazışmalar için antetli kağıt baskısı.'),
      item('Baskılı Klasör', 'Markanıza özel sunum ve evrak klasörleri.'),
      item('Baskılı Koli', 'Nakliye ve stok için baskılı koli üretimi.'),
      item('Bayrak (Makam bayrağı, masa bayrağı vb.)', 'Kurumsal ve organizasyon bayrak çözümleri.'),
      item('Broşür', 'Tanıtım için broşür tasarım ve baskı.'),
      item('Cepli Dosya', 'Evraklar için cepli dosya üretimi.'),
      item('Çanta (karton, bez, sırt çantası)', 'Karton, bez ve sırt çantası seçenekleriyle üretim.'),
      item('Çipli Kimlik Kartları', 'Güvenli erişim için çipli kart çözümleri.'),
      item('Davetiye', 'Özel günler için şık davetiye tasarım ve baskı.'),
      item('Defter', 'Kurumsal defter ve ajanda üretimi.'),
      item('Dergi', 'Dergi baskısı ve ciltleme seçenekleri.'),
      item('Dik notluk', 'Masaüstü kullanım için dik notluk baskısı.'),
      item('Kartvizit', 'Premium kartvizit; mat, parlak ve özel dokular.'),
      item('Katalog', 'Ürün katalogları için profesyonel baskı.'),
      item('Küp notluk', 'Markalı küp notluk üretimi.'),
      item('Magnet', 'Tanıtım amaçlı magnet baskı çözümleri.'),
      item('Sticker', 'Kesimli sticker ve etiket üretimi.'),
      item('Takvim', 'Duvar ve masa takvimleri; markanıza özel.'),
      item('Yaka kartı (Yaka İpi)', 'Etkinlik ve kurumsal yaka kartı çözümleri.'),
      item('Zarf', 'Kurumsal zarflar; ebat ve kağıt seçenekleri.'),
    ],
  },
  {
    title: 'DIŞ MEKAN GÖRSEL REKLAM İŞLERİ',
    slug: 'dis-mekan-gorsel-reklam-isleri',
    items: [
      item('Backdrop', 'Etkinlik ve sahne arkası backdrop üretimi.'),
      item('Branda', 'Dayanıklı branda baskı ve uygulama.'),
      item('Buzlu Folyo Uygulamaları', 'Cam yüzeyler için buzlu folyo çözümleri.'),
      item('Cam Giydirme İşlemleri', 'Mağaza ve ofis camlarına giydirme uygulaması.'),
      item('Cephe Giydirme', 'Bina cepheleri için görsel kaplama çözümleri.'),
      item('Cephe tabela (ışıklı, ışıksız, kutu harf, germe vb.)', 'Tabela tasarım, üretim ve montaj.'),
      item('Dış Mekan Görsel Reklam İşleri', 'Outdoor reklam üretim ve uygulama hizmetleri.'),
      item('Folyo', 'Araç, cam ve yüzeyler için folyo baskı.'),
      item('Kapı isimlikleri', 'Kapı ve yönlendirme isimlikleri.'),
      item('Light box', 'Işıklı lightbox üretim ve uygulama.'),
      item('One Vision', 'Görüş sağlayan delikli folyo çözümleri.'),
      item('Örümcek Stand', 'Modüler örümcek stand sistemleri.'),
      item('Rollup', 'Taşınabilir rollup banner çözümleri.'),
      item('Totem', 'Dış mekan totem tabela üretimi.'),
      item('Yönlendirme Levhaları', 'İç/dış mekan yönlendirme levhaları.'),
    ],
  },
  {
    title: 'PROMOSYONLAR',
    slug: 'promosyonlar',
    items: [
      item('Anahtarlık', 'Markalı anahtarlık seçenekleri.'),
      item('Bardak Altlığı', 'Promosyon bardak altlığı üretimi.'),
      item('Baskılı Araç Kokusu', 'Markanıza özel baskılı araç kokuları.'),
      item('Çakmak', 'Promosyon çakmak baskısı.'),
      item('Defter', 'Promosyon defter ve ajanda.', 'defter-promosyon'),
      item('Fincan', 'Fincan baskı ve kurumsal setler.'),
      item('Kalem', 'Kurumsal kalem baskı seçenekleri.'),
      item('Kupa bardak', 'Kupa bardak baskı ve tasarım.'),
      item('Mousepad', 'Masaüstü mousepad baskısı.'),
      item('Organizer Defter', 'Organizer defter setleri.'),
      item('Plaket', 'Özel gün ve ödül plaketi üretimi.'),
      item('Powerbank', 'Markalı powerbank baskısı.'),
      item('Rozet', 'Rozet üretimi ve baskısı.'),
      item('Saat', 'Promosyon saat seçenekleri.'),
      item('Set', 'Kurumsal hediye setleri.'),
      item('Silgi', 'Promosyon silgi baskısı.'),
      item('Şapka', 'Şapka üzerine baskı/işleme.'),
      item('Şemsiye', 'Promosyon şemsiye baskısı.'),
      item('Tabak Plaket', 'Tabak plaket üretimi.'),
      item('Tişört', 'Tişört baskı ve kurumsal giyim.'),
    ],
  },
];

