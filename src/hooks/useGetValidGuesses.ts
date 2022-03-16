import { useTranslation } from 'next-i18next'
import VALID_GUESSES from '@constants/validGuesses'

export const useValidGuesses = () => {
  const { i18n } = useTranslation()
  // @ts-ignore
  return VALID_GUESSES[i18n.language]
}
