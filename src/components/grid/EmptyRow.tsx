import { useGetSettings } from '@/hooks/useGetSettings'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const { MAX_WORD_LENGTH } = useGetSettings()
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
