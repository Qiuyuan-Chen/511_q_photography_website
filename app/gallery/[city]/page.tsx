import Link from "next/link"
import Image from "next/image"
import photosData from "@/data/photos.json"
import locationsData from "@/data/locations.json"

interface Props {
  params: Promise<{ city: string }>
}

export function generateStaticParams() {
  return locationsData.flatMap((location) =>
    location.cities.map((city) => ({ city: city.slug }))
  )
}

export default async function CityGalleryPage({ params }: Props) {
  const { city: citySlug } = await params

  let cityName = citySlug
  let regionName = ""

  for (const location of locationsData) {
    const found = location.cities.find((c) => c.slug === citySlug)
    if (found) {
      cityName = found.name
      regionName = location.region
      break
    }
  }

  const photos = photosData.filter((p) => p.city === citySlug)

  return (
    <main className="pt-16">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Back link */}
        <Link
          href="/gallery"
          className="font-sans text-sm text-gray-400 hover:text-black transition-colors"
        >
          ← Back to Gallery
        </Link>

        {/* Breadcrumb */}
        <p className="font-sans text-xs text-gray-400 mt-4 tracking-widest uppercase">
          Gallery / {regionName} / {cityName}
        </p>

        {/* City heading */}
        <h1 className="font-display text-5xl font-light mt-2 mb-16">
          {cityName}
        </h1>

        {/* Photo entries */}
        {photos.length === 0 ? (
          <p className="font-sans text-sm text-gray-400">No photos found for this city.</p>
        ) : (
          <div>
            {photos.map((photo, index) => {
              const imageLeft = index % 2 === 0

              const imageBlock = (
                <div className="col-span-3">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    width={800}
                    height={600}
                    style={{ width: "100%", height: "auto" }}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={index === 0}
                  />
                </div>
              )

              const textBlock = (
                <div className="col-span-2 flex flex-col justify-center px-10">
                  <h2 className="font-display text-2xl font-medium mb-2 leading-snug">
                    {photo.title}
                  </h2>
                  <p className="font-sans text-xs text-gray-400 mb-3 tracking-wide">
                    {photo.date}
                  </p>
                  <p className="font-sans text-xs text-gray-400 mb-4 tracking-wide">
                    {photo.tags.join(" / ")}
                  </p>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {photo.story}
                  </p>
                </div>
              )

              return (
                <div key={photo.id}>
                  <div className="grid grid-cols-5 py-14">
                    {imageLeft ? (
                      <>
                        {imageBlock}
                        {textBlock}
                      </>
                    ) : (
                      <>
                        {textBlock}
                        {imageBlock}
                      </>
                    )}
                  </div>
                  {index < photos.length - 1 && (
                    <div className="border-t border-gray-100" />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
