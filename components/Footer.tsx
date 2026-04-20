import Link from "next/link"
import Image from "next/image"
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-20">
      <div className="max-w-5xl mx-auto px-8 py-8 flex items-center justify-between">
        <Image src="/images/logo.png" alt="logo" width={32} height={32} style={{objectFit: 'contain'}} />
        <span className="font-sans text-xs text-gray-400">
          Personal photography © Qiuyuan Chen 2025
        </span>
        <div className="flex gap-6">
          <Link
            href="/"
            className="font-sans text-xs text-gray-400 hover:text-black transition-colors"
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className="font-sans text-xs text-gray-400 hover:text-black transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="font-sans text-xs text-gray-400 hover:text-black transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}
