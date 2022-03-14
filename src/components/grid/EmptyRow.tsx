import { useSettings } from '@/hooks/useSettings'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const { MAX_WORD_LENGTH } = useSettings()
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
