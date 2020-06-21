import i18n from 'i18next'

import { initReactI18next } from 'react-i18next'

// the translations

// (tip move them in a JSON file and import them)

const resources = {
  en: {
    translation: {
      Home: 'Home',
      mobile_example: 'example:9389742591',
      valid_usernames: 'valid: lowercase letters, numbers and _',
      who_are_you: 'Who Are you?',
      project_title_helper_text: 'A unique title',
      type_a_skill: 'Type a tag and press +',
      input: "Employer's files",
      output: "Employee's files",
      country_code: 'country code',
      country_code_example: 'example:0098',
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
      who_are_you: 'که هستید؟',
      'login / register': 'ورود / ثبت‌نام',
      'mobile verification': 'تأیید موبایل',
      Register: 'ثبت‌نام',
      mobile_example: 'مثال:9389742591',
      'Send me a sms': 'پیامک بفرست',
      mobile: 'موبایل',
      name: 'نام',
      "I'm an": 'منم یک',
      Employee: 'استخدام‌شونده',
      Employer: 'استخدام‌کننده',
      code: 'کد',
      'code you recieved': 'کدی که دریافت کردید',
      'correct mobile': 'تصحیح موبایل',
      valid_usernames: 'مجاز: حروف کوچک، عدد و _ ',
      Back: 'بازگشت',
      title: 'تیتر',
      project_title_helper_text: 'یک تیتر متمایز و یکتا',
      description: 'توضیحات',
      type_a_skill: 'یک برچسب بنویسید و + را بزنید.',
      Create: 'ایجاد',
      Update: 'به‌روزرسانی',
      employee: 'مجری',
      input: 'اسناد کارفرما',
      output: 'اسناد مجری',
      country_code: 'کد کشور',
      country_code_example: 'مثال:0098',
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
