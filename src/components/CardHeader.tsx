import { twMerge } from 'tailwind-merge'
import HeroLargeThemeSvg from '@/src/components/HeroLargeThemeSvg'

export default function CardHeader({
  title,
  description,
  className,
  className2,
}: {
  title: string
  description: string
  className?: string
  className2?: string
}) {
  return (
    <div className={twMerge('flex flex-col p-6 md:py-8 md:px-10', className)}>
      <div className={twMerge('inline-flex items-center gap-2', className2)}>
        <HeroLargeThemeSvg
          darkClassName="size-9 text-emerald-300"
          lightClassName="size-9 text-amber-500"
        />
        <h3 className="font-serif text-3xl dark:text-white text-black">
          {title}
        </h3>
      </div>
      <p className="text-sm dark:text-white/60 text-black/60 mt-2 lg:text-base lg:max-w-xs">
        {description}
      </p>
    </div>
  )
}
