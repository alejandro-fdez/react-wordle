import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '@lib/localStorage'
import { shareStatus } from '@lib/share'
import { getWordOfDay } from '@lib/words'
import { BaseModal } from './BaseModal'
import { useTranslation } from 'next-i18next'
import { useSettings } from '@/hooks/useSettings'
import { STRINGS_NS } from '@core/i18n/namespaces'
import { useWordlist } from '@/hooks/useWordList'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
}: Props) => {
  const { t } = useTranslation(STRINGS_NS)
  const { MAX_CHALLENGES } = useSettings()
  const { WORDS } = useWordlist()
  const { solution, solutionIndex, tomorrow } = getWordOfDay(WORDS)
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={t('STATISTICS_TITLE')}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={t('STATISTICS_TITLE')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {t('GUESS_DISTRIBUTION_TEXT')}
      </h4>
      <Histogram
        gameStats={gameStats}
        numberOfGuessesMade={numberOfGuessesMade}
      />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
          <div>
            <h5>{t('NEW_WORD_TEXT')}</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => {
              shareStatus(
                guesses,
                isGameLost,
                isHardMode,
                isDarkMode,
                isHighContrastMode,
                handleShareToClipboard,
                MAX_CHALLENGES,
                solutionIndex,
                solution,
                t
              )
            }}
          >
            {t('SHARE_TEXT')}
          </button>
        </div>
      )}
    </BaseModal>
  )
}
