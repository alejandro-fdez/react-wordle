import * as enWordlist from './en/wordlist'
import * as esWordlist from './es/wordlist'
import { LanguageObj } from '@/utils/types/common'

const WORDLIST: LanguageObj = {
  en: enWordlist.WORDS,
  es: esWordlist.WORDS,
}

export default WORDLIST
