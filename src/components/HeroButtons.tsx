'use client'
import ArrowDown from '@/src/assets/icons/arrow-diag.svg'
import Envelope from '@/src/assets/icons/envelope.svg'
import { Link } from 'react-scroll'
import { useTranslations } from 'next-intl'

export default function HeroButtons() {
  const t = useTranslations('Homepage')

  return (
    <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4 flex-wrap">
      {/* Explore Projects Button */}
      <Link
        to="projects"
        smooth={true}
        className="inline-flex items-center gap-2 border dark:border-white/15 border-black/20 px-6 h-12 rounded-xl cursor-pointer dark:hover:bg-white/5  hover:bg-brown3 transition"
      >
        <div className="font-semibold text-black dark:text-white">
          {t('buttonExplore')}
        </div>
        <ArrowDown className="rotate-180 size-4 dark:fill-white fill-black" />
      </Link>

      {/* Say Hi / Contact Button */}
      <Link
        to="contact"
        smooth={true}
        duration={900}
        className="inline-flex items-center gap-2 border dark:border-white border-black dark:bg-white bg-black dark:text-gray-900 text-white h-12 px-6 rounded-xl cursor-pointer
         dark:hover:text-black hover:text-white transition button-animation hover:ring-2 dark:hover:ring-white/50 hover:ring-black/70"
      >
        <Envelope className="size-5 dark:fill-black fill-white stroke" />
        <span className="font-semibold">{t('buttonContact')}</span>
      </Link>

      {/* View CV Button */}
      <a
        href="/CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-black dark:border-white/15 px-6 h-12 rounded-xl cursor-pointer hover:bg-brown3 dark:hover:bg-white/5 transition"
      >
        <span className="font-semibold text-black dark:text-white">
          {t('buttonViewCV')}
        </span>
      </a>
    </div>
  )
}
