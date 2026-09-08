import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.SHEERLIN_ID;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, number, service } = body;

    if (!firstName || !lastName || !number) {
      return NextResponse.json(
        { error: 'First Name, Last Name, Phone Number are required!' },
        { status: 400 }
      );
    }

    // Format number for Telegram (remove spaces)
    const formattedNumber = number.replace(/\s+/g, '');
    // Compose one message with both languages
    let text = `☎️ New request a call / Nieuw bel mij terug\n\n`;
    if (service) {
      text += `🛠️ Service / Dienst:\n ${service}\n\n`;
    }
    text += `First Name / Voornaam:\n *${firstName}*\n`;
    text += `Last Name / Achternaam:\n *${lastName}*\n`;
    text += `\n📞 Phone Number / Telefoonnummer:\n\n ${formattedNumber}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' }),
    });
    const data = await res.json();
    if (!data.ok) {
      return NextResponse.json({ error: 'Error sending the form' }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: 'Form sent successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Error sending the form' }, { status: 500 });
  }
}

export async function GET() {
  // Надіслати тестове повідомлення у Telegram
  const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.SHEERLIN_ID;
  const text = `Test message from GET /api/telegram-form`;
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
    });
    const data = await res.json();
    if (!data.ok) {
      return NextResponse.json({ error: 'Error sending test message' }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: 'Test message sent!' });
  } catch (error) {
    return NextResponse.json({ error: 'Error sending test message' }, { status: 500 });
  }
}
