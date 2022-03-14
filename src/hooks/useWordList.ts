import { useTranslation } from 'next-i18next'
import WORDLIST from '@constants/wordlist'

export const useWordlist = () => {
  const { i18n } = useTranslation()
  // @ts-ignore
  return WORDLIST[i18n.language]
}
