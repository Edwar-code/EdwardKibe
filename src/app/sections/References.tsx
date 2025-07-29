import Client1 from '@/src/assets/memojis/Client-1-memoji.png'
import Client3 from '@/src/assets/memojis/Client-3-memoji.png'
import Client4 from '@/src/assets/memojis/Client-4-memoji.png'
import Client5 from '@/src/assets/memojis/Client-5-memoji.png'
import SectionHeader from '@/src/components/SectionHeader'
import Image from 'next/image'
import Card from '@/src/components/Card'
import { Fragment } from 'react'
import { useTranslations } from 'next-intl'

// my customer references/recommendations

export default function References() {
  const t = useTranslations('The')
const reference = [
  {
    name: 'Mr Brian.',
    position: ('Driving Instructor, Digital Driving School'),
    text: ('I can now reach out to more clients efficiently through the digital driving session booking site that Krinzie Dev is working on aiming at making scheduling of sessions smooth and stress-free for both instructors and learners. I’m thankful for the great partnership.'),
    avatar: Client3,
  },
  {
    name: 'John Omollo',
    position: ('Avenue Fashion , Finance and Sales Director'),
    text: ('The developer built us a digital e-commerce shop that streamlined our sales and expanded our reach. Thank you for the opportunity to partner with you — it’s been a pleasure.'),
    avatar: Client4,
  },
  {
    name: 'B.Kimani',
    position: ('USG, KeMUN'),
    text: ('Working with Mr Munene transformed how we handle diplomacy — the new digital systems brought clarity, speed, and structure. We’re incredibly grateful for the impact.'),
    avatar: Client1,
  }

    
 
  ]

  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow={('Testimonials')}
          title={('References')}
          description={('')}
        />
        <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
          {/* use keyframe from tailwind config to animate, pause animation on hover */}
          <div className="flex flex-none gap-8 pr-8 animate-left-movement [animation-duration:90s] hover:[animation-play-state:paused]">
            {/* duplicate references for animation like in Banner creating 2 sets of references in the map instead of 1 */}
            {[...new Array(2)].fill(0).map((_, idx) => (
              <Fragment key={idx}>
                {reference.map((reference) => (
                  <Card
                    key={reference.name}
                    className="max-w-xs md:max-w-md p-6 md:p-8 hover:-rotate-3 transition duration-300"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="size-14 dark:bg-gray-600 bg-brown5/60 inline-flex rounded-full items-center justify-center flex-shrink-0">
                        <Image
                          src={reference.avatar}
                          alt={reference.name}
                          className="max-h-full"
                        />
                      </div>
                      <div>
                        <div className="font-semibold dark:text-white text-black">
                          {reference.name}
                        </div>
                        <div className="text-sm dark:text-white/40 text-black/60">
                          {reference.position}
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 md:mt-6 text-sm md:text-base dark:text-white text-black">
                      {reference.text}
                    </p>
                  </Card>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
