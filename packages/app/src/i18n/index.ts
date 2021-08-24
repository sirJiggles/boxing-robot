import i18next from 'i18next'
import { en } from './en'

i18next.init({
  // until / unless we have some other language support just make it en
  // and don't use browser detection
  lng: 'en',
  resources: {
    en,
  },
})

export default i18next
