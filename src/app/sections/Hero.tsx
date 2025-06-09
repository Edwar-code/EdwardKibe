import heroImage from '@/src/assets/memojis/MoComputerMemoji.png'
import Image from 'next/image'
import whiteNoise from '@/src/assets/WhiteNoise.jpg'
import HeroSolarSystem from '@/src/components/HeroSolarSystem'
import HeroButtons from '@/src/components/HeroButtons'
// created a few components for svg theme toggle so that not all of hero is client
import HeroLargeThemeSvg from '@/src/components/HeroLargeThemeSvg'
import HeroSmallThemeSvg from '@/src/components/HeroSmallThemeSvg'

// internationalization
import { useTranslations } from 'next-intl'

function Hero() {
  const t = useTranslations('Homepage')
  return (
    <section className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip ">
      <div
        id="home"
        className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]"
      >
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${whiteNoise.src})`,
          }}
        ></div>
        {/* circles are borders with radius full different sizes */}
        <div className="size-[620px] hero-circles"></div>
        <div className="size-[820px] hero-circles"></div>
        <div className="size-[1020px] hero-circles"></div>
        <div className="size-[1220px] hero-circles"></div>
        {/* high opacity svgs. Component to set positioning and effects of svgs */}
        <HeroSolarSystem
          size={440}
          rotation={76}
          shouldOrbit
          orbitDuration="14s"
          shouldSpin
          spinDuration="3s"
        >
          <HeroSmallThemeSvg
            darkClassName="size-8 text-emerald-300/20"
            lightClassName="size-8 text-amber-500/30"
          />
        </HeroSolarSystem>
        <HeroSolarSystem
          size={430}
          rotation={-13}
          shouldOrbit
          orbitDuration="27s"
          shouldSpin
          spinDuration="3s"
        >
          <HeroSmallThemeSvg
            darkClassName="size-8 text-emerald-300/20"
            lightClassName="size-8 text-amber-500/30"
          />
        </HeroSolarSystem>
        <HeroSolarSystem
          size={520}
          rotation={-42}
          shouldOrbit
          orbitDuration="30s"
        >
          <div className="size-2 rounded-full dark:bg-emerald-300/20 bg-amber-500/30" />
        </HeroSolarSystem>
        <HeroSolarSystem
          size={530}
          rotation={175}
          shouldOrbit
          orbitDuration="33s"
          shouldSpin
          spinDuration="3s"
        >
          <HeroSmallThemeSvg
            darkClassName="size-10 text-emerald-300/20"
            lightClassName="size-10 text-amber-500/30"
          />
        </HeroSolarSystem>
        <HeroSolarSystem
          size={550}
          rotation={21}
          shouldOrbit
          orbitDuration="36s"
          shouldSpin
          spinDuration="7s"
        >
          <HeroLargeThemeSvg
            darkClassName="size-12 text-emerald-300"
            lightClassName="size-12 text-amber-500"
          />
        </HeroSolarSystem>
        <HeroSolarSystem
          size={590}
          rotation={97}
          shouldOrbit
          orbitDuration="39s"
          shouldSpin
          spinDuration="8s"
        >
          <HeroLargeThemeSvg
            darkClassName="size-8 text-emerald-300"
            lightClassName="size-8 text-amber-500"
          />
        </HeroSolarSystem>
        <HeroSolarSystem
          size={650}
          rotation={-7}
          shouldOrbit
          orbitDuration="42s"
          spinDuration=""
        >
          <div className="size-2 rounded-full dark:bg-emerald-300/20 bg-amber-500/30" />
        </HeroSolarSystem>
        <HeroSolarSystem
          size={710}
          rotation={143}
          shouldOrbit
          orbitDuration="45s"
          shouldSpin
          spinDuration="3s"
        >
          <HeroSmallThemeSvg
            darkClassName="size-14 text-emerald-300/20"
            lightClassName="size-14 text-amber-500/30"
          />
        </HeroSolarSystem>
        <HeroSolarSystem
          size={720}
          rotation={83}
          shouldOrbit
          orbitDuration="48s"
          spinDuration=""
        >
          <div className="size-3 rounded-full dark:bg-emerald-300/20 bg-amber-500/30" />
        </HeroSolarSystem>
        <HeroSolarSystem
          size={800}
          rotation={-72}
          shouldOrbit
          orbitDuration="51s"
          shouldSpin
          spinDuration="6s"
        >
          <HeroLargeThemeSvg
            darkClassName="size-28 text-emerald-300"
            lightClassName="size-28 text-amber-500"
          />
        </HeroSolarSystem>
        {/* low opacity svgs */}

        {/* full circles */}
      </div>
      <div className="container">
        <div className="flex flex-col items-center">
          <Image
            src={heroImage}
            className="size-[100px]"
            alt="Web Developer coding on PC"
          />

          <div className="inline-flex dark:bg-gray-950 bg-brown3  border dark:border-gray-800 border-brown5/50 px-4 py-1.5 items-center gap-4 rounded-lg">
            <div className="relative bg-green-500 size-2.5 rounded-full ">
              <div className="absolute bg-green-500  inset-0 rounded-full animate-ping-lg"></div>
            </div>

            <div className="text-sm font-medium dark:text-white text-black">
              {t('availability')}
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide dark:text-white text-black ">
            {t('title')}
          </h1>
          <p className="mt-4 text-center dark:text-white/60 text-black/60 md:text-lg ">
            {t('description')}
          </p>
        </div>
        <HeroButtons />
      </div>
    </section>
  )
}

export default Hero
