import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import XHR from 'i18next-xhr-backend';

i18n
  .use(XHR)
  .use(initReactI18next)
  .init({
    fallbackLng: 'EN',
    ns: ['trans'],
    defaultNS: 'trans',
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    }
});

export default i18n;