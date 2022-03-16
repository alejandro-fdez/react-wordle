import { getStatuses } from '@lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { getWordOfDay, localeAwareUpperCase } from '@lib/words'

import { useTranslation } from 'next-i18next'
import { STRINGS_NS } from '@core/i18n/namespaces'
import { useWordlist } from '@/hooks/useWordList'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  isRevealing?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  isRevealing,
}: Props) => {
  const { t, i18n } = useTranslation(STRINGS_NS)
  const { WORDS } = useWordlist()
  const { solution } = getWordOfDay(WORDS)
  const charStatuses = getStatuses(guesses, solution)

  const getKeysLine1 = () => {
    return ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  }
  const getKeysLine2 = () => {
    const keysLine2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    i18n.language === 'es' && keysLine2.push('Ñ')
    return keysLine2
  }
  const getKeysLine3 = () => {
    return ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  }

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = localeAwareUpperCase(e.key)
        // TODO: check this test if the range works with non-english letters
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        {getKeysLine1().map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {getKeysLine2().map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {t('ENTER_TEXT')}
        </Key>
        {getKeysLine3().map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            className="h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
            ></path>
          </svg>
        </Key>
      </div>
    </div>
  )
}
