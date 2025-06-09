import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

function HeroSolarSystem({
  children,
  size,
  rotation,
  shouldOrbit = false,
  orbitDuration,
  shouldSpin = false,
  spinDuration,
}: PropsWithChildren<{
  size: number
  rotation: number
  shouldOrbit?: boolean
  orbitDuration?: string
  shouldSpin?: boolean
  spinDuration?: string
}>) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
      {/* setting up props for individual star containers */}
      {/* if container "orbit" is true then spin with a duration of orbitDuration */}
      <div
        className={twMerge(shouldOrbit === true && 'animate-spin')}
        style={{
          animationDuration: orbitDuration,
        }}
      >
        <div
          className="flex items-start justify-start "
          style={{
            transform: `rotate(${rotation}deg)`,
            height: `${size}px`,
            width: `${size}px`,
          }}
        >
          {/* set up spin for inner container, self-spin - added props for that */}
          <div
            className={twMerge(
              shouldSpin === true && 'animate-spin [animation-duration:10s]'
            )}
            style={{
              animationDuration: spinDuration,
            }}
          >
            <div
              className=" inline-flex"
              style={{
                transform: `rotate(${rotation * -1}deg)`,
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSolarSystem
