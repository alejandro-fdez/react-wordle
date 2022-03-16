import { useTranslation } from 'next-i18next'
import SETTINGS from '@constants/settings'
import { useWordsInfo } from '@lib/useWordsInfo'

export const useGetSettings = () => {
  const { i18n } = useTranslation()
  const { solution } = useWordsInfo()
  // @ts-ignore
  const SELECTED_SETTINGS = SETTINGS[i18n.language]
  const MAX_WORD_LENGTH = solution.length
  const GAME_LOST_INFO_DELAY =
    (MAX_WORD_LENGTH + 1) * SELECTED_SETTINGS.REVEAL_TIME_MS

  return { MAX_WORD_LENGTH, GAME_LOST_INFO_DELAY, ...SELECTED_SETTINGS }
}
