import { useTranslation } from 'next-i18next'
import SETTINGS from '@constants/settings'
import { getWordOfDay } from '@lib/words'
import { useWordlist } from '@/hooks/useWordList'

export const useSettings = () => {
  const { i18n } = useTranslation()
  const { WORDS } = useWordlist()
  const { solution } = getWordOfDay(WORDS)
  const MAX_WORD_LENGTH = solution.length
  // @ts-ignore
  const selectedSettings = SETTINGS[i18n.language]
  const GAME_LOST_INFO_DELAY =
    (MAX_WORD_LENGTH + 1) * selectedSettings.REVEAL_TIME_MS

  return { MAX_WORD_LENGTH, GAME_LOST_INFO_DELAY, ...selectedSettings }
}
