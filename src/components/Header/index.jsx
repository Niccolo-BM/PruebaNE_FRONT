import React from 'react';
import { useTranslation } from 'react-i18next';
import './index.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <header className="bg-white text-slate-900 p-4 shadow-sm">
      <div className="container mx-auto grid grid-cols-2 items-center">
        <div className="grid grid-rows-2 gap-1 items-center">
          <h1 className="text-3xl font-bold text-[#1E293B]">{t('header.title')}</h1>
          <p className="text-m text-[#4B5563]">{t('header.subtitle')}</p>
        </div>
        <div className="flex justify-end items-center space-x-2">
          <span className="text-lg text-[#6B7280] p-2">user@example.com</span>
          <button
            onClick={toggleLang}
            className="bg-[#f3f4f6] hover:bg-[#e5e7eb] px-2 py-1 rounded-md text-sm"
          >
            {i18n.language === 'en' ? 'ES' : 'EN'}
          </button>
          <button className="bg-[#2563EB] hover:bg-[#1D4ED8] px-2 py-2 rounded-md text-sm text-white">
            {t('header.logout')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

