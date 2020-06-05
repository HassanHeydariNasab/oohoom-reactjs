import i18n from 'i18next'

import { initReactI18next } from 'react-i18next'

// the translations

// (tip move them in a JSON file and import them)

const resources = {
  en: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next',
      Home: 'Home',
    },
  },
  fa: {
    translation: {
      Home: 'خانه',
      Logout: 'خروج',
      Login: 'ورود',
      'Assign to me': 'پذیرفتن',
      'Assigned to me': 'پذیرفتید',
      'Create Project': 'ایجاد پروژه',
      '?Who are you': 'که هستید؟',
      'login / register': 'ورود / ثبت‌نام',
      'mobile verification': 'تأیید موبایل',
      Register: 'ثبت‌نام',
      'example:00989389742591': 'مثال:00989389742591',
      'Send me a sms': 'پیامک بفرست',
      mobile: 'موبایل',
      name: 'نام',
      "I'm an": 'منم یک',
      Employee: 'استخدام شونده',
      Employer: 'استخدام‌کننده',
      code: 'کد',
      'code you recieved': 'کدی که دریافت کردید',
      'correct mobile': 'تصحیح موبایل',
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'fa',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
