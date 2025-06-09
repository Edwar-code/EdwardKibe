'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import SternWeit from '@/src/assets/icons/SternWeit.svg'
import SonneWeit from '@/src/assets/icons/sunIcon.svg'

interface HeroSmallThemeSvgProps {
  lightClassName?: string
  darkClassName?: string
}

export default function HeroSmallThemeSvg({
  lightClassName,
  darkClassName,
}: HeroSmallThemeSvgProps) {
  //
  // sets mounted to true once useEffect ran. (setTheme reserved keyword next-themes)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  //useEffect only runs when the component IS mounted. When mounted on client, set to true
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return resolvedTheme === 'light' ? (
    <SonneWeit className={lightClassName} />
  ) : (
    <SternWeit className={darkClassName} />
  )
}
