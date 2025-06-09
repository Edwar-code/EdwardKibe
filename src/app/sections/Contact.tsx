import Arrow from '@/src/assets/icons/arrow-diag.svg'
import whiteNoise from '@/src/assets/WhiteNoise.jpg'
import Card from '@/src/components/Card'
import ContactForm from '@/src/components/ContactForm'
import { useTranslations } from 'next-intl'

export default function Contact() {
  const t = useTranslations('Contact')
  return (
    <section id="contact" className="py-16 pt-32 lg:py-24 lg:pt-20">
      <div className="container">
        <Card>
          <div className="bg-gradient-to-r from-amber-300 dark:from-emerald-300 to-orange-500 dark:to-sky-400 text-gray-900 py-8 px-10 rounded-t-3xl text-center md:text-left relative overflow-hidden z-0">
            <div
              className="absolute inset-0 opacity-5 -z-10"
              style={{
                backgroundImage: `url(${whiteNoise.src})`,
              }}
            ></div>
            <div className="flex">
              {/* upper flex div for  */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-16 items-center ">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl">
                    {t('title')}
                  </h2>
                  <p className="text-sm md:text-base mt-2">
                    {t('description')}
                  </p>
                </div>
                <div>
                  <a href="mailto:moses.levin14@gmail.com">
                    <button
                      className=" text-white bg-black inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900 
                  button-animation ring-2 ring-gray-800 hover:ring-gray-800 hover:ring-4"
                      aria-label="email me"
                    >
                      <span className="font-semibold">{t('emailText')}</span>
                      <Arrow className="rotate-45 fill-white size-4" />
                    </button>
                  </a>
                </div>
              </div>
              {/* contact form */}
              <div className="flex"></div>
            </div>
          </div>
          <ContactForm />
        </Card>
      </div>
    </section>
  )
}
