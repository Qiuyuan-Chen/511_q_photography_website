// TODO: Replace this component with <Image src={photo.image} alt={photo.title} fill /> from next/image when adding real photos

interface Props {
  className?: string
  title?: string
  width?: number | string
  height?: number | string
}

export default function PhotoPlaceholder({ className, title, width, height }: Props) {
  return (
    <div
      className={`bg-gray-200 flex flex-col items-center justify-center${className ? ` ${className}` : ""}`}
      style={{ width, height }}
    >
      {/* Mountain silhouette placeholder icon */}
      <svg
        viewBox="0 0 64 40"
        className="w-12 h-8 text-gray-400"
        fill="currentColor"
        aria-hidden="true"
      >
        <polygon points="0,40 18,10 28,22 38,6 64,40" />
      </svg>
      {title && (
        <p className="mt-2 text-xs text-gray-400 font-sans tracking-wide">{title}</p>
      )}
    </div>
  )
}
