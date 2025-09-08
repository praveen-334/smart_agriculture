import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ta';

interface Translations {
  [key: string]: {
    en: string;
    ta: string;
  };
}

const translations: Translations = {
  appName: {
    en: "FarmAssist",
    ta: "விவசாய உதவி"
  },
  welcomeMessage: {
    en: "Smart Farming Solutions for Tamil Nadu",
    ta: "தமிழ்நாட்டுக்கான புத்திசாலித்தனமான விவசாய தீர்வுகள்"
  },
  selectLanguage: {
    en: "Select Language",
    ta: "மொழியைத் தேர்ந்தெடுக்கவும்"
  },
  dashboard: {
    en: "Dashboard",
    ta: "முதன்மை பக்கம்"
  },
  cropDiagnosis: {
    en: "Crop Disease Diagnosis",
    ta: "பயிர் நோய் கண்டறிதல்"
  },
  marketplace: {
    en: "Marketplace",
    ta: "சந்தை"
  },
  weather: {
    en: "Weather & Crop Guide",
    ta: "வானிலை மற்றும் பயிர் வழிகாட்டி"
  },
  schemes: {
    en: "Government Schemes",
    ta: "அரசு திட்டங்கள்"
  },
  community: {
    en: "Community Forum",
    ta: "சமுதாய மன்றம்"
  },
  continue: {
    en: "Continue",
    ta: "தொடர்க"
  },
  uploadImage: {
    en: "Upload Crop Image",
    ta: "பயிர் படத்தை பதிவேற்றவும்"
  },
  diagnose: {
    en: "Diagnose Disease",
    ta: "நோயை கண்டறிக"
  },
  currentWeather: {
    en: "Current Weather",
    ta: "தற்போதைய வானிலை"
  },
  latestSchemes: {
    en: "Latest Government Schemes",
    ta: "சமீபத்திய அரசு திட்டங்கள்"
  },
  marketplace_desc: {
    en: "Buy and sell crops directly",
    ta: "பயிர்களை நேரடியாக வாங்க மற்றும் விற்க"
  },
  english: {
    en: "English",
    ta: "ஆங்கிலம்"
  },
  tamil: {
    en: "Tamil",
    ta: "தமிழ்"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('farmassist-language') as Language;
    if (savedLanguage && ['en', 'ta'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('farmassist-language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};