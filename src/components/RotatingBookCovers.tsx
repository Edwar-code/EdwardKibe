import Image from 'next/image'
import Card from './Card'
import CardHeader from './CardHeader'
import AlanBookCover from '@/src/assets/books/Book7-AlanWatts.jpeg'
import CosmosBookCover from '@/src/assets/books/Book6-Cosmos.jpg'
import NatGeoBookCover from '@/src/assets/books/Book2-natgeo.jpg'
import PoohBookCover from '@/src/assets/books/Book4-Pooh.jpg'
import RiedelBookCover from '@/src/assets/books/Book3-AnorganischeChemie.jpg'
import HarryPotterBookCover from '@/src/assets/books/Book5-HarryPotter.jpg'
import PragmaticProgrammerBookCover from '@/src/assets/books/Book1-PragmaticProgrammer.jpg'
import LifeOfPiBookCover from '@/src/assets/books/Book8-LifeOfPi.jpg'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslations } from 'next-intl'
import 'swiper/css'

// this was good ol friend, he said its more lightweight and ssr friendly than using "swiper" but im trying swiper since it works so far.

const bookCovers = [
  AlanBookCover,
  NatGeoBookCover,
  PragmaticProgrammerBookCover,
  CosmosBookCover,
  HarryPotterBookCover,
  RiedelBookCover,
  LifeOfPiBookCover,
  PoohBookCover,
]

const RotatingBookCovers = () => {
  const t = useTranslations('About')
  return (
    <Card className="h-[320px] md:col-span-2 lg:col-span-1">
      <CardHeader
        title={t('books.booksHeader.title')}
        description={t('books.booksHeader.description')}
        className2="md:whitespace-nowrap"
      />
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 8000 }}
        loop
        className="relative w-40 h-60 mx-auto mt-2 md:mt-0"
      >
        {bookCovers.map((cover, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image src={cover} alt={`Book cover ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  )
}

export default RotatingBookCovers
