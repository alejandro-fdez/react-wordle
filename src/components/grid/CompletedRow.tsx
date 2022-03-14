import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import { getWordOfDay, unicodeSplit } from '../../lib/words'
import { useWordlist } from '@/hooks/useWordList'

type Props = {
  guess: string
  isRevealing?: boolean
}

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const { WORDS } = useWordlist()
  const { solution } = getWordOfDay(WORDS)
  const statuses = getGuessStatuses(guess, solution)
  const splitGuess = unicodeSplit(guess)

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  )
}
