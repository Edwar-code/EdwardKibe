'use client'

import { useRouter, usePathname } from '@/src/i18n/routing' // Use custom routing

const LanguageToggle = () => {
  const router = useRouter()
  const currentPathname = usePathname() // Retrieve the current path

  const toggleLanguage = (locale: string) => {
    // Replace the existing locale in the current pathname to avoid double locale prefix
    const newPathname = currentPathname.replace(/^\/(en|de)/, `/${locale}`)

    // Push the new locale-aware path without scrolling to the top
    router.push(
      { pathname: newPathname, query: {} },
      {
        locale,
        scroll: false,
      }
    )
  }

  return (
    <div className="flex gap-4 mb-2">
      <button
        className="font-serif underline underline-offset-4 decoration-black p-2 rounded-full text-gray-700 hover:text-gray-500 transition"
        onClick={() => toggleLanguage('en')}
        aria-label="English Language"
      >
        EN
      </button>
      <button
        className="font-serif underline underline-offset-4 decoration-black p-2 rounded-full text-gray-700 hover:text-gray-500 transition"
        onClick={() => toggleLanguage('de')}
        aria-label="German Language"
      >
        DE
      </button>
    </div>
  )
}

export default LanguageToggle

// 'use client'
// import React, { useEffect, useState } from 'react'
// import ToggleSwitch from './ToggleSwitch' // Adjust the import path as necessary
// import { useRouter, usePathname } from '@/src/i18n/routing'
// import EnglishIcon from '@/src/assets/icons/sonneGros.svg'
// import GermanIcon from '@/src/assets/icons/Stern.svg'

// const LanguageToggle = () => {
//   const router = useRouter()
//   const currentPathname = usePathname()
//   const [isEnglish, setIsEnglish] = useState(true)

//   useEffect(() => {
//     // Set initial state based on the current language in the URL
//     setIsEnglish(currentPathname.startsWith('/en'))
//   }, [currentPathname])

//   const toggleLanguage = async () => {
//     const newLocale = isEnglish ? 'de' : 'en'
//     const newPathname = currentPathname.replace(/^\/(en|de)/, `/${newLocale}`)
//     await router.push(
//       { pathname: newPathname, query: {} },
//       { locale: newLocale, scroll: false }
//     )
//     setIsEnglish(!isEnglish) // Update state after successful navigation
//   }

//   return (
//     <ToggleSwitch
//       isSelected={isEnglish}
//       onToggle={toggleLanguage}
//       activeBgClass="bg-blue-600"
//       inactiveBgClass="bg-orange-600"
//       activeIcon={<EnglishIcon className="w-4 h-4 text-black" />}
//       inactiveIcon={<GermanIcon className="w-4 h-4 text-black" />}
//     />
//   )
// }

// export default LanguageToggle
