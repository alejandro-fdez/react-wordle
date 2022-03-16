import { useTranslation } from 'next-i18next'
import WORDLIST from '@constants/wordlist'
import { useMemo } from 'react'
import { WordList } from '@/utils/types/common'

export const useWordlist = () => {
  const { i18n } = useTranslation()
  // @ts-ignore
  const selectedWordList = WORDLIST[i18n.language]
  const finalList = useMemo(
    () => filterWords(selectedWordList),
    [selectedWordList]
  )

  return { WORDS: finalList }
}

const filterWords = (wordList: WordList): WordList =>
  wordList.filter((word) => word.length >= 5 && word.length <= 7)
