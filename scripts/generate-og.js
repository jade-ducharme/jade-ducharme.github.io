/**
 * Regenerates src/images/og.png — the social preview card used by <Head> for
 * og:image / twitter:image. Run it whenever the palette or hero copy changes:
 *
 *   zsh -i -c 'node scripts/generate-og.js'
 *
 * Colors are kept in sync with src/styles/theme.js by hand; the fonts are
 * system fallbacks (Calibre and SF Mono are web fonts and are not installed),
 * which is why the render is close to, but not pixel-identical with, the site.
 */
const path = require('path');
const sharp = require('sharp');

const BG = '#1b1c1e'; // theme.colors.navy
const ACCENT = '#00ea96'; // theme.colors.green
const HEADING = '#e6e7ea'; // theme.colors.lightestSlate
const SUB = '#aeafb4'; // theme.colors.slate
const BODY = '#cbccd0'; // theme.colors.lightSlate

const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const MONO = 'SF Mono, Menlo, Monaco, Consolas, monospace';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <text x="90" y="152" font-family="${MONO}" font-size="30" fill="${ACCENT}">Hello, my name is</text>
  <text x="88" y="245" font-family="${SANS}" font-size="82" font-weight="700" fill="${HEADING}">Jade Ducharme.</text>
  <text x="88" y="340" font-family="${SANS}" font-size="72" font-weight="700" fill="${SUB}">I listen to the early Universe.</text>
  <text x="90" y="428" font-family="${SANS}" font-size="26" fill="${BODY}">Ph.D. candidate in physics at Brown University, working on radio</text>
  <text x="90" y="472" font-family="${SANS}" font-size="26" fill="${BODY}">interferometry, 21-cm cosmology, and RFI mitigation.</text>
  <rect x="90" y="512" width="232" height="56" rx="4" fill="none" stroke="${ACCENT}" stroke-width="2"/>
  <text x="134" y="548" font-family="${MONO}" font-size="22" fill="${ACCENT}">Get In Touch</text>
</svg>`;

const out = path.join(__dirname, '..', 'src', 'images', 'og.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(out)
  .then(info => console.log(`wrote ${out} (${info.width}x${info.height})`))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
