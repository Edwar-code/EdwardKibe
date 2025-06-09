import { twMerge } from 'tailwind-merge'
import StackIcons from './StackIcons'
import { Fragment } from 'react'

export default function Toolbox({
  items,
  className,
  itemsWrapperClassName,
}: {
  items: {
    title: string
    iconType: React.ElementType
  }[]
  className?: string
  itemsWrapperClassName?: string
  // this ts tells us the prop is going to be this an item which is type object, which has a title and icontype,
  // and the [] after that says it's going to be an array of those objects
}) {
  return (
    <div
      className={twMerge(
        'flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className
      )}
    >
      <div
        className={twMerge(
          'flex flex-none py-0.5 gap-6 pr-6',
          itemsWrapperClassName
        )}
      >
        {/* mapping over the "stack" icons and making a new component to feed the icons into to be able to set color individually, 
since the icons are components with svgr/webpack we need to "feed a component" which we handle in the component itself */}
        {/* animate with duplicating the map data in a fragment */}
        {[...new Array(2)].fill(0).map((_, idx) => (
          <Fragment key={idx}>
            {items.map((item) => (
              <div
                key={item.title}
                className="inline-flex items-center gap-4 py-2 px-3 outline outline-2 dark:outline-white/10 outline-black/10 rounded-lg"
              >
                <StackIcons component={item.iconType} />
                <span className="font-semibold dark:text-white text-black/90">
                  {item.title}
                </span>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
