import { Cell } from './Cell'
import { unicodeSplit } from '@lib/useWordsInfo'
import { useStatutes } from '@lib/useStatuses'

type Props = {
  guess: string
  isRevealing?: boolean
}

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const { getGuessStatuses } = useStatutes()
  const statuses = getGuessStatuses(guess)
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
