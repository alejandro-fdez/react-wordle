import * as enValidGuesses from './en/validGuesses'
import * as esValidGuesses from './es/validGuesses'
import { LanguageObj } from '@/utils/types/common'

const VALID_GUESSES: LanguageObj = {
  en: enValidGuesses.VALID_GUESSES,
  es: esValidGuesses.VALID_GUESSES,
}

export default VALID_GUESSES
