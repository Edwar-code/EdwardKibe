'use client'
import Card from '@/src/components/Card'
import SectionHeader from '@/src/components/SectionHeader'
import Image from 'next/image'
import GithubIcon from '@/src/assets/icons/github.svg'
import TypeScriptIcon from '@/src/assets/icons/typescript.svg'
import HtmlIcon from '@/src/assets/icons/html5.svg'
import JavaScriptIcon from '@/src/assets/icons/javascript.svg'
import ReactIcon from '@/src/assets/icons/react.svg'
import NodeIcon from '@/src/assets/icons/node.svg'
import DatabaseIcon from '@/src/assets/icons/sql.svg'
import Css3Icon from '@/src/assets/icons/css3.svg'
import BrowserIcon from '@/src/assets/icons/browser.svg'
import TailwindIcon from '@/src/assets/icons/tailwind.svg'
import ShopifyIcon from '@/src/assets/icons/shopify.svg'
import FirebaseIcon from '@/src/assets/icons/firebase.svg'
import CopilotIcon from '@/src/assets/icons/copilot.svg'
import GptIcon from '@/src/assets/icons/gpt.svg'
import avatarIcon from '@/src/assets/memojis/MoSmileMemoji.png'
import CardHeader from '@/src/components/CardHeader'
import Toolbox from '@/src/components/Toolbox'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import RotatingBookCovers from '@/src/components/RotatingBookCovers'
import MapThemeToggle from '@/src/components/MapThemeToggle'
import { useTranslations } from 'next-intl'

type interfaceToolboxItem = { title: string; iconType: React.ElementType } // This ensures `iconType` is "typed" correctly
// "Stack" or toolbox - all could be pulled from a database if larger projectand not hard coded
const toolboxItems: interfaceToolboxItem[] = [
  {
    title: 'JavaScript',
    iconType: JavaScriptIcon,
  },
  {
    title: 'HTML5',
    iconType: HtmlIcon,
  },
  {
    title: 'CSS3',
    iconType: Css3Icon,
  },
  {
    title: 'React',
    iconType: ReactIcon,
  },
  {
    title: 'TypeScript',
    iconType: TypeScriptIcon,
  },
  {
    title: 'Node.js',
    iconType: NodeIcon,
  },
  {
    title: 'SQL',
    iconType: DatabaseIcon,
  },

  {
    title: 'DevTools',
    iconType: BrowserIcon,
  },
  {
    title: 'Tailwind',
    iconType: TailwindIcon,
  },
  {
    title: 'Shopify',
    iconType: ShopifyIcon,
  },

]
// hobbies - all could be in database if larger project

export default function About() {
  const constrainRef = useRef(null)
  const t = useTranslations('About')
  const hobbies = [

    
    {
      title: t('hobbies.gaming'),
      emoji: '🎮',
      left: '6%',
      top: '67%',
    },
    {
      title: t('hobbies.reading'),
      emoji: '📚',
      left: '59%',
      top: '78%',
    },
   
    {
      title: t('hobbies.cooking'),
      emoji: '🌮',
      left: '12%',
      top: '25%',
    },
    {
      title: t('hobbies.hiking'),
      emoji: '🏔️',
      left: '48%',
      top: '7%',
    },
    {
      title: t('hobbies.traveling'),
      emoji: '✈️',
      left: '58%',
      top: '16%',
    },
  ]
  return (
    <section id="about" className="pt-20 lg:py-28 ">
      <div className="container">
        <SectionHeader
          eyebrow={t('')}
          title={t('')}
          description={t('sectionHeader.description')}
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            {/*Section WHAT I READ */}
            <RotatingBookCovers />
            {/* Section TOOLBOX*/}
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title={t('toolboxCard.title')}
                description={t('toolboxCard.description')}
              />
              <Toolbox
                items={toolboxItems}
                itemsWrapperClassName="animate-left-movement [animation-duration:25s] hover:[animation-play-state:paused]"
              />
              <Toolbox
                items={toolboxItems}
                className="mt-6"
                itemsWrapperClassName="animate-right-movement [animation-duration:25s] hover:[animation-play-state:paused]"
              />
            </Card>
          </div>
          {/* Section HOBBIES*/}

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title={t('hobbies.hobbiesCard.title')}
                description={t('hobbies.hobbiesCard.description')}
                className="px-6 py-6"
              />
              {/* giving a ref to the parent div and telling framer-motion "drag" that that ref is the constraint */}
              <div className="relative flex-1" ref={constrainRef}>
                {hobbies.map((hobby) => (
                  // adding framer motion for movement of the items inside the parent div, changing next component to client component
                  <motion.div
                    key={hobby.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-amber-300 dark:from-emerald-300 to-orange-400 dark:to-sky-400  rounded-full py-1.5 absolute"
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={constrainRef}
                  >
                    <span className="font-medium text-gray-950">
                      {hobby.title}
                    </span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            {/* Section MAP */}

            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
              {/* toggle between light and dark mode maps */}
              <MapThemeToggle />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-24 rounded-full  after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full dark:after:outline-gray-950/30 after:outline-brown4/50">
                {/* animate ping of div "under" image */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r dark:from-emerald-300 dark:to-sky-400 from-amber-300 to-orange-500 -z-20 animate-ping [animation-duration:2.5s]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r dark:from-emerald-300 dark:to-sky-400 from-amber-300 to-orange-500 -z-10"></div>
                <Image
                  src={avatarIcon}
                  alt="Smiling Web Developer"
                  className="size-30 rounded-full"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
