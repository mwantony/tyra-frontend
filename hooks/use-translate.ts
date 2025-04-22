// hooks/useTranslate.js
import { useState } from 'react';
import axios from 'axios';

export function useTranslate() {
  const [loading, setLoading] = useState(false);

  const translate = async (text, source = 'en', target = 'pt') => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: text,
          langpair: `${source}|${target}`,
        },
      });

      const translated = response.data?.responseData?.translatedText;
      console.log(translated);
      return translated || text;
    } catch (error) {
      console.error('Erro ao traduzir:', error);
      return text;
    } finally {
      setLoading(false);
    }
  };

  return { translate, loading };
}
