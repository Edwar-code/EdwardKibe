import { useState, useRef, useEffect } from 'react'
import ThemeSwitch from './ThemeSwitch'
import LanguageToggle from './LanguageToggle'
import AccessibilityIcon from '@/src/assets/icons/accessibility.svg'

const AccessibilityNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="ring-2 dark:ring-white ring-black rounded-full button-animation"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility settings Menu"
      >
        <AccessibilityIcon
          className="size-10 md:size-12 lg:size-14 text-gray-900 dark:text-white rounded-full shadow-lg ring-1 ring-gray-600
        hover:scale-125 transition-all duration-200"
        />
      </button>
      {isOpen && (
        <div
          className="absolute top-0 right-0 translate-x-[100%] translate-y-[-100%] mt-2 ring-2 ring-orange-500 dark:ring-gray-400 rounded-2xl shadow-lg bg-gray-50 w-40 h-36 md:w-52 md:h-40"
          style={{ transformOrigin: 'bottom left' }}
        >
          <div className="flex flex-col items-center gap-6 mt-6 md:mt-8">
            <ThemeSwitch />
            <LanguageToggle />
          </div>
        </div>
      )}
    </div>
  )
}

export default AccessibilityNav
