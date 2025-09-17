import { NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.NEXT_OPENAI_API_KEY;

export async function POST(request) {
  try {
    const { prompt, currentText, language = 'en' } = await request.json();

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return NextResponse.json(
        { error: 'Failed to get AI assistance' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const suggestion = data.choices[0]?.message?.content || 'Unable to generate suggestion';

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('AI assist error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}