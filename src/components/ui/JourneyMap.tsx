import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { landPath, MAP_WIDTH, MAP_HEIGHT } from '../../data/mapPaths';

const cities = [
  { key: 'shandong', x: 285, y: 134, label: 'Shandong', year: '~1920s', color: '#C8102E' },
  { key: 'hongkong', x: 278, y: 172, label: 'Hong Kong', year: '~1950s', color: '#E07C24' },
  { key: 'vancouver', x: 605, y: 100, label: 'Vancouver', year: '~1980s', color: '#2D6A4F' },
  { key: 'puebla', x: 671, y: 181, label: 'Puebla', year: 'Hoy', color: '#6B3FA0' },
] as const;

// Curved journey path connecting the 4 cities (over the Pacific)
const journeyPath = `
  M${cities[0].x},${cities[0].y}
  C${cities[0].x + 15},${cities[0].y + 25} ${cities[1].x + 10},${cities[1].y - 20} ${cities[1].x},${cities[1].y}
  C${cities[1].x + 100},${cities[1].y - 40} ${cities[2].x - 160},${cities[2].y + 60} ${cities[2].x},${cities[2].y}
  C${cities[2].x + 25},${cities[2].y + 30} ${cities[3].x - 15},${cities[3].y - 25} ${cities[3].x},${cities[3].y}
`;

const DEFAULT_PATH_LENGTH = 1200;

