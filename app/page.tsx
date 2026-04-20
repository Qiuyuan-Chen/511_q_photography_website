import Image from "next/image"
import Link from "next/link"
import MapSection from "@/components/MapSection"
import PhotoPlaceholder from "@/components/PhotoPlaceholder"
import locationsData from "@/data/locations.json"
import photosData from "@/data/photos.json"
import type { Location } from "@/lib/types"

const locations = locationsData as Location[]

// Build city name lookup from locations data
const cityNames = new Map(
  locationsData.flatMap((l) => l.cities.map((c) => [c.slug, c.name]))
)

// Curated photo selection — Xinjiang first, then Colorado, Yunnan, New York
// Each entry: photo id, column span (out of 3), and fixed row height in px
const gridConfig: { id: string; colSpan: 1 | 2; height: number }[] = [
  // Row 1: wide + narrow  (Xinjiang)
  { id: "yili-001",             colSpan: 2, height: 300 },
  { id: "yili-002",             colSpan: 1, height: 300 },
  // Row 2: three equal  (Xinjiang cont.)
  { id: "yili-015",             colSpan: 1, height: 250 },
  { id: "sailemu-001",          colSpan: 1, height: 250 },
  { id: "sailemu-002",          colSpan: 1, height: 250 },
  // Row 3: narrow + wide  (Colorado)
  { id: "colorado-springs-001", colSpan: 1, height: 320 },
  { id: "colorado-springs-002", colSpan: 2, height: 320 },
  // Row 4: wide + narrow  (Colorado cont.)
  { id: "estes-001",            colSpan: 2, height: 270 },
  { id: "estes-004",            colSpan: 1, height: 270 },
  // Row 5: three equal  (Colorado / Yunnan)
  { id: "denver-001",           colSpan: 1, height: 260 },
  { id: "xishuangbanna-001",    colSpan: 1, height: 260 },
  { id: "xishuangbanna-003",    colSpan: 1, height: 260 },
  // Row 6: three equal  (Yunnan / New York)
  { id: "puer-001",             colSpan: 1, height: 280 },
  { id: "puer-002",             colSpan: 1, height: 280 },
  { id: "new-york-city-001",    colSpan: 1, height: 280 },
]

const photoById = new Map(photosData.map((p) => [p.id, p]))
const gridPhotos = gridConfig.map((cfg) => ({ ...photoById.get(cfg.id)!, colSpan: cfg.colSpan, height: cfg.height }))

export default function HomePage() {
  return (
    <main>
      {/* ── Section A: Hero ─────────────────────────────────────────── */}
      <section className="relative h-screen">
        {/* Gray placeholder — replace with a real hero photo when ready */}
        <Image src="/images/hero.jpg" alt="hero" fill className="object-cover" />

        {/* Dark overlay for text legibility over the placeholder */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-display text-6xl font-light text-white tracking-[0.25em] text-center">
            Qiuyuan Chen
          </h1>
          <p className="font-sans text-xs text-white tracking-[0.4em] mt-6 uppercase opacity-80">
            Personal Photography
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-white opacity-60"
          >
            <path
              d="M10 4v12M4 10l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </section>

      {/* ── Section B: World Map ─────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col py-16">
        <div className="text-center mb-10">
          <h2 className="font-sans text-xs tracking-[0.4em] uppercase text-gray-400">
            Explore by Location
          </h2>
        </div>
        <div className="flex-1">
          <MapSection locations={locations} />
        </div>
      </section>

      {/* ── Section C: Photo Grid ────────────────────────────────────── */}
      <section className="px-8 py-20 max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="font-sans text-xs tracking-[0.4em] uppercase text-gray-400">
            Selected Work
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {gridPhotos.map((photo) => {
            const displayCity = cityNames.get(photo.city) ?? photo.city

            return (
              <Link
                key={photo.id}
                href={`/gallery/${photo.city}`}
                className="relative overflow-hidden group cursor-pointer"
                style={{ gridColumn: `span ${photo.colSpan}`, height: photo.height, display: "block" }}
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes={photo.colSpan === 2 ? "(max-width: 1280px) 66vw, 853px" : "(max-width: 1280px) 33vw, 427px"}
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
                {/* City + country label on hover */}
                <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white text-xs tracking-widest uppercase">
                    {displayCity} · {photo.country}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
