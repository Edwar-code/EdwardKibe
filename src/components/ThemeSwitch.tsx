'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import ToggleSwitch from './ToggleSwitch'
import SunIcon from '@/src/assets/icons/sonneGros.svg'
import MoonIcon from '@/src/assets/icons/MoonIcon.svg'

const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Set initial state based on the current theme
    setIsDark(resolvedTheme === 'dark')
  }, [resolvedTheme])

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setTheme(newTheme)
    setIsDark(!isDark) // Update state after setting the theme
  }

  return (
    <ToggleSwitch
      isSelected={isDark}
      onToggle={toggleTheme}
 activeBgClass="bg-gray-800 ring-2 dark:ring-gray-600"
      inactiveBgClass="bg-amber-500 ring-2 ring-brown5 dark:ring-gray-600"
      activeIcon={<MoonIcon className="size-6 text-sky-700" />}
      inactiveIcon={<SunIcon className="size-6 text-amber-500" />}
    />
  )
}

export default ThemeSwitch
