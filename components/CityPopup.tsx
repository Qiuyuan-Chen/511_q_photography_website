"use client"

import Link from "next/link"
import Image from "next/image"
import PhotoPlaceholder from "./PhotoPlaceholder"
import photosData from "@/data/photos.json"

export interface SelectedCity {
  name: string
  slug: string
  regionName: string
  country: string
  photoCount: number
}

interface Props {
  city: SelectedCity
  onClose: () => void
}

export default function CityPopup({ city, onClose }: Props) {
  const photos = photosData.filter((p) => p.city === city.slug).slice(0, 3)

  return (
    <div className="bg-white border border-gray-200 w-80 p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display text-2xl font-medium leading-tight">{city.name}</h3>
          <p className="font-sans text-xs text-gray-400 mt-1 tracking-widest uppercase">
            {city.regionName} · {city.country}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-black transition-opacity ml-4 text-xl leading-none mt-0.5"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Horizontal photo strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {[0, 1, 2].map((i) => {
          const photo = photos[i]
          return photo ? (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden"
              style={{ width: 160, height: 112 }}
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
          ) : (
            <div key={i} className="flex-shrink-0">
              <PhotoPlaceholder width={160} height={112} />
            </div>
          )
        })}
      </div>

      {/* View Gallery button */}
      <Link
        href={`/gallery/${city.slug}`}
        className="inline-block border border-black font-sans text-xs tracking-widest px-4 py-2 hover:bg-black hover:text-white transition-colors uppercase"
      >
        View Gallery →
      </Link>
    </div>
  )
}
