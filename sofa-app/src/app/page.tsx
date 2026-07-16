'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  icon: string;
}

interface Translation {
  heroTitle: string;
  heroTitleAr: string;
  heroSubtitle: string;
  heroSubtitleAr: string;
  shopTitle: string;
  shopTitleAr: string;
  bookTitle: string;
  bookTitleAr: string;
  contactTitle: string;
  contactTitleAr: string;
  buyNow: string;
  buyNowAr: string;
  bookNow: string;
  bookNowAr: string;
  footerText: string;
  footerTextAr: string;
}

const translations: Translation = {
  heroTitle: 'Welcome to SOFA',
  heroTitleAr: 'مرحباً بكم في صوفا',
  heroSubtitle: 'Premium furniture showroom and maintenance services',
  heroSubtitleAr: 'معرض أثاث فاخر وخدمات صيانة',
  shopTitle: 'Our Products',
  shopTitleAr: 'منتجاتنا',
  bookTitle: 'Book Maintenance',
  bookTitleAr: 'حجز صيانة',
  contactTitle: 'Contact Us',
  contactTitleAr: 'اتصل بنا',
  buyNow: 'Buy Now',
  buyNowAr: 'اشترِ الآن',
  bookNow: 'Book Now',
  bookNowAr: 'احجز الآن',
  footerText: '© 2024 SOFA. All rights reserved.',
  footerTextAr: '© 2024 صوفا. جميع الحقوق محفوظة.'
};

const products: Product[] = [
  { id: 1, name: 'Luxury Sofa Set', nameAr: 'طقم أريكة فاخر', price: 1299, icon: '🛋️' },
  { id: 2, name: 'Modern Armchair', nameAr: 'كرسي بذراعين عصري', price: 599, icon: '🪑' },
  { id: 3, name: 'Coffee Table', nameAr: 'طاولة قهوة', price: 349, icon: '📦' },
  { id: 4, name: 'Dining Set', nameAr: 'طقم طعام', price: 899, icon: '🍽️' }
];

export default function Home() {
  const [isArabic, setIsArabic] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([
    { text: isArabic ? 'مرحباً! كيف يمكنني مساعدتك؟' : 'Hello! How can I help you?', isBot: true }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'repair',
    date: '',
    description: ''
  });

  const t = translations;
  const dir = isArabic ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = isArabic ? 'ar' : 'en';
  }, [isArabic]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    setMessages([...messages, { text: chatInput, isBot: false }]);
    
    setTimeout(() => {
      const responses = isArabic 
        ? ['شكراً لتواصلك معنا', 'سنتواصل معك قريباً', 'كيف يمكنني مساعدتك أكثر؟']
        : ['Thank you for contacting us', 'We will get back to you soon', 'How else can I help?'];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
    }, 1000);
    
    setChatInput('');
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      alert(isArabic ? 'تم إرسال طلبك بنجاح!' : 'Booking submitted successfully!');
      setFormData({ name: '', phone: '', email: '', service: 'repair', date: '', description: '' });
    } catch (error) {
      alert(isArabic ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.');
    }
  };

  const handleBuy = async (productId: number) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const product = await response.json();
      alert(isArabic ? `شكراً لاهتمامك بـ ${product.nameAr}` : `Thank you for your interest in ${product.name}`);
    } catch (error) {
      alert(isArabic ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.');
    }
  };

  return (
    <div className={dir}>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <div className="logo-placeholder">S</div>
            <span className="logo-text">SOFA</span>
          </div>
          <nav className="nav">
            <button 
              className="lang-btn" 
              onClick={() => setIsArabic(!isArabic)}
            >
              {isArabic ? 'English' : 'العربية'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>{isArabic ? t.heroTitleAr : t.heroTitle}</h1>
          <p>{isArabic ? t.heroSubtitleAr : t.heroSubtitle}</p>
        </div>
      </section>

      {/* Shop Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{isArabic ? t.shopTitleAr : t.shopTitle}</h2>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.icon}</div>
                <div className="product-info">
                  <h3 className="product-name">{isArabic ? product.nameAr : product.name}</h3>
                  <p className="product-price">${product.price}</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleBuy(product.id)}
                  >
                    {isArabic ? t.buyNowAr : t.buyNow}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="section" style={{background: '#fff'}}>
        <div className="container">
          <h2 className="section-title">{isArabic ? t.bookTitleAr : t.bookTitle}</h2>
          <form className="booking-form" onSubmit={handleBookingSubmit}>
            <div className="form-group">
              <label>{isArabic ? 'الاسم' : 'Name'}</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>{isArabic ? 'الهاتف' : 'Phone'}</label>
              <input 
                type="tel" 
                required 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>{isArabic ? 'البريد الإلكتروني' : 'Email'}</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>{isArabic ? 'نوع الخدمة' : 'Service Type'}</label>
              <select 
                value={formData.service}
                onChange={e => setFormData({...formData, service: e.target.value})}
              >
                <option value="repair">{isArabic ? 'إصلاح' : 'Repair'}</option>
                <option value="maintenance">{isArabic ? 'صيانة' : 'Maintenance'}</option>
                <option value="cleaning">{isArabic ? 'تنظيف' : 'Cleaning'}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{isArabic ? 'التاريخ المفضل' : 'Preferred Date'}</label>
              <input 
                type="date" 
                required 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>{isArabic ? 'الوصف' : 'Description'}</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {isArabic ? t.bookNowAr : t.bookNow}
            </button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{isArabic ? t.contactTitleAr : t.contactTitle}</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>{isArabic ? 'الهاتف' : 'Phone'}</h3>
              <p>+1 555-123-4567</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>{isArabic ? 'البريد الإلكتروني' : 'Email'}</h3>
              <p>info@sofashowroom.com</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>+1 555-987-6543</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <div className="chat-widget">
        {showChat && (
          <div className="chat-window">
            <div className="chat-header">
              <span>{isArabic ? 'الدردشة الحية' : 'Live Chat'}</span>
              <button className="chat-close" onClick={() => setShowChat(false)}>×</button>
            </div>
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input 
                type="text" 
                placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>➤</button>
            </div>
          </div>
        )}
        <button className="chat-button" onClick={() => setShowChat(!showChat)}>
          💬
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>{isArabic ? t.footerTextAr : t.footerText}</p>
        </div>
      </footer>
    </div>
  );
}
