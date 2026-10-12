import type { ReactNode } from "react";

type CatalogueGlyphProps = {
  id: string;
  className?: string;
};

// Shapes and class names come directly from the supplied HTML prototype.
const glyphs: Record<string, ReactNode> = {
  "seedance-director-skill": (
    <>
      <path className="tone" d="M8 20h33v20a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3Z" />
      <path className="paper" d="M12 26h25v12H12z" />
      <path d="M17 32h13m-13 3h8" className="fine" />
      <g className="hinge">
        <path className="solid" d="M8 20v-8a2 2 0 0 1 2-2h29a2 2 0 0 1 2 2v8Z" />
        <path d="m17 10-6 10m17-10-6 10m17-10-6 10" />
        <circle className="paper" cx="11" cy="17" r="1.35" />
      </g>
    </>
  ),
  "ai-liveaction-fusion": (
    <>
      <g className="lift">
        <rect className="tone" x="6" y="8" width="26" height="25" rx="3" />
        <circle className="paper" cx="14" cy="15" r="2.5" />
        <path d="m9 27 7-7 6 6 5-4 5 6" />
      </g>
      <rect className="solid" x="18" y="19" width="25" height="24" rx="3" />
      <path className="paper" d="m26 26 10 5-10 5Z" />
    </>
  ),
  "prompt-refiner": (
    <>
      <path className="tone" d="M8 6h22l7 7v27H8Z" />
      <path className="paper" d="M30 6v7h7" />
      <path d="M13 17h12m-12 5h15m-15 5h8" className="fine" />
      <g className="lift">
        <path className="solid" d="m25 39 1-7L38 16l6 4-12 16Z" />
        <path className="paper" d="m25 39 1-7 6 4Z" />
        <path d="m35 21 6 4" />
      </g>
      <path d="M12 35h7" />
    </>
  ),
  "shot-builder": (
    <>
      <path className="tone" d="M7 17a3 3 0 0 1 3-3h7l3-5h11l3 5h5a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3Z" />
      <circle className="solid" cx="26" cy="27" r="9" />
      <circle className="paper" cx="26" cy="27" r="5" />
      <path d="M11 18h4" />
    </>
  ),
  "creative-toolkit": (
    <>
      <path className="solid" d="M17 14V9a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v5h-4V10h-7v4Z" />
      <rect className="tone" x="6" y="14" width="37" height="27" rx="4" />
      <path className="solid" d="M6 22h37v7H6Z" />
      <rect className="paper" x="21" y="23" width="7" height="8" rx="1" />
    </>
  ),
  "style-transfer-lab": (
    <>
      <path className="tone" d="m9 13 22-6 8 28-23 6Z" />
      <rect className="paper" x="5" y="17" width="25" height="25" rx="2" />
      <circle className="solid" cx="30" cy="19" r="11" />
      <path d="M8 29h18m-18 7h18M13 23v16m7-16v16" className="etch" />
      <path className="paper" d="M32 8a11 11 0 0 1 8 11H29Z" />
    </>
  ),
  "character-consistency": (
    <>
      <rect className="tone" x="5" y="6" width="23" height="31" rx="3" />
      <circle className="paper" cx="16.5" cy="17" r="4.5" />
      <path className="solid" d="M9 31v-2a7.5 7.5 0 0 1 15 0v2Z" />
      <g className="lift">
        <rect className="paper" x="21" y="13" width="23" height="31" rx="3" />
        <circle className="tone" cx="32.5" cy="24" r="4.5" />
        <path className="solid" d="M25 38v-2a7.5 7.5 0 0 1 15 0v2Z" />
      </g>
    </>
  ),
  "video-to-storyboard": (
    <>
      <rect className="tone" x="5" y="8" width="38" height="32" rx="3" />
      <path className="solid" d="M5 8h38v7H5z" />
      <path d="M11 8v7m7-7v7m7-7v7m7-7v7m7-7v7" className="fine" />
      <rect className="paper" x="10" y="20" width="12" height="14" rx="1" />
      <rect className="paper" x="27" y="20" width="11" height="14" rx="1" />
      <path d="m14 24 5 3-5 3Z" className="solid" />
      <path d="M29 25h6m-6 5h4" className="fine" />
    </>
  ),
  "motion-caption": (
    <>
      <path d="M7 29C5 14 29 7 37 19" strokeDasharray="2.4 3" />
      <path className="solid" d="m32 15 8 4-7 5Z" />
      <path className="tone" d="M8 25h28v15H21l-7 5v-5H8Z" />
      <path d="M13 30h17m-17 5h11" className="fine" />
      <circle className="paper" cx="11" cy="13" r="4" />
    </>
  ),
  "asset-organizer": (
    <>
      <path className="solid" d="M6 14V9h12l4 5h19v25H6Z" />
      <path className="paper lift" d="M11 17h25v18H11Z" />
      <path className="tone" d="M5 23h39l-4 19H8Z" />
      <path d="M18 32h12" />
      <path d="M12 20h19" className="fine" />
    </>
  ),
};

export function CatalogueGlyph({ id, className = "skill-glyph" }: CatalogueGlyphProps) {
  const glyph = Object.prototype.hasOwnProperty.call(glyphs, id) ? glyphs[id] : glyphs["asset-organizer"];

  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {glyph}
    </svg>
  );
}
