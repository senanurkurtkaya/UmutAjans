-- Hero slider ve varsayılan hero butonlarına link alanı.
-- Supabase SQL Editor'da bir kez çalıştırın.

ALTER TABLE hero_slides
ADD COLUMN IF NOT EXISTS button_link text;

COMMENT ON COLUMN hero_slides.button_link IS 'Örn: /tr/contact, https://wa.me/90..., #services';
