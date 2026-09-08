import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.SHEERLIN_ID;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required!' },
        { status: 400 }
      );
    }
    let text = `📝 Vacancy Proposal\n\n👤 Name: ${name}`;
    text += `\n✉️ Email: ${email}`;
    if (phone) {
      text += `\n📞 Phone: ${phone}`;
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
        { error: 'Error sending vacancy proposal', telegram: data },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, message: 'Vacancy proposal sent successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Error sending vacancy proposal' }, { status: 500 });
  }
}
