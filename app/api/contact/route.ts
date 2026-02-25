import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail, isValidPhone, isRequired } from '@/lib/utils/validation';
import { logger } from '@/lib/utils/logger';

const CONTACT_BODY_MAX_LENGTH = 50_000;

export interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

function validateBody(body: unknown): { ok: true; data: ContactBody } | { ok: false; error: string } {
  if (body == null || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body' };
  }
  const { name, email, phone, message } = body as Record<string, unknown>;

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

    // TODO: Send email (e.g. Resend, SendGrid) or save to DB
    logger.info('Contact form submission', {
      email: result.data.email,
      name: result.data.name,
      hasPhone: !!result.data.phone,
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
