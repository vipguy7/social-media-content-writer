
import { useState, useEffect } from 'react';

interface LocaleData {
  [key: string]: any;
}

export const useLocalization = (locale: string = 'my') => {
  const [localeData, setLocaleData] = useState<LocaleData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLocale = async () => {
      try {
        const data = await import(`../locales/${locale}.json`);
        setLocaleData(data.default);
      } catch (error) {
        console.error(`Failed to load locale ${locale}:`, error);
        // Fallback to English or default strings
      } finally {
        setIsLoading(false);
      }
    };

    loadLocale();
  }, [locale]);

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value = localeData;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }
    
    return typeof value === 'string' ? value : fallback || key;
  };

  return { t, isLoading, localeData };
};
