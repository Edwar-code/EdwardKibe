export default function StackIcons({
  component,
  size = 'size-10',
}: {
  component: React.ElementType
  size?: string
}) {
  // in order to put a gradient on SVG we can't use normal gradient in css, we can FILL and SVG with an ID (stack-icon-gradient) which we define here
  // set the recieved component prop as a Component again to be used in the return
  const Component = component
  return (
    <>
      {/* fill the prop SVG component with the url gradient set below it */}
      <Component
        className={`${size} dark:fill-[url(#dark-stack-icon-gradient)] fill-[url(#stack-icon-gradient)]`}
      />
      <svg className="size-0 absolute">
        <linearGradient id="dark-stack-icon-gradient">
          <stop offset="0%" stopColor="rgb(110 231 183)" />
          <stop offset="100%" stopColor="rgb(56 189 248)" />
        </linearGradient>
        <linearGradient id="stack-icon-gradient">
          <stop offset="0%" stopColor="rgb(252, 211, 77)" />
          <stop offset="100%" stopColor="rgb(249, 115, 22)" />
        </linearGradient>
      </svg>
    </>
  )
}
