import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.SHEERLIN_ID;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, city, email, phone, company, subject, message } = body;
    if (!name || !city || !email || !message) {
      return NextResponse.json(
        { error: 'Name, city, email, and message are required!' },
        { status: 400 }
      );
    }
    let text = `📩 Consultation Request\n\n👤 Name: ${name}\n🏙️ City: ${city}`;
    text += `\n✉️ Email: ${email}`;
    if (company) {
      text += `\n🏢 Company: ${company}`;
    }
    if (phone) {
      text += `\n📞 Phone: ${phone}`;
    }
    if (subject) {
      text += `\n✉️ Subject: ${subject}`;
    }
    text += `\n\n${message}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
    });
    const data = await res.json();
    if (!data.ok) {
      return NextResponse.json(
        { error: 'Error sending consultation request', telegram: data },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, message: 'Consultation request sent successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Error sending consultation request' }, { status: 500 });
  }
}
