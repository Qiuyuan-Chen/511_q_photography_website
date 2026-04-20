# Qiuyuan Chen — Personal Photography Portfolio

A minimal, map-based personal photography portfolio built with Next.js. Instead of a standard grid, photos are organized by location — visitors can explore an interactive world map, click on pins to preview photos from that place, and browse full city galleries with stories behind each shot.

Live locations include Colorado (Denver, Estes Park, Colorado Springs), New York City, Xinjiang (Yi Li, Sai Li Mu), and Yunnan (Xi Shuang Ban Na, Pu Er).

---

Features & Interactions
Map exploration — The home page features an interactive world map with custom pins marking every location. Clicking a pin opens a popup card showing the city and region name, a horizontally scrollable photo strip of the first few shots from that place, and a "View Gallery" button to go deeper.
Gallery by region and city — The gallery page organizes photos by region (Xinjiang, Colorado, Yunnan, New York), with each region broken into cities. Each city shows a preview row of three photos and a "stories" link to the full city gallery.
City gallery with stories — Inside each city gallery, photos are displayed in a full alternating layout — image on one side, title, date, tags, and a written story on the other. Odd and even entries flip sides to create a editorial rhythm. Portrait and landscape photos each display at their natural proportions without cropping.
Photo hover effects — On the home page photo grid, hovering over any image zooms it in slightly within its frame and reveals the city and country name overlaid at the bottom, with a subtle dark overlay.
Transparent navigation — On the home page, the navbar sits transparently over the full-screen hero image. On all other pages it switches to a clean white background.
About page — A simple personal introduction with a full list of visited regions and photo counts, giving visitors a sense of the scope of the archive.
Responsive layout — The site adapts to different screen sizes across desktop and mobile.

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Leaflet.js / react-leaflet** — interactive world map
- **Local JSON files** — all photo metadata stored in `data/photos.json` and `data/locations.json`, no database needed

---

## Prerequisites

- Node.js v18 or higher
- npm

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/my-photo-portfolio.git
cd my-photo-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:3000
```

No API keys or environment variables are required. The project runs entirely with local data.

---

## Project Structure

```
/app
  /page.tsx                  ← Home page + world map + photo grid
  /gallery/page.tsx          ← All regions and cities
  /gallery/[city]/page.tsx   ← Individual city photo gallery
  /about/page.tsx            ← About page
/components
  /Navbar.tsx
  /Footer.tsx
  /MapSection.tsx            ← Leaflet map wrapper
  /CityPopup.tsx             ← Map pin popup card
  /PhotoPlaceholder.tsx      ← Fallback placeholder component
/data
  /photos.json               ← All photo metadata (title, city, date, tags, story, image path)
  /locations.json            ← Region and city coordinates for map pins
/public
  /images
    /photos/                 ← All photo files (.jpg / .jpeg)
    /logo.png                ← Site logo
```

---

## How to Add New Photos

Adding new photos takes three steps:

**Step 1** — Drop your photo file into:
```
public/images/photos/
```
Use a clear filename like `yili-017.jpg` or `estes-009.JPG`.

**Step 2** — Open `data/photos.json` and add a new entry:
```json
{
  "id": "yili-017",
  "title": "Your Photo Title",
  "city": "yili",
  "region": "xinjiang",
  "country": "China",
  "date": "2024-07-20",
  "tags": ["landscape", "mountain"],
  "story": "A short description of this moment.",
  "image": "/images/photos/yili-017.jpg",
  "featured": false
}
```

**Step 3** — Save the file. The site hot-reloads automatically in development.

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero image + interactive world map + selected photo grid |
| `/gallery` | All regions (Xinjiang, Colorado, Yunnan, New York) with city previews |
| `/gallery/[city]` | Full photo list for a city with alternating image/text layout |
| `/about` | Bio and locations visited |

---

## Build for Production

```bash
npm run build
npm start
```
