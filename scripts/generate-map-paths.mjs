/**
 * Generate accurate SVG paths from Natural Earth coastline data.
 * Pacific-centered equirectangular projection.
 *
 * Usage: node scripts/generate-map-paths.mjs
 * Output: src/data/mapPaths.ts
 */

import { feature } from 'topojson-client';
import { geoPath, geoEquirectangular } from 'd3-geo';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load world-atlas 110m land (simplified, small)
const landTopoPath = resolve(__dirname, '../node_modules/world-atlas/land-110m.json');
const land = JSON.parse(readFileSync(landTopoPath, 'utf-8'));
const landGeo = feature(land, land.objects.land);

// Pacific-centered equirectangular projection
// Center at 190°E so East Asia is left, Americas are right
const width = 960;
const height = 480;

const projection = geoEquirectangular()
  .rotate([-190, 0])
  .fitSize([width, height], landGeo);

// Round coordinates to integers for much smaller output
const pathGenerator = geoPath(projection).pointRadius(1);

// Custom path serializer that rounds coordinates
function roundPath(pathStr) {
  if (!pathStr) return '';
  // Round all numbers to 1 decimal place
  return pathStr.replace(/(\d+\.\d+)/g, (match) => {
    return Math.round(parseFloat(match)).toString();
  });
}

// Generate land path with rounded coordinates
const rawLandPath = pathGenerator(landGeo);
const landPathStr = roundPath(rawLandPath);

// Calculate city positions using the same projection
const cityCoords = [
  { key: 'shandong', lng: 117.0, lat: 36.5 },  // Jinan, Shandong
  { key: 'hongkong', lng: 114.17, lat: 22.3 },  // Hong Kong
  { key: 'vancouver', lng: -123.12, lat: 49.28 }, // Vancouver
  { key: 'puebla', lng: -98.2, lat: 19.04 },     // Puebla
];

console.log('\nCity positions in SVG coordinates:');
for (const city of cityCoords) {
  const [x, y] = projection([city.lng, city.lat]);
  console.log(`  ${city.key}: x=${Math.round(x)}, y=${Math.round(y)}`);
}

// Write output
const output = `// AUTO-GENERATED — do not edit manually
// Run: node scripts/generate-map-paths.mjs
// Source: Natural Earth 110m via world-atlas

export const MAP_WIDTH = ${width};
export const MAP_HEIGHT = ${height};

// Combined land mass outline (all continents)
export const landPath = \`${landPathStr}\`;
`;

const outPath = resolve(__dirname, '../src/data/mapPaths.ts');
writeFileSync(outPath, output, 'utf-8');
console.log(`✅ Map paths written to src/data/mapPaths.ts`);
console.log(`   Land path length: ${landPathStr.length} chars`);
