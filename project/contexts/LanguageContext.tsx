'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.login': 'Giriş Yap',
    'nav.register': 'Kayıt Ol',
    'nav.dashboard': 'Panel',
    'nav.discounts': 'İndirimler',
    'nav.logout': 'Çıkış Yap',
    
    // Home Page
    'home.title': 'Öğrenci Hayatı',
    'home.subtitle': 'Öğrenciler için Akıllı İndirim Takibi',
    'home.description': 'Çevrendeki marketlerdeki en iyi indirimleri keşfet, öğrenci bütçeni koruyarak akıllıca alışveriş yap.',
    'home.features.title': 'Neden Öğrenci Hayatı?',
    'home.features.discount': 'Gerçek Zamanlı İndirimler',
    'home.features.discount.desc': 'A101, BİM, ŞOK, Migros ve daha fazlasında güncel indirimler',
    'home.features.location': 'Konum Bazlı Arama',
    'home.features.location.desc': 'Yaşadığın şehir ve ilçeye özel indirim fırsatları',
    'home.features.save': 'Akıllı Tasarruf',
    'home.features.save.desc': 'En iyi fiyatları karşılaştır, bütçeni verimli kullan',
    'home.cta': 'Hemen Başla',
    
    // Auth
    'auth.email': 'E-posta',
    'auth.password': 'Şifre',
    'auth.username': 'Kullanıcı Adı',
    'auth.login': 'Giriş Yap',
    'auth.register': 'Kayıt Ol',
    'auth.login.title': 'Hesabına Giriş Yap',
    'auth.register.title': 'Yeni Hesap Oluştur',
    'auth.login.subtitle': 'İndirimlerden faydalanmak için giriş yap',
    'auth.register.subtitle': 'Ücretsiz hesap oluştur ve tasarrufa başla',
    'auth.no.account': 'Hesabın yok mu?',
    'auth.have.account': 'Zaten hesabın var mı?',
    'auth.error.invalid': 'Geçersiz e-posta veya şifre',
    'auth.error.exists': 'Bu e-posta adresi zaten kayıtlı',
    'auth.error.fill': 'Lütfen tüm alanları doldurun',
    
    // Dashboard
    'dashboard.welcome': 'Hoş geldin',
    'dashboard.subtitle': 'İndirim fırsatlarını keşfetmeye hazır mısın?',
    'dashboard.view.discounts': 'İndirimleri Gör',
    'dashboard.stats.title': 'Bu Hafta',
    'dashboard.stats.discounts': 'Yeni İndirim',
    'dashboard.stats.savings': 'Tasarruf Fırsatı',
    'dashboard.stats.stores': 'Aktif Market',
    
    // Discounts
    'discounts.title': 'Market İndirimleri',
    'discounts.select.city': 'Şehir Seç',
    'discounts.select.district': 'İlçe Seç',
    'discounts.old.price': 'Eski Fiyat',
    'discounts.new.price': 'İndirimli Fiyat',
    'discounts.valid.until': 'Geçerlilik',
    'discounts.no.discounts': 'Seçilen bölgede indirim bulunamadı',
    'discounts.select.location': 'Lütfen şehir ve ilçe seçin',
    
    // Common
    'common.loading': 'Yükleniyor...',
    'common.error': 'Bir hata oluştu',
    'common.success': 'Başarılı',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.discounts': 'Discounts',
    'nav.logout': 'Logout',
    
    // Home Page
    'home.title': 'Student Life',
    'home.subtitle': 'Smart Discount Tracking for Students',
    'home.description': 'Discover the best discounts in nearby stores, shop smart while protecting your student budget.',
    'home.features.title': 'Why Student Life?',
    'home.features.discount': 'Real-time Discounts',
    'home.features.discount.desc': 'Current discounts at A101, BİM, ŞOK, Migros and more',
    'home.features.location': 'Location-based Search',
    'home.features.location.desc': 'Discount opportunities specific to your city and district',
    'home.features.save': 'Smart Savings',
    'home.features.save.desc': 'Compare best prices, use your budget efficiently',
    'home.cta': 'Get Started',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.username': 'Username',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.login.title': 'Login to Your Account',
    'auth.register.title': 'Create New Account',
    'auth.login.subtitle': 'Login to benefit from discounts',
    'auth.register.subtitle': 'Create a free account and start saving',
    'auth.no.account': "Don't have an account?",
    'auth.have.account': 'Already have an account?',
    'auth.error.invalid': 'Invalid email or password',
    'auth.error.exists': 'This email address is already registered',
    'auth.error.fill': 'Please fill in all fields',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.subtitle': 'Ready to discover discount opportunities?',
    'dashboard.view.discounts': 'View Discounts',
    'dashboard.stats.title': 'This Week',
    'dashboard.stats.discounts': 'New Discounts',
    'dashboard.stats.savings': 'Savings Opportunity',
    'dashboard.stats.stores': 'Active Stores',
    
    // Discounts
    'discounts.title': 'Store Discounts',
    'discounts.select.city': 'Select City',
    'discounts.select.district': 'Select District',
    'discounts.old.price': 'Old Price',
    'discounts.new.price': 'Discounted Price',
    'discounts.valid.until': 'Valid Until',
    'discounts.no.discounts': 'No discounts found in selected area',
    'discounts.select.location': 'Please select city and district',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');

  useEffect(() => {
    const savedLang = localStorage.getItem('student-life-language') as Language;
    if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('student-life-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}