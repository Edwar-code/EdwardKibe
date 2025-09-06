import projectImageWatch from '@/src/assets/watch.png';
import project1Placeholder from '@/src/assets/BuildingProjectsImg.png'
import projectImagePortfolio from '@/src/assets/Moses Portfolio website.png'
import projectImageNeueTraditionen from '@/src/assets/Neue Traditionen website.png'
import projectImageTarbutGan from '@/src/assets/TarbutGan.png'
// Assuming 'p.png' is also in src/assets/ and you've imported it like this:
import projectImagep from '@/src/assets/p.png' // <--- New import for p.png
import Image from 'next/image'
import CheckmarkIcon from '@/src/assets/icons/checkmark.svg'
import ArrowDiagonal from '@/src/assets/icons/arrow-diag.svg'
import SectionHeader from '@/src/components/SectionHeader'
import Card from '@/src/components/Card'
import GithubIcon from '@/src/assets/icons/github.svg'
import { useTranslations } from 'next-intl'

function Projects() {
  const t = useTranslations('Project')

  const portfolioProject = [
    {
      year: '2025',
      title: 'Avenue Fashion',
      type: t(' Complete'),
      result: [
        { title: t('Shop at AvenueFashion by Krinzie Dev') },
      ],
      link: 'https://AvenueFashion.co.ke/',
      githublink: 'https://github.com/Edwar-code',
      image: projectImageNeueTraditionen,
      ariaLabel: 'Avenue Fashion by Krinzie Dev',
    },
    {
      year: '2025',
      title: 'CeejayFX',
      type: t(' Complete'),
      result: [
        { title: t('CeejayFX - Forex Trading') },
      ],
      link: 'https://ceejay-seven.vercel.app/',
      githublink: 'https://github.com/Edwar-code',
      image: projectImagep, // <--- Now using the imported 'p.png'
      ariaLabel: 'CeejayFX - Forex Trading Platform', // <--- Added missing comma here!
    },
    {
      year: '2025',
      title: 'Learners Ride',
      type: t('In Progress'),
      result: [
        { title: t('Learners Ride Technologies by Krinzie Dev') },
      ],
      link: 'https://learners-ride.vercel.app/',
      githublink: 'https://github.com/Edwar-code',
      image: projectImagePortfolio,
      ariaLabel: 'Learners Ride (Under Construction) by Krinzie Dev',
    },
    {
      year: '2025',
      title: 'KeMUN Connect',
      type: t('Complete'),
      result: [
        { title: t('KeMUN Connect by Krinzie Dev ') },
      ],
      link: 'https://kemun.co.ke',
      githublink: 'https://github.com/Edwar-code',
      image: projectImageTarbutGan,
      ariaLabel: ' Diplomacy meets at KeMUN Connect ',
    },
    {
      year: '2025',
      title: 'Watch',
      type: t('In Progress'),
      result: [
        { title: t(' Lets Watch') },
      ],
      link: 'https://watch-1ikt.vercel.app/',
      githublink: 'https://github.com/your-repo-link',
      image: projectImageWatch,
      ariaLabel: 'Watch - Lets Watch',
    },
  ]

  return (
    <section id="" className="pb--16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow={t('Latest')}
          title={t('FEATURED PROJECTS')}
          description={t('Breathing Ideas')}
        />

        {/* CARDS FOR PROJECTS */}
        <div className="flex flex-col mt-10 md:mt-20 gap-20 ">
          {portfolioProject.map((project, projectIndex) => (
            <Card
              key={project.title}
              className=" px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky top-16 "
              style={{
                top: `calc(64px + ${projectIndex * 50}px)`,
              }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  {/* Conditional classes for project type color */}
                  <div
                    className={`inline-flex gap-2 font-bold uppercase tracking-widest text-sm ${
                      project.type === t('Project Complete')
                        ? 'text-green-500 dark:text-green-400' // Green for completed projects
                        : project.type === t('In Progress')
                        ? 'text-orange-500 dark:text-orange-400' // Orange for in progress projects
                        : 'text-gray-500 dark:text-gray-400' // Default if neither
                    }`}
                  >
                    <span>{project.type}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-4xl mt-2 md:mt-5 dark:text-white text-black ">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 dark:border-white/5 border-black/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.result.map((result) => (
                      <li
                        key={result.title}
                        className="flex gap-2 text-sm md:text-base dark:text-white/50 text-black/60"
                      >
                        <CheckmarkIcon className="size-4 md:size-6 dark:text-white/50 text-black/60" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex">
                    <a href={project.link} target="_blank">
                      <button
                        className="dark:bg-white/90 bg-black/85 dark:text-gray-950 text-white/90 h-12 w-full md:w-auto rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 px-6 dark:hover:bg-white/95 hover:bg-black/90 dark:hover:text-black hover:text-white transition duration-[125ms] hover:ring-1 dark:hover:ring-white/50 hover:ring-black/50 button-animation hover:scale-100"
                        aria-label="Visit Live Website in new tab"
                      >
                        <span>{t('buttonVisit')}</span>
                        <ArrowDiagonal className="rotate-45 size-4 dark:fill-black fill-white" />
                      </button>
                    </a>
                    <a
                      href={project.githublink}
                      target="_blank"
                      aria-label={project.ariaLabel}
                    >
                      <button
                        className=" dark:text-gray-950 text-white/90 h-12 w-full md:w-auto mt-8 px-6  dark:hover:text-black hover:text-white"
                        aria-label="Visit GitHub Repository In new tab"
                      >
                        <GithubIcon className="size-12 fill-gray-950 dark:fill-white/90 transition duration-[125ms] hover:scale-105 " />
                      </button>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects