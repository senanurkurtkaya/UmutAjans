import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail, isValidPhone, isRequired } from '@/lib/utils/validation';
import { logger } from '@/lib/utils/logger';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const CONTACT_BODY_MAX_LENGTH = 50_000;

const CONTACT_OFFER_PRODUCT_TYPE = 'İletişim formu';

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale?: string;
}

function validateBody(body: unknown): { ok: true; data: ContactBody } | { ok: false; error: string } {
  if (body == null || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body' };
  }
  const { name, email, phone, message, locale } = body as Record<string, unknown>;

  if (!isRequired(String(name ?? ''))) {
    return { ok: false, error: 'Name is required' };
  }
  if (!isRequired(String(email ?? ''))) {
    return { ok: false, error: 'Email is required' };
  }
  if (!isValidEmail(String(email))) {
    return { ok: false, error: 'Invalid email address' };
  }
  if (phone != null && String(phone).trim() !== '' && !isValidPhone(String(phone))) {
    return { ok: false, error: 'Invalid phone number' };
  }
  if (!isRequired(String(message ?? ''))) {
    return { ok: false, error: 'Message is required' };
  }
  if (String(message).trim().length < 10) {
    return { ok: false, error: 'Message must be at least 10 characters' };
  }
  const data: ContactBody = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    message: String(message).trim(),
  };
  if (phone != null && String(phone).trim() !== '') {
    data.phone = String(phone).trim();
  }
  if (locale != null && typeof locale === 'string' && ['tr', 'en'].includes(locale)) {
    data.locale = locale;
  }
  return { ok: true, data };
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      );
    }

    const raw = await request.text();
    if (raw.length > CONTACT_BODY_MAX_LENGTH) {
      return NextResponse.json(
        { error: 'Payload too large' },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    const result = validateBody(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from('offers').insert({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone ?? null,
      product_type: CONTACT_OFFER_PRODUCT_TYPE,
      quantity: 0,
      size: null,
      description: result.data.message,
      status: 'new',
      locale: result.data.locale ?? null,
    });

    if (error) {
      logger.error('Contact form DB insert failed', error, 'ContactAPI');
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      );
    }

    logger.info('Contact form submission saved to offers', {
      email: result.data.email,
      name: result.data.name,
    }, 'ContactAPI');

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Contact API error', error, 'ContactAPI');
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
