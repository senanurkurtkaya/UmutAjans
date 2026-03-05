'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import { submitOffer } from '../../offer/action';

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('offer');

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary w-full rounded-xl mt-2 disabled:opacity-70"
    >
      {pending ? t('sending') : t('submit')}
    </button>
  );
}

export default function OfferPage() {
  const t = useTranslations('offer');
  const locale = useLocale();
  const [state, formAction] = useFormState(submitOffer, null);

  return (
    <div className="bg-base-100 py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-base-content">
            {t('title')}
          </h1>
          <p className="text-base text-base-content/70">
            {locale === 'tr'
              ? 'İhtiyaçlarınızı kısaca anlatın, size özel baskı teklifini iletelim.'
              : 'Tell us briefly what you need and we will send you a tailored print quote.'}
          </p>
        </div>

        <div className="card bg-base-100 shadow-lg shadow-base-content/5 border border-base-300/70 rounded-2xl">
          <div className="card-body p-6 md:p-8 space-y-6">
            {state?.success && (
              <div className="alert alert-success rounded-xl text-sm">
                <span>{t('success')}</span>
              </div>
            )}

            <form action={formAction} className="space-y-6">
              <input type="hidden" name="locale" value={locale} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm font-medium">
                      {t('name')}
                    </span>
                  </label>
                  <input
                    name="name"
                    required
                    className="input input-bordered w-full rounded-xl"
                    placeholder={t('name')}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm font-medium">
                      {t('phone')}
                    </span>
                  </label>
                  <input
                    name="phone"
                    className="input input-bordered w-full rounded-xl"
                    placeholder={t('phone')}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium">
                    {t('email')}
                  </span>
                </label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full rounded-xl"
                  placeholder={t('email')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control md:col-span-1">
                  <label className="label">
                    <span className="label-text text-sm font-medium">
                      {t('quantity')}
                    </span>
                  </label>
                  <input
                    name="quantity"
                    type="number"
                    className="input input-bordered w-full rounded-xl"
                    placeholder={t('quantity')}
                  />
                </div>
                <div className="form-control md:col-span-1">
                  <label className="label">
                    <span className="label-text text-sm font-medium">
                      {t('size')}
                    </span>
                  </label>
                  <input
                    name="size"
                    className="input input-bordered w-full rounded-xl"
                    placeholder={t('size')}
                  />
                </div>
                <div className="form-control md:col-span-1">
                  <label className="label">
                    <span className="label-text text-sm font-medium">
                      {t('brochure')}
                    </span>
                  </label>
                  <select
                    name="product_type"
                    className="select select-bordered w-full rounded-xl"
                  >
                    <option value="Broşür">{t('brochure')}</option>
                    <option value="Kartvizit">{t('card')}</option>
                    <option value="Afiş">{t('poster')}</option>
                    <option value="Diğer">{t('other')}</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium">
                    {t('description')}
                  </span>
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full rounded-xl min-h-[120px]"
                  placeholder={t('description')}
                />
              </div>

              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

