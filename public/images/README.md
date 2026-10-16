# Portrait and optional imagery

The current page deliberately uses a labeled illustrated portrait placeholder. It is not a generated likeness of Lyla.

To add an approved portrait:
1. Save an optimized, legally usable image as `public/images/lyla-portrait.webp` (or `.avif` / `.jpg`). Aim for about 780 × 1000 pixels and below 200 KB where practical. Keep the face clear when cropped at smaller widths.
2. In `src/App.tsx`, replace the contents of `figure.portrait-placeholder` with an `<img src="/images/lyla-portrait.webp" alt="Lyla Bashan" width="780" height="1000" loading="lazy" decoding="async" />`.
3. Remove the placeholder label and caption. Add `.portrait-placeholder img { width:100%; height:100%; object-fit:cover; }` and remove the figure's `:after` overlay if it obscures the photograph.
4. Check the crop on mobile and desktop, ensure the person has approved the photo, and record any photographer attribution/license requirements here.

Optional licensed Hawaiʻi landscape photography can replace the hero illustration. Store optimized files here, verify rights and attribution, provide appropriate alt text, and specify dimensions. Do not hotlink images or reuse photos from the reference site without permission.
