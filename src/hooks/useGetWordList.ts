import { useTranslation } from 'next-i18next'
import WORDLIST from '@constants/wordlist'

interface useWordlistType {
  wordlist: string[]
}

export const useWordlist = (): useWordlistType => {
  const { i18n } = useTranslation()
  // @ts-ignore
  return { wordlist: WORDLIST[i18n.language] }
}
