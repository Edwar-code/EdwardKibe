'use client'
import { Link } from 'react-scroll'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import AccessibilityNav from '@/src/components/AccessibilityNav'

// works. i added offset option from react-scroll, need to style contact before continuing debugging contact and offset so it works on all screen sizes

function Navbar() {
  const [activeLink, setActiveLink] = useState('')
  const t = useTranslations('Navbar')

  const baseClass =
    'nav-item cursor-pointer px-4 py-1.5 rounded-full dark:text-white/70 text-dark/70 text-sm font-semibold dark:hover:bg-white/10 hover:bg-black/10 dark:hover:text-white hover:text-black text-black '
  const activeClass =
    'dark:bg-white bg-black/90 dark:text-gray-900 text-brown1 dark:hover:bg-white hover:bg-black/90 dark:hover:text-black hover:text-brown2 dark:hover:text-gray-900 hover:text-brown1'

  return (
    <div>
      <div className="flex justify-center items-center fixed top-1 md:top-3 w-full z-10">
        <nav className="flex gap-1 p-0.5 text-nowrap dark:border-white/15 border-black/15 rounded-full border-2 dark:bg-white/10 bg-brown3/10 backdrop-blur">
          {[
            { to: 'home', label: `${t('home')}`, duration: 500 },
            { to: 'projects', label: `${t('projects')}`, duration: 700 },
            { to: 'about', label: `${t('about')}`, duration: 800 },
            { to: 'contact', label: `${t('contact')}`, duration: 700 },
          ].map(({ to, label, duration }) => (
            <Link
              key={to}
              to={to}
              smooth={true}
              duration={duration}
              className={twMerge(baseClass, activeLink === to && activeClass)}
              onSetActive={() => setActiveLink(to)}
              spy={true}
              activeClass={activeClass}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      {/* <div className="fixed top-[70px] md:top-[70px] md:right-12 right-6 z-10"> */}
      <div className="fixed  left-7 bottom-7 md:left-10 md:bottom-10 z-10">
        <AccessibilityNav />
      </div>
    </div>
  )
}

export default Navbar
