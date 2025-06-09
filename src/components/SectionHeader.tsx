import React from 'react'

function SectionHeader({
  title,
  eyebrow,
  description,
}: {
  title: string
  eyebrow: string
  description: string
}) {
  return (
    <>
      <div className="flex justify-center">
        <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-amber-300 dark:from-emerald-300 to-orange-400 dark:to-sky-400 text-stroke-black text-transparent bg-clip-text text-center text-shadow dark:text-shadow-none">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-serif text-3xl text-center mt-6 md:text-5xl dark:text-white text-black">
        {title}
      </h2>
      <p className="text-center md:text-lg lg:text-xl dark:text-white/60 text-black/60 mt-4 max-w-md mx-auto">
        {description}
      </p>
    </>
  )
}

export default SectionHeader
