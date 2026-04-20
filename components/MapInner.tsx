"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import CityPopup, { type SelectedCity } from "./CityPopup"
import type { Location } from "@/lib/types"

interface Props {
  locations: Location[]
}

function createDotIcon() {
  return L.divIcon({
    className: "",
    html: `<svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" fill="black"/></svg>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  })
}

export default function MapInner({ locations }: Props) {
  const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null)
  const [dotIcon, setDotIcon] = useState<L.DivIcon | null>(null)

  useEffect(() => {
    setDotIcon(createDotIcon())
  }, [])

  return (
    <div className="relative w-full" style={{ height: "70vh" }}>
      <MapContainer
        center={[30, 20]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        attributionControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
        />
        {dotIcon &&
          locations.flatMap((location) =>
            location.cities.map((city) => (
              <Marker
                key={city.slug}
                position={city.coordinates}
                icon={dotIcon}
                eventHandlers={{
                  click: () =>
                    setSelectedCity({
                      name: city.name,
                      slug: city.slug,
                      regionName: location.region,
                      country: location.country,
                      photoCount: city.photoCount,
                    }),
                }}
              />
            ))
          )}
      </MapContainer>

      {/* Backdrop overlay — click outside card to close */}
      {selectedCity && (
        <div
          className="absolute inset-0"
          style={{ zIndex: 998 }}
          onClick={() => setSelectedCity(null)}
        />
      )}

      {/* City popup card */}
      {selectedCity && (
        <div
          className="absolute"
          style={{
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <CityPopup city={selectedCity} onClose={() => setSelectedCity(null)} />
        </div>
      )}
    </div>
  )
}
