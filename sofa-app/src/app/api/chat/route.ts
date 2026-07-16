import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, language = 'en' } = body;
    
    // Simple chatbot responses (replace with AI/NLP service in production)
    const responses = {
      en: [
        'Thank you for your message. How can I help you today?',
        'Our team will respond shortly. Is there anything else I can assist with?',
        'For immediate assistance, please call us at +1 555-123-4567',
        'You can also reach us via WhatsApp at +1 555-987-6543'
      ],
      ar: [
        'شكراً لرسالتك. كيف يمكنني مساعدتك اليوم؟',
        'سيقوم فريقنا بالرد قريباً. هل هناك شيء آخر يمكنني مساعدتك به؟',
        'للحصول على مساعدة فورية، يرجى الاتصال بنا على +1 555-123-4567',
        'يمكنك أيضاً التواصل معنا عبر واتساب على +1 555-987-6543'
      ]
    };
    
    const langResponses = language === 'ar' ? responses.ar : responses.en;
    const reply = langResponses[Math.floor(Math.random() * langResponses.length)];
    
    return NextResponse.json({ 
      success: true, 
      response: reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' }, 
      { status: 500 }
    );
  }
}
