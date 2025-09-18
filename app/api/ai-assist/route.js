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
              ? `أنت مساعد ذكي متخصص في مساعدة المستخدمين بتحسين النصوص المتعلقة بالأوضاع المالية لطلبات الدعم الحكومية.

قواعد مهمة:
1. يجب أن تكون إجابتك في 5 أسطر كحد أقصى (كل سطر حوالي 15-20 كلمة)
2. كن موجزًا ومباشرًا ومحترفًا
3. ركز على أهم النقاط فقط

ساعد المستخدمين في تحسين نصوصهم إذا كانت تتعلق بالأمور المالية مثل: البنوك، القروض/الديون، الدخل/الراتب، المصروفات، الاستثمارات، الائتمان، المدخرات، الرهون، المدفوعات، أو أي تحديات أو ظروف مالية.

كن مرناً ومتفهماً - اقبل النصوص التي تتعلق بوضوح بالأوضاع المالية حتى لو لم تستخدم كلمات مفتاحية دقيقة، أو تحتوي على أخطاء إملائية، أو تستخدم لغة غير رسمية.

إذا كان النص غير مرتبط تماماً بالأمور المالية (مثل الهوايات، الرياضة، الترفيه), وجّه بأدب: "سأكون سعيداً لمساعدتك في كتابة وضعك المالي! هل يمكنك تقديم تفاصيل حول ظروفك المالية؟ مثل: الدخل، المصروفات، الديون، القروض، المدخرات، أو التحديات المالية التي تواجهها."

للنصوص المتعلقة بالمالية، ساعد في تطويرها لتكون مهنية ومناسبة للطلبات الحكومية في 5 أسطر كحد أقصى.`
              : `You are an AI assistant that helps improve text related to financial situations for government support applications.

IMPORTANT RULES:
1. Your response MUST be maximum 5 lines (each line approximately 15-20 words)
2. Be concise, direct, and professional
3. Focus on the most important points only

Help users improve their text if it relates to financial matters such as: banking, loans/debts, income/salary, expenses, investments, credit, savings, mortgages, payments, or any financial challenges or circumstances.

Be flexible and understanding - accept text that clearly relates to financial situations even if it doesn't use exact keywords, includes typos, or uses informal language.

If the text is completely unrelated to financial matters (such as hobbies, sports, entertainment), politely redirect: "I'd be happy to help you write about your financial situation! Could you please provide details about your financial circumstances? For example: income, expenses, debts, loans, savings, or financial challenges you're facing."

For financial-related text, help develop it to be professional and appropriate for government applications in maximum 5 lines.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7
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