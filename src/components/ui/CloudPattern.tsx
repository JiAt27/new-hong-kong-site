/**
 * Chinese cloud pattern (祥雲 xiangyun) — inspired by the branding sticker labels.
 * Renders as a repeating SVG pattern overlaid on section backgrounds.
 * Used on navy sections and cream sections for visual continuity with physical packaging.
 */

export function CloudPatternOverlay({
  color = 'white',
  opacity = 0.04,
  className = '',
}: {
  color?: string;
  opacity?: number;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cloud-pattern" x="0" y="0" width="200" height="180" patternUnits="userSpaceOnUse">
            {/* Main cloud motif — stylized xiangyun with spiral center */}
            <g fill="none" stroke={color} strokeWidth="1.2" opacity={opacity}>
              {/* Cloud 1 — large swirling cloud */}
              <path d="M40,90 C40,70 55,55 75,55 C80,40 100,35 110,50 C120,40 140,45 145,60 C160,55 170,70 165,85 C175,95 170,115 155,115 C150,125 135,130 120,125 C110,135 90,135 80,125 C65,130 45,120 40,105 C30,100 30,95 40,90 Z" />
              {/* Inner spiral */}
              <path d="M100,80 C105,75 115,75 115,85 C115,92 108,95 100,92 C95,90 95,85 100,80 Z" />
              {/* Trailing wisps */}
              <path d="M40,100 C30,105 15,100 10,110 C5,118 12,125 20,122" />
              <path d="M165,80 C175,75 185,80 190,72 C195,65 188,58 180,62" />

              {/* Cloud 2 — smaller cloud offset */}
              <path d="M10,30 C15,18 30,15 40,25 C48,18 60,20 62,32 C70,30 78,38 75,48 C80,55 72,65 62,62 C55,68 42,68 38,60 C28,64 15,58 14,48 C8,44 6,36 10,30 Z" />
              {/* Inner dot */}
              <circle cx="38" cy="40" r="5" />

              {/* Cloud 3 — bottom right small */}
              <path d="M145,140 C150,130 162,130 168,138 C175,132 185,138 183,148 C190,152 188,162 180,162 C176,168 165,168 160,162 C152,166 142,158 145,148 Z" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cloud-pattern)" />
      </svg>
    </div>
  );
}

/**
 * Larger, more ornate cloud swirls — inspired by the Soup Dumplings sticker label.
 * Used for hero sections or feature areas that need more dramatic decoration.
 */
export function OrnateCloudOverlay({
  color = 'white',
  opacity = 0.03,
  className = '',
}: {
  color?: string;
  opacity?: number;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ornate-clouds" x="0" y="0" width="400" height="350" patternUnits="userSpaceOnUse">
            <g fill="none" stroke={color} strokeWidth="1.5" opacity={opacity}>
              {/* Large dramatic swirl */}
              <path d="M80,175 C80,130 120,100 160,100 C170,70 210,55 240,80 C260,60 300,70 310,100 C340,90 365,110 355,140 C380,155 370,190 340,195 C335,220 310,235 280,225 C260,245 220,245 200,225 C175,240 140,230 130,210 C105,220 80,205 80,185 Z" />
              <path d="M200,150 C210,140 230,140 230,155 C230,168 215,172 200,167 C190,163 190,155 200,150 Z" />
              {/* Flowing tail */}
              <path d="M80,185 C55,195 30,185 15,200 C0,215 15,235 35,228" />
              <path d="M355,135 C375,125 395,135 400,120" />

              {/* Smaller companion cloud */}
              <path d="M300,280 C305,265 320,260 335,270 C345,262 360,268 358,280 C368,285 365,298 355,298 C350,306 338,308 330,302 C322,308 308,300 310,290 C302,286 300,278 305,272" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ornate-clouds)" />
      </svg>
    </div>
  );
}
