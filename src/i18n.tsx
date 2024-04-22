import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Move_left": "Move left",
      "Move_top": "Move top",
      "Move_bottom": "Move bottom",
      "Move_rigth": "Move rigth",
      "Travel App": "Travel App",
      "Around the world": "Around the world",
      "See More": "See More"
    }
  },
  th: {
    translation: {
      "Move_left": "เลื่อนซ้าย",
      "Move_top": "ย้ายขึ้นบน",
      "Move_bottom": "ย้ายลงล่าง",
      "Move_rigth": "เลื่อนขวา",
      "Around the world": "ท่องเที่ยวรอบโลก",
      "See More": "ดูรายละเอียด"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;