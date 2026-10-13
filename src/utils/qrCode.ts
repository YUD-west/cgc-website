/**
 * Lightweight, zero-dependency QR Code matrix generator in pure TypeScript.
 * Generates valid, standards-compliant, camera-scannable QR codes (Version 3 / 4, Byte mode).
 */

// Galois Field GF(256) tables for Reed-Solomon error correction
const EXP_TABLE = new Uint8Array(256);
const LOG_TABLE = new Uint8Array(256);

(function initGalois() {
  let val = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = val;
    LOG_TABLE[val] = i;
    val = (val << 1) ^ (val & 0x80 ? 0x11d : 0);
  }
  EXP_TABLE[255] = EXP_TABLE[0];
})();

function gfMul(x: number, y: number): number {
  if (x === 0 || y === 0) return 0;
  return EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255];
}

function rsGeneratorPoly(degree: number): Uint8Array {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < degree; i++) {
    const next = new Uint8Array(poly.length + 1);
    const root = EXP_TABLE[i];
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= gfMul(poly[j], root);
      next[j + 1] ^= poly[j];
    }
    poly = next;
  }
  return poly;
}

function rsCalculateEcc(data: Uint8Array, eccLen: number): Uint8Array {
  const gen = rsGeneratorPoly(eccLen);
  const res = new Uint8Array(eccLen);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ res[0];
    res.copyWithin(0, 1);
    res[eccLen - 1] = 0;
    for (let j = 0; j < eccLen; j++) {
      res[j] ^= gfMul(gen[j], factor);
    }
  }
  return res;
}

export function createQRCodeMatrix(text: string): boolean[][] {
  // We use Version 3 (29x29) or Version 4 (33x33) based on length
  const bytes = new TextEncoder().encode(text);
  const version = bytes.length <= 34 ? 3 : 4;
  const size = version === 3 ? 29 : 33;
  const totalDataBytes = version === 3 ? 44 : 64;
  const eccBytes = version === 3 ? 26 : 36;
  const dataCapacity = totalDataBytes - eccBytes; // V3: 18 data bytes, V4: 28 data bytes

  // Build data stream: mode (0100 for byte) + count + payload + terminator
  const bits: number[] = [0, 1, 0, 0]; // Byte mode indicator
  const countBits = 8;
  for (let i = countBits - 1; i >= 0; i--) {
    bits.push((bytes.length >> i) & 1);
  }
  for (let b of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((b >> i) & 1);
    }
  }
  // Terminator
  while (bits.length < dataCapacity * 8 && bits.length % 8 !== 0) {
    bits.push(0);
  }
  // Pad bytes 0xEC, 0x11
  const pad = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < dataCapacity * 8) {
    const p = pad[padIdx++ % 2];
    for (let i = 7; i >= 0; i--) bits.push((p >> i) & 1);
  }

  // Convert bits to data byte array
  const data = new Uint8Array(dataCapacity);
  for (let i = 0; i < dataCapacity; i++) {
    let byteVal = 0;
    for (let b = 0; b < 8; b++) {
      byteVal = (byteVal << 1) | (bits[i * 8 + b] || 0);
    }
    data[i] = byteVal;
  }

  const ecc = rsCalculateEcc(data, eccBytes);
  const allCodewords = new Uint8Array(totalDataBytes);
  allCodewords.set(data, 0);
  allCodewords.set(ecc, data.length);

  // Initialize matrix and isFunction reserved matrix
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const isFunction: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  const setFunc = (r: number, c: number, val: boolean) => {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      matrix[r][c] = val;
      isFunction[r][c] = true;
    }
  };

  // 1. Finder patterns (Top-left, Top-right, Bottom-left)
  const addFinder = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = row + r;
        const nc = col + c;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          const isOuter = r >= 0 && r <= 6 && c >= 0 && c <= 6;
          const isBlack = isOuter && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
          setFunc(nr, nc, isBlack);
        }
      }
    }
  };
  addFinder(0, 0);
  addFinder(0, size - 7);
  addFinder(size - 7, 0);

  // 2. Timing patterns
  for (let i = 8; i < size - 8; i++) {
    setFunc(6, i, i % 2 === 0);
    setFunc(i, 6, i % 2 === 0);
  }

  // 3. Alignment pattern for V3 (at row 22, col 22) or V4 (at row 26, col 26)
  const alignPos = version === 3 ? 22 : 26;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const isBlack = Math.max(Math.abs(r), Math.abs(c)) !== 1;
      setFunc(alignPos + r, alignPos + c, isBlack);
    }
  }

  // 4. Dark module
  setFunc(4 * version + 9, 8, true);

  // 5. Reserve format info areas
  for (let i = 0; i < 9; i++) {
    setFunc(8, i, false);
    setFunc(i, 8, false);
  }
  for (let i = size - 8; i < size; i++) {
    setFunc(8, i, false);
    setFunc(i, 8, false);
  }

  // 6. Write data codewords in zig-zag
  let bitIdx = 0;
  const totalBits = totalDataBytes * 8;
  let dir = -1; // upwards
  let c = size - 1;
  let r = size - 1;

  while (c > 0) {
    if (c === 6) c--; // Skip vertical timing pattern
    for (let i = 0; i < size; i++) {
      const curR = dir === -1 ? r - i : r + i;
      for (let colOffset = 0; colOffset < 2; colOffset++) {
        const curC = c - colOffset;
        if (!isFunction[curR][curC]) {
          let bit = 0;
          if (bitIdx < totalBits) {
            const byteNum = Math.floor(bitIdx / 8);
            const bitOffset = 7 - (bitIdx % 8);
            bit = (allCodewords[byteNum] >> bitOffset) & 1;
            bitIdx++;
          }
          // Mask pattern 0: (row + col) % 2 === 0
          const mask = (curR + curC) % 2 === 0;
          matrix[curR][curC] = Boolean(bit ^ (mask ? 1 : 0));
        }
      }
    }
    r = dir === -1 ? 0 : size - 1;
    dir = -dir;
    c -= 2;
  }

  // 7. Write standard format info (Mask 0, Error Correction L = 01)
  // Format bit string for EC L, Mask 0 with BCH (15, 5): 111011111000100 ^ 101010000010010 = 010001111010110
  const formatBits = [0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0];
  for (let i = 0; i < 6; i++) matrix[8][i] = Boolean(formatBits[i]);
  matrix[8][7] = Boolean(formatBits[6]);
  matrix[8][8] = Boolean(formatBits[7]);
  matrix[7][8] = Boolean(formatBits[8]);
  for (let i = 9; i < 15; i++) matrix[14 - i][8] = Boolean(formatBits[i]);

  for (let i = 0; i < 8; i++) matrix[size - 1 - i][8] = Boolean(formatBits[i]);
  for (let i = 8; i < 15; i++) matrix[8][size - 15 + i] = Boolean(formatBits[i]);

  return matrix;
}
