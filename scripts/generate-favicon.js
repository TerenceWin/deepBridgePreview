const sharp = require('sharp');
const path = require('path');

// Standalone SVG of the LogoMark with transparent background
const svg = `
<svg width="512" height="512" viewBox="200 130 280 140" xmlns="http://www.w3.org/2000/svg">
  <!-- top half: light blue #29ABE2 -->
  <clipPath id="lt"><rect x="0" y="0" width="680" height="200"/></clipPath>
  <!-- bottom half: dark blue #0F3D6E -->
  <clipPath id="lb"><rect x="0" y="200" width="680" height="400"/></clipPath>

  <!-- white outline layer drawn first (stroke-width 36 vs 22 = 7px halo each side) -->
  <line x1="249" y1="120" x2="249" y2="280" stroke="white" stroke-width="39" stroke-linecap="round"/>
  <line x1="431" y1="120" x2="431" y2="280" stroke="white" stroke-width="39" stroke-linecap="round"/>
  <circle cx="340" cy="200" r="80" fill="none" stroke="white" stroke-width="39"/>

  <!-- colored icon on top -->
  <g clip-path="url(#lt)">
    <line x1="249" y1="120" x2="249" y2="280" stroke="#29ABE2" stroke-width="25" stroke-linecap="round"/>
    <line x1="431" y1="120" x2="431" y2="280" stroke="#29ABE2" stroke-width="25" stroke-linecap="round"/>
    <circle cx="340" cy="200" r="80" fill="none" stroke="#29ABE2" stroke-width="25"/>
    <rect x="235" y="120" width="28" height="160" fill="transparent"/>
    <line x1="249" y1="120" x2="249" y2="280" stroke="#29ABE2" stroke-width="25" stroke-linecap="round"/>
    <rect x="417" y="120" width="28" height="160" fill="transparent"/>
    <line x1="431" y1="120" x2="431" y2="280" stroke="#29ABE2" stroke-width="25" stroke-linecap="round"/>
  </g>
  <g clip-path="url(#lb)">
    <line x1="249" y1="120" x2="249" y2="280" stroke="#0F3D6E" stroke-width="25" stroke-linecap="round"/>
    <line x1="431" y1="120" x2="431" y2="280" stroke="#0F3D6E" stroke-width="25" stroke-linecap="round"/>
    <circle cx="340" cy="200" r="80" fill="none" stroke="#0F3D6E" stroke-width="25"/>
    <rect x="235" y="120" width="28" height="160" fill="transparent"/>
    <line x1="249" y1="120" x2="249" y2="280" stroke="#0F3D6E" stroke-width="25" stroke-linecap="round"/>
    <rect x="417" y="120" width="28" height="160" fill="transparent"/>
    <line x1="431" y1="120" x2="431" y2="280" stroke="#0F3D6E" stroke-width="25" stroke-linecap="round"/>
  </g>
</svg>`;

const publicDir = path.join(__dirname, '..', 'public');
const buildDir  = path.join(__dirname, '..', 'build');

async function generate() {
  const buf = Buffer.from(svg);

  // 512x512 PNG for general use (logo512.png)
  await sharp(buf).resize(512, 512).png().toFile(path.join(publicDir, 'logo512.png'));
  await sharp(buf).resize(512, 512).png().toFile(path.join(buildDir,  'logo512.png'));

  // 192x192 PNG (logo192.png)
  await sharp(buf).resize(192, 192).png().toFile(path.join(publicDir, 'logo192.png'));
  await sharp(buf).resize(192, 192).png().toFile(path.join(buildDir,  'logo192.png'));

  // 36x36 favicon PNG
  await sharp(buf).resize(36, 36).png().toFile(path.join(publicDir, 'favicon.png'));
  await sharp(buf).resize(36, 36).png().toFile(path.join(buildDir,  'favicon.png'));

  console.log('Generated: logo512.png, logo192.png, favicon.png in public/ and build/');
}

generate().catch(console.error);
