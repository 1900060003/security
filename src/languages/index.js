import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import elementVILocale from 'element-ui/lib/locale/lang/vi' // element-ui lang
import en from './en'
import zh from './zh'
// import vi from './vi'

Vue.use(VueI18n)

const messages = {
  en: {
    ...en,
    ...elementEnLocale
  },
  zh: {
    ...zh,
    ...elementZhLocale
  },
  vi: {
    // ...vi
    ...elementVILocale
  }
}
const i18n = new VueI18n({
  locale: localStorage.getItem('languages') || 'zh', // set locale
  messages // set locale messages
})
export default i18n
