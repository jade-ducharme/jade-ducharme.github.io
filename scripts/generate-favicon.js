/**
 * Builds the site favicon from the galaxy artwork.
 *
 *   zsh -i -c 'node scripts/generate-favicon.js'
 *
 * The source PNG is pure white with every bit of structure in its alpha
 * channel, so recolouring is just "solid accent colour + the source's alpha".
 * Nothing else is drawn on top — the icon is the galaxy, in the accent colour.
 *
 * Outputs:
 *   src/images/favicon.png  — 512px master, consumed by gatsby-plugin-manifest
 *   static/favicon.ico      — 16/32/48 multi-size ICO for /favicon.ico requests
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, 'src/images/galaxy.png');
const MASTER = path.join(ROOT, 'src/images/favicon.png');
const ICO = path.join(ROOT, 'static/favicon.ico');

const ACCENT = { r: 0, g: 234, b: 150 }; // theme.colors.green (#00ea96)
const SIZE = 512;

/** ICO container holding PNG entries (supported since Windows Vista). */
const buildIco = images => {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map(i => i.data)]);
};

const build = async () => {
  // trim the transparent margin, then letterbox into a square canvas
  const square = await sharp(SOURCE)
    .ensureAlpha()
    .trim({ threshold: 3 })
    .resize(SIZE, SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // the alpha channel *is* the galaxy; lift it a little so the faint outer arms
  // survive being scaled down to favicon sizes, then fill with the accent
  const alpha = await sharp(square).extractChannel(3).gamma(2.2).linear(1.6, 0).toBuffer();

  const master = await sharp({
    create: { width: SIZE, height: SIZE, channels: 3, background: ACCENT },
  })
    .joinChannel(alpha)
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(master).toFile(MASTER);
  console.log(`wrote ${MASTER} (${SIZE}x${SIZE})`);

  const icoSizes = [16, 32, 48];
  const images = await Promise.all(
    icoSizes.map(async size => ({
      size,
      data: await sharp(master).resize(size, size).png({ compressionLevel: 9 }).toBuffer(),
    })),
  );
  fs.writeFileSync(ICO, buildIco(images));
  console.log(`wrote ${ICO} (${icoSizes.join('/')})`);
};

build().catch(err => {
  console.error(err);
  process.exit(1);
});
