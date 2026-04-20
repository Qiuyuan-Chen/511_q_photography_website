import Link from "next/link"
import Image from "next/image"
import PhotoPlaceholder from "@/components/PhotoPlaceholder"
import locations from "@/data/locations.json"
import photosData from "@/data/photos.json"

export default function GalleryPage() {
  return (
    <main className="pt-16">
      <div className="max-w-5xl mx-auto px-8 py-16">
        {locations.map((location, regionIdx) => (
          <section
            key={location.slug}
            className={regionIdx === 0 ? "" : "mt-20"}
          >
            {/* Region heading */}
            <h2 className="font-display text-4xl font-bold tracking-[0.2em] text-center">
              {location.region}
            </h2>

            {/* Divider */}
            <div className="border-t border-gray-200 mt-4 mb-10" />

            {/* Cities */}
            {location.cities.map((city, cityIdx) => {
              const cityPhotos = photosData
                .filter((p) => p.city === city.slug)
                .slice(0, 3)

              return (
                <div key={city.slug} className={cityIdx === 0 ? "" : "mt-10"}>
                  {/* City label */}
                  <p className="font-sans text-sm font-normal text-gray-500 mb-3">
                    {city.name}
                  </p>

                  {/* Photo row — 3 equal columns */}
                  <div className="grid grid-cols-3 gap-3">
                    {[0, 1, 2].map((i) => {
                      const photo = cityPhotos[i]
                      return photo ? (
                        <div
                          key={i}
                          className="relative w-full overflow-hidden"
                          style={{ height: 200 }}
                        >
                          <Image
                            src={photo.image}
                            alt={photo.title}
                            fill
                            loading="eager"
                            className="object-cover"
                            sizes="(max-width: 1024px) 33vw, 320px"
                          />
                        </div>
                      ) : (
                        <PhotoPlaceholder key={i} className="w-full" height={200} />
                      )
                    })}
                  </div>

                  {/* Progress bar + stories link */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="w-48 h-px bg-gray-200">
                      <div className="w-[30%] h-px bg-black" />
                    </div>
                    <Link
                      href={`/gallery/${city.slug}`}
                      className="font-sans text-sm hover:underline underline-offset-4 transition-opacity hover:opacity-70"
                      style={{ color: "#8a8a8a" }}
                    >
                      stories
                    </Link>
                  </div>
                </div>
              )
            })}
          </section>
        ))}
      </div>

    </main>
  )
}
