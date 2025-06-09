'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import berlinMap2 from '@/src/assets/berlinMap2.jpg'
import berlinMap from '@/src/assets/berlinMap.jpg'
import Image from 'next/image'

export default function MapThemeToggle() {
  //
  // sets mounted to true once useEffect ran. (setTheme reserved keyword next-themes)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  //useEffect only runs when the component IS mounted. When mounted on client, set to true
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return resolvedTheme === 'light' ? (
    <Image
      src={berlinMap}
      alt="Map of Berlin"
      className="h-full w-full object-cover transform scale-[1.4] -translate-y-2 translate-x-4 "
    />
  ) : (
    <Image
      src={berlinMap2}
      alt="Map of Berlin"
      className="h-full w-full object-cover object-left-top transform -translate-y-10  scale-125  md:-translate-y-10 md:-translate-x-8 "
    />
  )
}
