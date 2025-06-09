import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

// made this originally to make language toggle like this too, but it doesnt work because of too async probably? or architecture?

type ToggleSwitchProps = {
  isSelected?: boolean
  onToggle?: () => void
  activeBgClass?: string
  inactiveBgClass?: string
  activeIcon?: React.ReactNode
  inactiveIcon?: React.ReactNode
}

export default function ToggleSwitch({
  isSelected: controlledSelected,
  onToggle,
  activeBgClass,
  inactiveBgClass,
  activeIcon,
  inactiveIcon,
}: ToggleSwitchProps) {
  const [internalSelected, setInternalSelected] = useState(false)
  const isSelected = controlledSelected ?? internalSelected

  const handleClick = () => {
    if (onToggle) {
      onToggle()
    } else {
      setInternalSelected(!isSelected)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        'flex w-20 h-10 rounded-full items-center transition-all duration-300 ',
        isSelected ? activeBgClass : inactiveBgClass
      )}
    >
      <span
        className={twMerge(
          'h-11 w-11 bg-white ring-2 ring-brown5  dark:ring-black/40 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center',
          isSelected && 'ml-10'
        )}
      >
        {isSelected ? activeIcon : inactiveIcon}
      </span>
    </div>
  )
}
