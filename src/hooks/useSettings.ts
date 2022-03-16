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
  const defaultSettings = {
    MAX_CHALLENGES: 6,
    ALERT_TIME_MS: 2000,
    REVEAL_TIME_MS: 200,
    WELCOME_INFO_MODAL_MS: 350,
  }
  const GAME_LOST_INFO_DELAY =
    (MAX_WORD_LENGTH + 1) * selectedSettings.REVEAL_TIME_MS

  return { MAX_WORD_LENGTH, GAME_LOST_INFO_DELAY, ...defaultSettings }
}
