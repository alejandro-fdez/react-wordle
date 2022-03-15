import { GameStats, useLocalStorage } from '@/hooks/useLocalStorage'

export const useStats = () => {
  const { loadStatsFromLocalStorage, saveStatsToLocalStorage } =
    useLocalStorage()
  const addStatsForCompletedGame = (
    gameStats: GameStats,
    count: number,
    maxChallenges: number
  ) => {
    // Count is number of incorrect guesses before end.
    const stats = { ...gameStats }

    stats.totalGames += 1

    if (count >= maxChallenges) {
      // A fail situation
      stats.currentStreak = 0
      stats.gamesFailed += 1
    } else {
      stats.winDistribution[count] += 1
      stats.currentStreak += 1

      if (stats.bestStreak < stats.currentStreak) {
        stats.bestStreak = stats.currentStreak
      }
    }

    stats.successRate = getSuccessRate(stats)

    saveStatsToLocalStorage(stats)
    return stats
  }

  const defaultStats = (maxChallenges: number): GameStats => ({
    winDistribution: Array.from(new Array(maxChallenges), () => 0),
    gamesFailed: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalGames: 0,
    successRate: 0,
  })

  const loadStats = (maxChallenges: number) => {
    return loadStatsFromLocalStorage() || defaultStats(maxChallenges)
  }

  const getSuccessRate = (gameStats: GameStats) => {
    const { totalGames, gamesFailed } = gameStats

    return Math.round(
      (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
    )
  }

  return { loadStats, addStatsForCompletedGame }
}
