'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Stern from '@/src/assets/icons/Stern.svg'
import Sonne from '@/src/assets/icons/sonneGros.svg'

interface HeroLargeThemeSvgProps {
  lightClassName?: string
  darkClassName?: string
}

export default function HeroLargeThemeSvg({
  lightClassName,
  darkClassName,
}: HeroLargeThemeSvgProps) {
  //
  // sets mounted to true once useEffect ran. (setTheme reserved keyword next-themes)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  //useEffect only runs when the component IS mounted. When mounted on client, set to true
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return resolvedTheme === 'light' ? (
    <Sonne className={lightClassName} />
  ) : (
    <Stern className={darkClassName} />
  )
}
