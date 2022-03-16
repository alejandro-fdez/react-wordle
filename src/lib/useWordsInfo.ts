import { useStatutes } from './useStatuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { useWordlist } from '@/hooks/useGetWordList'
import { useValidGuesses } from '@/hooks/useGetValidGuesses'
import { useTranslation } from 'next-i18next'

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}
export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const useWordsInfo = () => {
  const { t } = useTranslation()
  const { wordlist } = useWordlist()
  const { validGuesses } = useValidGuesses()
  const { getGuessStatuses } = useStatutes()

  const isWordInWordList = (word: string) => {
    return (
      wordlist.includes(localeAwareLowerCase(word)) ||
      validGuesses.includes(localeAwareLowerCase(word))
    )
  }

  const isWinningWord = (word: string) => {
    return solution === word
  }

  // build a set of previously revealed letters - present and correct
  // guess must use correct letters in that space and any other revealed letters
  // also check if all revealed instances of a letter are used (i.e. two C's)
  const findFirstUnusedReveal = (word: string) => {
    if (validGuesses.length === 0) {
      return false
    }

    const lettersLeftArray = new Array<string>()
    const guess = validGuesses[validGuesses.length - 1]
    const statuses = getGuessStatuses(guess)
    const splitWord = unicodeSplit(word)
    const splitGuess = unicodeSplit(guess)

    for (let i = 0; i < splitGuess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        lettersLeftArray.push(splitGuess[i])
      }
      if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
        return t('strings:WRONG_SPOT_MESSAGE', {
          guess: splitGuess[i],
          position: i + 1,
        })
      }
    }

    // check for the first unused letter, taking duplicate letters
    // into account - see issue #198
    let n
    for (const letter of splitWord) {
      n = lettersLeftArray.indexOf(letter)
      if (n !== -1) {
        lettersLeftArray.splice(n, 1)
      }
    }

    if (lettersLeftArray.length > 0) {
      return t('strings:NOT_CONTAINED_MESSAGE', { letter: lettersLeftArray[0] })
    }
    return false
  }

  const getWordOfDay = () => {
    // January 1, 2022 Game Epoch
    const epochMs = new Date(2022, 0).valueOf()
    const now = Date.now()
    const msInDay = 86400000
    const index = Math.floor((now - epochMs) / msInDay)
    const nextday = (index + 1) * msInDay + epochMs

    return {
      solution: localeAwareUpperCase(wordlist[index % wordlist.length]),
      solutionIndex: index,
      tomorrow: nextday,
    }
  }
  const { solution, solutionIndex, tomorrow } = getWordOfDay()
  return {
    solution,
    solutionIndex,
    tomorrow,
    findFirstUnusedReveal,
    isWinningWord,
    isWordInWordList,
  }
}