export default function JourneyMap() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const mapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [boatPos, setBoatPos] = useState({ x: cities[0].x, y: cities[0].y });
  const [pathLength, setPathLength] = useState(DEFAULT_PATH_LENGTH);
  const pathRef = useRef<SVGPathElement>(null);

  const shouldShow = visible || reducedMotion;
  const effectiveProgress = reducedMotion ? 1 : progress;

  // Measure path length via callback ref
  const setPathRef = useCallback((node: SVGPathElement | null) => {
    pathRef.current = node;
    if (node) {
      setPathLength(node.getTotalLength());
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const el = mapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
          let start: number | null = null;
          const duration = 3000;
          const animate = (ts: number) => {
            if (!start) start = ts;
            const elapsed = ts - start;
            const p = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setProgress(eased);
            // Calculate boat position inside animation frame
            if (pathRef.current && eased > 0.01 && eased < 0.99) {
              const point = pathRef.current.getPointAtLength(eased * pathLength);
              setBoatPos({ x: point.x, y: point.y });
            }
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, pathLength]);

  const cityThresholds = [0, 0.15, 0.55, 0.9];

  return (
    <div ref={mapRef} className="mt-8 mb-4">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="w-full h-auto rounded-2xl"
        role="img"
        aria-label={t('story.subtitle')}
      >
        <defs>
          {/* Ocean gradient */}
          <radialGradient id="ocean-glow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#1a3050" />
            <stop offset="100%" stopColor="#0d1a2e" />
          </radialGradient>
          {/* City glow filter */}
          <filter id="city-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Journey path gradient */}
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8102E" />
            <stop offset="33%" stopColor="#E07C24" />
            <stop offset="66%" stopColor="#2D6A4F" />
            <stop offset="100%" stopColor="#6B3FA0" />
          </linearGradient>
          {/* Land texture gradient */}
          <linearGradient id="land-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a4a70" />
            <stop offset="100%" stopColor="#1e3850" />
          </linearGradient>
        </defs>

        {/* Ocean background */}
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#ocean-glow)" rx="16" />

        {/* Subtle graticule grid */}
        <g opacity="0.06" stroke="#6b8ab0" strokeWidth="0.3">
          {Array.from({ length: 11 }, (_, i) => i * (MAP_WIDTH / 12) + MAP_WIDTH / 12).map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2={MAP_HEIGHT} />
          ))}
          {Array.from({ length: 5 }, (_, i) => i * (MAP_HEIGHT / 6) + MAP_HEIGHT / 6).map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2={MAP_WIDTH} y2={y} />
          ))}
        </g>

        {/* Real continent landmasses from Natural Earth */}
        <path
          d={landPath}
          fill="url(#land-fill)"
          opacity="0.4"
          stroke="#4a7aa8"
          strokeWidth="0.4"
          strokeLinejoin="round"
        />

        {/* Subtle land highlight border for depth */}
        <path
          d={landPath}
          fill="none"
          stroke="#8ab4d8"
          strokeWidth="0.2"
          strokeLinejoin="round"
          opacity="0.15"
        />

        {/* Ocean decoration — subtle wave hints */}
        <g opacity="0.035" fill="none" stroke="#8ab4d8" strokeWidth="0.8">
          <path d="M350,140 Q400,130 450,140 Q500,150 550,140" />
          <path d="M380,200 Q430,190 480,200 Q530,210 580,200" />
          <path d="M420,260 Q470,250 520,260 Q570,270 620,260" />
          <path d="M300,300 Q350,290 400,300" />
          <path d="M460,120 Q510,110 560,120" />
          <path d="M500,180 Q550,170 600,180" />
        </g>

        {/* Journey route — glow layer */}
        <path
          d={journeyPath}
          fill="none"
          stroke="url(#path-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={shouldShow ? 0.12 : 0}
          style={{ transition: 'opacity 1s' }}
        />

        {/* Journey route — animated dashed line */}
        <path
          ref={setPathRef}
          d={journeyPath}
          fill="none"
          stroke="url(#path-gradient)"
          strokeWidth="2.5"
          strokeDasharray="10 5"
          strokeLinecap="round"
          style={{
            strokeDashoffset: shouldShow ? 0 : pathLength,
            transition: reducedMotion ? 'none' : `stroke-dashoffset 3s cubic-bezier(0.25,0.1,0.25,1)`,
            opacity: shouldShow ? 0.85 : 0,
          }}
        />

        {/* City markers */}
        {cities.map((city, i) => {
          const isRevealed = effectiveProgress >= cityThresholds[i];
          const labelLeft = i < 2;
          return (
            <g
              key={city.key}
              style={{
                opacity: isRevealed ? 1 : 0,
                transition: 'opacity 0.6s ease-out',
              }}
            >
              {/* Pulse ring */}
              <circle cx={city.x} cy={city.y} r="16" fill={city.color} opacity="0.08">
                {isRevealed && !reducedMotion && (
                  <>
                    <animate attributeName="r" from="10" to="24" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.12" to="0" dur="2.5s" repeatCount="indefinite" />
                  </>
                )}
              </circle>
              {/* Marker */}
              <circle
                cx={city.x}
                cy={city.y}
                r="5"
                fill={city.color}
                stroke="white"
                strokeWidth="2"
                filter="url(#city-glow)"
              />
              {/* Label pill */}
              <rect
                x={labelLeft ? city.x + 14 : city.x - 14 - city.label.length * 6.5}
                y={city.y - 22}
                width={city.label.length * 6.5 + 12}
                height="20"
                rx="6"
                fill="rgba(12,22,39,0.88)"
                stroke={city.color}
                strokeWidth="0.5"
                strokeOpacity="0.4"
              />
              <text
                x={labelLeft ? city.x + 20 : city.x - 8 - city.label.length * 6.5 + 6}
                y={city.y - 8}
                fill="white"
                fontSize="11"
                fontFamily="Jost, sans-serif"
                fontWeight="600"
              >
                {city.label}
              </text>
              {/* Year */}
              <text
                x={labelLeft ? city.x + 20 : city.x - 8 - city.year.length * 5.5}
                y={city.y + 20}
                fill={city.color}
                fontSize="10"
                fontFamily="Jost, sans-serif"
                fontWeight="700"
              >
                {city.year}
              </text>
            </g>
          );
        })}

        {/* Animated junk boat */}
        {shouldShow && !reducedMotion && progress > 0.01 && progress < 0.98 && (
          <g
            transform={`translate(${boatPos.x - 10}, ${boatPos.y - 18}) scale(0.7)`}
            opacity="0.95"
          >
            <path d="M4,16 L8,6 L10,6 L10,3 L12,3 L12,6 L16,6 L20,16 Z" fill="#C8102E" />
            <path d="M1,17 L23,17 Q22,20 20,21 L4,21 Q2,20 1,17 Z" fill="#a00d24" />
            <line x1="12" y1="3" x2="12" y2="16" stroke="#8a0b1e" strokeWidth="0.5" />
          </g>
        )}

        {/* Compass rose */}
        <g transform={`translate(${MAP_WIDTH - 40}, ${MAP_HEIGHT - 40})`} opacity="0.2">
          <circle cx="0" cy="0" r="16" fill="none" stroke="#a9b9d1" strokeWidth="0.5" />
          <polygon points="0,-12 2,-2 0,0 -2,-2" fill="#a9b9d1" opacity="0.6" />
          <polygon points="0,12 2,2 0,0 -2,2" fill="#a9b9d1" opacity="0.3" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#a9b9d1" strokeWidth="0.3" />
          <text x="-3" y="-16" fill="#a9b9d1" fontSize="7" fontFamily="Jost, sans-serif">N</text>
        </g>
      </svg>
    </div>
  );
}
