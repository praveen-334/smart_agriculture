import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Languages, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  onContinue: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onContinue }) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageSelect = (lang: 'en' | 'ta') => {
    setLanguage(lang);
    setTimeout(onContinue, 300); // Small delay for smooth transition
  };

  return (
    <div className="min-h-screen bg-gradient-earth flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Logo and Welcome */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-glow">
            <Globe className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground">
            {t('appName')}
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            {t('welcomeMessage')}
          </p>
        </div>

        {/* Language Selection Card */}
        <Card className="shadow-natural backdrop-blur-sm bg-background/95">
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <Languages className="w-8 h-8 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-foreground">
                {t('selectLanguage')}
              </h2>
            </div>

            <div className="grid gap-4">
              <Button 
                variant={language === 'en' ? 'farmer' : 'outline'}
                size="lg"
                onClick={() => handleLanguageSelect('en')}
                className="w-full justify-start text-left"
              >
                <span className="text-2xl mr-3">🇬🇧</span>
                <div>
                  <div className="font-semibold">English</div>
                  <div className="text-sm opacity-75">Continue in English</div>
                </div>
              </Button>

              <Button 
                variant={language === 'ta' ? 'farmer' : 'outline'}
                size="lg"
                onClick={() => handleLanguageSelect('ta')}
                className="w-full justify-start text-left"
              >
                <span className="text-2xl mr-3">🇮🇳</span>
                <div>
                  <div className="font-semibold">தமிழ்</div>
                  <div className="text-sm opacity-75">தமிழில் தொடரவும்</div>
                </div>
              </Button>
            </div>

            {language && (
              <Button 
                variant="field" 
                size="lg" 
                onClick={onContinue}
                className="w-full animate-scale-in"
              >
                {t('continue')} →
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};