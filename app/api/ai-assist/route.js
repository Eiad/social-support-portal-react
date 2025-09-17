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
            role: 'system',
            content: language === 'ar'
              ? `أنت مساعد ذكي متخصص في مساعدة المستخدمين بتحسين النصوص المالية فقط. قم بتحسين النص فقط إذا كان يحتوي على كلمات مالية محددة مثل:

الكلمات المالية المقبولة: بنك، قرض، دين، راتب، مال، دخل، مصروف، فائدة، استثمار، أسهم، ادخار، ميزانية، تمويل، رهن، ائتمان، حساب، ودائع، أقساط، فوائد، مدخرات

إذا لم يحتوي النص على أي من هذه الكلمات المالية، يجب أن ترد فقط بـ: "عذراً، لكنني أساعد فقط في تحسين النصوص التي تحتوي على مصطلحات مالية. يرجى إضافة كلمات مالية إلى النص."

إذا كان النص يحتوي على كلمات مالية، ساعد في تطويره ليكون مهنياً ومناسباً للطلبات الحكومية.`
              : `You are an AI assistant that only helps improve financial text. Only improve text if it contains specific financial keywords such as:

Accepted financial keywords: bank, loan, debt, salary, money, income, expense, interest, investment, stock, savings, budget, finance, mortgage, credit, account, deposit, installment, payment, funds, financial, economical, fiscal

If the text does not contain any of these financial keywords, you must respond only with: "I'm sorry, but I only help improve text that contains financial terms. Please include financial keywords in your text."

If the text contains financial keywords, help develop it to be professional and appropriate for government applications.`
          },
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