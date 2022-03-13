import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

import { useTranslation } from 'next-i18next'
import { STRINGS_NS } from '@core/i18n/namespaces'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
}: Props) => {
  const { t } = useTranslation(STRINGS_NS)
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="flex flex-col mt-2 divide-y">
        <SettingsToggle
          settingName={t('HARD_MODE_TITLE')}
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={t('HARD_MODE_DESCRIPTION')}
        />
        <SettingsToggle
          settingName={t('DARK_MODE_TITLE')}
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName={t('HIGH_CONTRAST_MODE_TITLE')}
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={t('HIGH_CONTRAST_MODE_DESCRIPTION')}
        />
      </div>
    </BaseModal>
  )
}
