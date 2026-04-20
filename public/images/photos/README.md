# Photos Directory

Add your photos here as JPG files named to match the `image` field in `data/photos.json`.

Example:
- `denver-morning.jpg`
- `brooklyn-bridge.jpg`

Then update `data/photos.json` with the correct paths, e.g.:
```json
"image": "/images/photos/denver-morning.jpg"
```

Once real photos are in place, replace the `<PhotoPlaceholder />` components in `app/gallery/[city]/page.tsx`
and `app/page.tsx` with `<Image src={photo.image} alt={photo.title} fill />` from `next/image`.
