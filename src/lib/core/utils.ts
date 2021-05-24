const clamp = (min: number, max: number) => (value: number): number => Math.max(min, Math.min(value, max));

const clampUint8 = clamp(0, 255);

// TODO: cache this computation
const isLittleEndian = (): boolean => {
  // https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
  const buf = new ArrayBuffer(4);
  const buf8 = new Uint8ClampedArray(buf);
  const data = new Uint32Array(buf);

  // Determine whether Uint32 is little- or big-endian.
  data[0] = 0x0a0b0c0d;
  return buf8[0] === 0x0d;
};

/**
 * Compute uint32 pixel value from four uint8 red, green, blue, and alpha components 
 * @param {number} red - uint8 red component 
 * @param {number} green - uint8 green component 
 * @param {number} blue - uint8 blue component 
 * @param {number} alpha - uint8 alpha component 
 * @return {number} uint32 Pixel value 
 */
const toUint32 = (r: number, g: number, b: number, a: number) : number => (isLittleEndian() ? (( a << 24) | (b << 16) | (g << 8) | r) : (( r << 24) | (g << 16) | b << 8) | a);

const toabgr = (color: number): number => ( (color & 0xff) << 24) | ( (color & 0x00ff00) << 8) | ( (color & 0xff0000) >> 8) | ( (color & 0xff000000) >> 24);

export {
    clamp, 
    clampUint8, 
    isLittleEndian,
    toUint32,
    toabgr
}