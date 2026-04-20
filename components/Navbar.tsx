"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About me" },
]

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const isHome = pathname === "/"

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHome ? "bg-transparent" : "bg-white border-b border-gray-200"
    }`}>
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display italic text-2xl leading-none"
          aria-label="Home"
        >
          <Image src="/images/logo.png" alt="logo" width={40} height={40} style={{objectFit: 'contain'}} />
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-sm tracking-wide transition-opacity ${
                isHome
                  ? "text-white hover:opacity-70"
                  : "text-black hover:opacity-50"
              }${isActive(link.href) ? " underline underline-offset-4" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
