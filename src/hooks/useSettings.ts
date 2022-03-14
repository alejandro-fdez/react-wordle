import { useTranslation } from 'next-i18next'
import SETTINGS from '@constants/settings'

export const useSettings = () => {
  const { i18n } = useTranslation()
  // @ts-ignore
  return SETTINGS[i18n.language]
}
