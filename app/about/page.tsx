import PhotoPlaceholder from "@/components/PhotoPlaceholder"
import locationsData from "@/data/locations.json"
import photosData from "@/data/photos.json"
import Image from "next/image"

export default function AboutPage() {
  const regionStats = locationsData.map((location) => ({
    region: location.region,
    country: location.country,
    count: photosData.filter((p) => p.region === location.slug).length,
  }))

  return (
    <main className="pt-16">
      <div className="max-w-[600px] mx-auto px-8 py-16">
        {/* Profile photo placeholder */}
        <div className="flex justify-center mb-8">
          <Image src="/images/profile.JPG" alt="Qiuyuan Chen" width={1000} height={400} className="object-cover" />
        </div>

        {/* Name */}
        <h1 className="font-display text-4xl font-light text-center mb-2">
          Qiuyuan Chen
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-xs text-center text-gray-400 tracking-[0.3em] uppercase mb-10">
          Travel &amp; Landscape Photographer
        </p>

        {/* Bio */}
        <p className="font-sans text-sm text-gray-600 leading-relaxed mb-12">
          I travel with a camera to find the places where light and stillness converge.
          From the highland meadows of Xinjiang to the canyon streets of New York,
          I look for the quiet moment before and after — the pause that most people
          walk past. These photographs are my attempt to stay a little longer.
        </p>

        {/* Locations visited */}
        <h2 className="font-display text-2xl font-light mb-6">
          Locations Visited
        </h2>

        <div>
          {regionStats.map((stat, i) => (
            <div
              key={stat.region}
              className={`flex justify-between items-center py-3${
                i < regionStats.length - 1 ? " border-b border-gray-100" : ""
              }`}
            >
              <div>
                <span className="font-sans text-sm tracking-wide">{stat.region}</span>
                <span className="font-sans text-xs text-gray-400 ml-2">{stat.country}</span>
              </div>
              <span className="font-sans text-xs text-gray-400">
                {stat.count} photos
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
