"use client"

import dynamic from "next/dynamic"
import type { Location } from "@/lib/types"

// Leaflet requires browser APIs — load only on the client
const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full bg-gray-100 flex items-center justify-center"
      style={{ height: "70vh" }}
    >
      <p className="font-sans text-xs text-gray-400 tracking-widest uppercase">
        Loading map…
      </p>
    </div>
  ),
})

interface Props {
  locations: Location[]
}

export default function MapSection({ locations }: Props) {
  return <MapInner locations={locations} />
}
