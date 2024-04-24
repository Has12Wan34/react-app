import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  EN: {
    translation: {
      "Move_left": "Move left",
      "Move_top": "Move top",
      "Move_bottom": "Move bottom",
      "Move_rigth": "Move rigth",
      "Detail": "Detail",
      "prefix": "Prefix",
      "fname": "FirtsName",
      "lname": "LastName",
      "birthdate": "Birthdate",
      "nationality": "Nationality",
      "cardnumber": "ID Card Number",
      "passport": "Passport",
      "phonenumber": "PhoneNumber",
      "salary": "Salary",
      "gender": "Gender",
      "detail_prefix": "Please input Prefix",
      "detail_fname": "Please input FirtsName",
      "detail_lname": "Please input LastName",
      "detail_birthdate": "Please input Birthdate",
      "detail_nationality": "Please input Nationality",
      "detail_cardnumber": "Please input ID Card Number",
      "detail_passport": "Please input Passport",
      "detail_phonenumber": "Please input PhoneNumber",
      "detail_salary": "Please input Salary",
      "detail_gender": "Please input Gender",
      "err_prefix": "*Please input Prefix",
      "err_fname": "*Please input FirtsName",
      "err_lname": "*Please input LastName",
      "err_birthdate": "*Please input Birthdate",
      "err_nationality": "*Please input Nationality",
      "err_cardnumber": "*Please input ID Card Number",
      "err_passport": "*Please input Passport",
      "err_phonenumber": "*Please input PhoneNumber",
      "err_salary": "*Please input Salary",
      "err_gender": "*Please input Gender",
      "man": "Man",
      "woman": "Woman",
      "other": "Other",
      "submit": "Submit",
      "clear": "Clear",
      "delete": "Delete",
      "fname_lname": "FirstName LastName",
      "action": "Action"
    }
  },
  TH: {
    translation: {
      "Move_left": "เลื่อนซ้าย",
      "Move_top": "ย้ายขึ้นบน",
      "Move_bottom": "ย้ายลงล่าง",
      "Move_rigth": "เลื่อนขวา",
      "Detail": "รายละเอียด",
      "prefix": "คำนำหน้า",
      "fname": "ชื่อจริง",
      "lname": "นามสกุล",
      "birthdate": "วันเกิด",
      "nationality": "สัญชาติ",
      "cardnumber": "หมายเลขบัตรประชาชน",
      "passport": "หนังสือเดินทาง",
      "phonenumber": "เบอร์มือถือ",
      "salary": "เงินเดือน",
      "gender": "เพศ",
      "detail_prefix": "โปรดระบุคำนำหน้า",
      "detail_fname": "โปรดระบุชื่อจริง",
      "detail_lname": "โปรดระบุนามสกุล",
      "detail_birthdate": "โปรดระบุวันเกิด",
      "detail_nationality": "โปรดระบุสัญชาติ",
      "detail_cardnumber": "โปรดระบุหมายเลขบัตรประชาชน",
      "detail_passport": "โปรดระบุหนังสือเดินทาง",
      "detail_phonenumber": "โปรดระบุเบอร์มือถือ",
      "detail_salary": "โปรดระบุเงินเดือน",
      "detail_gender": "โปรดระบุเพศ",
      "err_prefix": "*โปรดระบุคำนำหน้า",
      "err_fname": "*โปรดระบุชื่อจริง",
      "err_lname": "*โปรดระบุนามสกุล",
      "err_birthdate": "*โปรดระบุวันเกิด",
      "err_nationality": "*โปรดระบุสัญชาติ",
      "err_cardnumber": "*โปรดระบุหมายเลขบัตรประชาชน",
      "err_passport": "*โปรดระบุหนังสือเดินทาง",
      "err_phonenumber": "*โปรดระบุเบอร์มือถือ",
      "err_salary": "*โปรดระบุเงินเดือน",
      "err_gender": "*โปรดระบุเพศ",
      "man": "ผู้ชาย",
      "woman": "ผู้หญิง",
      "other": "อื่นๆ",
      "submit": "บันทึก",
      "clear": "ล้างข้อมูล",
      "delete": "ลบข้อมูล",
      "fname_lname": "ชื่อ-นามสกุล",
      "action": "จัดการ"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "EN",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;