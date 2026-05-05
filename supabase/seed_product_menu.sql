-- Seed data for product mega menu

begin;

-- Categories
insert into public.product_menu_categories (title, slug, description, display_order, is_active)
values
  ('BASKI BÖLÜMÜ', 'baski-bolumu', null, 1, true),
  ('DIŞ MEKAN GÖRSEL REKLAM İŞLERİ', 'dis-mekan-gorsel-reklam-isleri', null, 2, true),
  ('PROMOSYONLAR', 'promosyonlar', null, 3, true)
on conflict (slug) do update
set title = excluded.title,
    description = excluded.description,
    display_order = excluded.display_order,
    is_active = excluded.is_active;

with cats as (
  select id, slug from public.product_menu_categories
)
insert into public.product_menu_items
  (category_id, name, slug, short_description, image_url, display_order, is_active)
values
  -- BASKI BÖLÜMÜ
  ((select id from cats where slug='baski-bolumu'), 'Ambalaj Kutu', 'ambalaj-kutu', 'Ürün ambalajı ve özel kutu çözümleri.', null, 1, true),
  ((select id from cats where slug='baski-bolumu'), 'Antetli Kağıt', 'antetli-kagit', 'Kurumsal yazışmalar için antetli kağıt baskısı.', null, 2, true),
  ((select id from cats where slug='baski-bolumu'), 'Baskılı Klasör', 'baskili-klasor', 'Markanıza özel sunum ve evrak klasörleri.', null, 3, true),
  ((select id from cats where slug='baski-bolumu'), 'Baskılı Koli', 'baskili-koli', 'Nakliye ve stok için baskılı koli üretimi.', null, 4, true),
  ((select id from cats where slug='baski-bolumu'), 'Bayrak (Makam bayrağı, masa bayrağı vb.)', 'bayrak', 'Kurumsal ve organizasyon bayrak çözümleri.', null, 5, true),
  ((select id from cats where slug='baski-bolumu'), 'Broşür', 'brosur', 'Tanıtım için broşür tasarım ve baskı.', null, 6, true),
  ((select id from cats where slug='baski-bolumu'), 'Cepli Dosya', 'cepli-dosya', 'Evraklar için cepli dosya üretimi.', null, 7, true),
  ((select id from cats where slug='baski-bolumu'), 'Çanta (karton, bez, sırt çantası)', 'canta-karton-bez-sirt-cantasi', 'Taşıma çantaları; karton, bez ve daha fazlası.', null, 8, true),
  ((select id from cats where slug='baski-bolumu'), 'Çipli Kimlik Kartları', 'cipli-kimlik-kartlari', 'Güvenli erişim için çipli kart çözümleri.', null, 9, true),
  ((select id from cats where slug='baski-bolumu'), 'Davetiye', 'davetiye', 'Davetiyeler için kaliteli kağıt ve baskı seçenekleri.', null, 10, true),
  ((select id from cats where slug='baski-bolumu'), 'Defter', 'defter', 'Kurumsal defter ve ajanda üretimi.', null, 11, true),
  ((select id from cats where slug='baski-bolumu'), 'Dergi', 'dergi', 'Dergi baskısı ve ciltleme seçenekleri.', null, 12, true),
  ((select id from cats where slug='baski-bolumu'), 'Dik notluk', 'dik-notluk', 'Masaüstü kullanım için dik notluk baskısı.', null, 13, true),
  ((select id from cats where slug='baski-bolumu'), 'Kartvizit', 'kartvizit', 'Premium kartvizit; mat, parlak ve özel dokular.', null, 14, true),
  ((select id from cats where slug='baski-bolumu'), 'Katalog', 'katalog', 'Ürün katalogları için profesyonel baskı.', null, 15, true),
  ((select id from cats where slug='baski-bolumu'), 'Küp notluk', 'kup-notluk', 'Markalı küp notluk üretimi.', null, 16, true),
  ((select id from cats where slug='baski-bolumu'), 'Magnet', 'magnet', 'Tanıtım amaçlı magnet baskı çözümleri.', null, 17, true),
  ((select id from cats where slug='baski-bolumu'), 'Sticker', 'sticker', 'Kesimli sticker ve etiket üretimi.', null, 18, true),
  ((select id from cats where slug='baski-bolumu'), 'Takvim', 'takvim', 'Duvar ve masa takvimleri; markanıza özel.', null, 19, true),
  ((select id from cats where slug='baski-bolumu'), 'Yaka kartı (Yaka İpi)', 'yaka-karti', 'Etkinlik ve kurumsal yaka kartı çözümleri.', null, 20, true),
  ((select id from cats where slug='baski-bolumu'), 'Zarf', 'zarf', 'Kurumsal zarflar; ebat ve kağıt seçenekleri.', null, 21, true),

  -- DIŞ MEKAN GÖRSEL REKLAM İŞLERİ
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Backdrop', 'backdrop', 'Etkinlik ve sahne arkası backdrop üretimi.', null, 1, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Branda', 'branda', 'Dayanıklı branda baskı ve uygulama.', null, 2, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Buzlu Folyo Uygulamaları', 'buzlu-folyo-uygulamalari', 'Cam yüzeyler için buzlu folyo çözümleri.', null, 3, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Cam Giydirme İşlemleri', 'cam-giydirme-islemleri', 'Mağaza ve ofis camlarına giydirme uygulaması.', null, 4, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Cephe Giydirme', 'cephe-giydirme', 'Bina cepheleri için görsel kaplama çözümleri.', null, 5, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Cephe tabela (ışıklı, ışıksız, kutu harf, germe vb.)', 'cephe-tabela', 'Tabela tasarım, üretim ve montaj.', null, 6, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Dış Mekan Görsel Reklam İşleri', 'dis-mekan-gorsel-reklam-isleri', 'Outdoor reklam üretim ve uygulama hizmetleri.', null, 7, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Folyo', 'folyo', 'Araç, cam ve yüzeyler için folyo baskı.', null, 8, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Kapı isimlikleri', 'kapi-isimlikleri', 'Kapı ve yönlendirme isimlikleri.', null, 9, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Light box', 'light-box', 'Işıklı lightbox üretim ve uygulama.', null, 10, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'One Vision', 'one-vision', 'Görüş sağlayan delikli folyo çözümleri.', null, 11, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Örümcek Stand', 'orumcek-stand', 'Modüler örümcek stand sistemleri.', null, 12, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Rollup', 'rollup', 'Taşınabilir rollup banner çözümleri.', null, 13, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Totem', 'totem', 'Dış mekan totem tabela üretimi.', null, 14, true),
  ((select id from cats where slug='dis-mekan-gorsel-reklam-isleri'), 'Yönlendirme Levhaları', 'yonlendirme-levhalari', 'İç/dış mekan yönlendirme levhaları.', null, 15, true),

  -- PROMOSYONLAR
  ((select id from cats where slug='promosyonlar'), 'Anahtarlık', 'anahtarlik', 'Markalı anahtarlık seçenekleri.', null, 1, true),
  ((select id from cats where slug='promosyonlar'), 'Bardak Altlığı', 'bardak-altligi', 'Promosyon bardak altlığı üretimi.', null, 2, true),
  ((select id from cats where slug='promosyonlar'), 'Baskılı Araç Kokusu', 'baskili-arac-kokusu', 'Markanıza özel baskılı araç kokuları.', null, 3, true),
  ((select id from cats where slug='promosyonlar'), 'Çakmak', 'cakmak', 'Promosyon çakmak baskısı.', null, 4, true),
  ((select id from cats where slug='promosyonlar'), 'Defter', 'defter-promosyon', 'Promosyon defter ve ajanda.', null, 5, true),
  ((select id from cats where slug='promosyonlar'), 'Fincan', 'fincan', 'Fincan baskı ve kurumsal setler.', null, 6, true),
  ((select id from cats where slug='promosyonlar'), 'Kalem', 'kalem', 'Kurumsal kalem baskı seçenekleri.', null, 7, true),
  ((select id from cats where slug='promosyonlar'), 'Kupa bardak', 'kupa-bardak', 'Kupa bardak baskı ve tasarım.', null, 8, true),
  ((select id from cats where slug='promosyonlar'), 'Mousepad', 'mousepad', 'Masaüstü mousepad baskısı.', null, 9, true),
  ((select id from cats where slug='promosyonlar'), 'Organizer Defter', 'organizer-defter', 'Organizer defter setleri.', null, 10, true),
  ((select id from cats where slug='promosyonlar'), 'Plaket', 'plaket', 'Özel gün ve ödül plaketi üretimi.', null, 11, true),
  ((select id from cats where slug='promosyonlar'), 'Powerbank', 'powerbank', 'Markalı powerbank baskısı.', null, 12, true),
  ((select id from cats where slug='promosyonlar'), 'Rozet', 'rozet', 'Rozet üretimi ve baskısı.', null, 13, true),
  ((select id from cats where slug='promosyonlar'), 'Saat', 'saat', 'Promosyon saat seçenekleri.', null, 14, true),
  ((select id from cats where slug='promosyonlar'), 'Set', 'set', 'Kurumsal hediye setleri.', null, 15, true),
  ((select id from cats where slug='promosyonlar'), 'Silgi', 'silgi', 'Promosyon silgi baskısı.', null, 16, true),
  ((select id from cats where slug='promosyonlar'), 'Şapka', 'sapka', 'Şapka üzerine baskı/işleme.', null, 17, true),
  ((select id from cats where slug='promosyonlar'), 'Şemsiye', 'semsiye', 'Promosyon şemsiye baskısı.', null, 18, true),
  ((select id from cats where slug='promosyonlar'), 'Tabak Plaket', 'tabak-plaket', 'Tabak plaket üretimi.', null, 19, true),
  ((select id from cats where slug='promosyonlar'), 'Tişört', 'tisort', 'Tişört baskı ve kurumsal giyim.', null, 20, true)
on conflict (slug) do update
set category_id = excluded.category_id,
    name = excluded.name,
    short_description = excluded.short_description,
    image_url = excluded.image_url,
    display_order = excluded.display_order,
    is_active = excluded.is_active;

commit;

