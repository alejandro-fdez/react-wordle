import { useTranslation } from 'next-i18next'

type StoredGameState = {
  guesses: string[]
  solution: string
}

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const useLocalStorage = () => {
  const { i18n } = useTranslation()
  const gameStateKey = 'gameState-' + i18n.language
  const highContrastKey = 'highContrast'
  const gameStatKey = 'gameStats-' + i18n.language

  const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
    localStorage.setItem(gameStateKey, JSON.stringify(gameState))
  }

  const loadGameStateFromLocalStorage = () => {
    const state = localStorage.getItem(gameStateKey)
    return state ? (JSON.parse(state) as StoredGameState) : null
  }

  const saveStatsToLocalStorage = (gameStats: GameStats) => {
    localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
  }

  const loadStatsFromLocalStorage = () => {
    const stats = localStorage.getItem(gameStatKey)
    return stats ? (JSON.parse(stats) as GameStats) : null
  }

  const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
    if (isHighContrast) {
      localStorage.setItem(highContrastKey, '1')
    } else {
      localStorage.removeItem(highContrastKey)
    }
  }

  const getStoredIsHighContrastMode = () => {
    const highContrast = localStorage.getItem(highContrastKey)
    return highContrast === '1'
  }

  return {
    saveGameStateToLocalStorage,
    loadGameStateFromLocalStorage,
    saveStatsToLocalStorage,
    loadStatsFromLocalStorage,
    setStoredIsHighContrastMode,
    getStoredIsHighContrastMode,
  }
}
