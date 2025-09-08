import React, { useState, useEffect } from 'react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Dashboard } from '@/components/Dashboard';
import { CropDiagnosis } from '@/components/CropDiagnosis';
import { Marketplace } from '@/components/Marketplace';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const [currentSection, setCurrentSection] = useState<string>('language');
  const { language } = useLanguage();

  useEffect(() => {
    // Check if language was already selected
    const hasSelectedLanguage = localStorage.getItem('farmassist-language');
    if (hasSelectedLanguage) {
      setCurrentSection('dashboard');
    }
  }, []);

  const handleLanguageComplete = () => {
    setCurrentSection('dashboard');
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleBack = () => {
    setCurrentSection('dashboard');
  };

  if (currentSection === 'language') {
    return <LanguageSelector onContinue={handleLanguageComplete} />;
  }

  if (currentSection === 'dashboard') {
    return <Dashboard onNavigate={handleNavigate} />;
  }

  if (currentSection === 'diagnosis') {
    return <CropDiagnosis onBack={handleBack} />;
  }

  if (currentSection === 'marketplace') {
    return <Marketplace onBack={handleBack} />;
  }

  // Default fallback
  return <Dashboard onNavigate={handleNavigate} />;
};

export default Index;
