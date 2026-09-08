import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.SHEERLIN_ID;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, city, service, rating, title, message } = body;
    if (!name || !city || !service || !rating || !title || !message) {
      return NextResponse.json({ error: 'All fields except email are required!' }, { status: 400 });
    }
    const text = `\u2B50 New Feedback\n\n👤 Name / Naam: *${name}*\n🏙️ City / Stad: ${city}\n🛠️ Service / Dienst: ${service}\n⭐ Rating / Beoordeling: ${rating}\n\n*${title}*\n${message}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' }),
    });
    const data = await res.json();
    if (!data.ok) {
      return NextResponse.json({ error: 'Error sending feedback' }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: 'Feedback sent successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Error sending feedback' }, { status: 500 });
  }
}
