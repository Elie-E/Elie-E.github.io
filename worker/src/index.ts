export interface Env {
  RESEND_API_KEY: string;
  ALLOWED_ORIGIN: string;
  TO_EMAIL: string;
  FROM_EMAIL: string;
}

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  type?: string;
  budget?: string;
  message?: string;
  _hp?: string;
  _t?: number;
};

function json(data: unknown, status = 200, origin?: string) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...(origin
        ? {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        : {}),
    },
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      if (origin !== env.ALLOWED_ORIGIN) return json({ error: 'Forbidden origin' }, 403);
      return json({ ok: true }, 200, env.ALLOWED_ORIGIN);
    }

    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

    if (origin !== env.ALLOWED_ORIGIN) return json({ error: 'Forbidden origin' }, 403);

    let body: ContactBody;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, env.ALLOWED_ORIGIN);
    }

    // Honeypot: silently succeed for bots
    if (body._hp) return json({ success: true }, 200, env.ALLOWED_ORIGIN);

    // Too fast: probably a bot (< 3 seconds)
    if (body._t && Date.now() - body._t < 3000) return json({ success: true }, 200, env.ALLOWED_ORIGIN);

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const subject = String(body.subject || body.type || 'New contact message').trim();
    const message = String(body.message || '').trim();
    const budget = body.budget ? `\nBudget: ${String(body.budget).trim()}` : '';

    if (!name || !email || !isValidEmail(email) || message.length < 10) {
      return json({ error: 'Invalid form data' }, 400, env.ALLOWED_ORIGIN);
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: env.TO_EMAIL,
        reply_to: email,
        subject: `[Portfolio] ${subject} - from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}${budget}\n\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend error:', errorText);
      return json({ error: 'Failed to send message' }, 500, env.ALLOWED_ORIGIN);
    }

    return json({ success: true }, 200, env.ALLOWED_ORIGIN);
  },
};
