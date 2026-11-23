import { chmodSync, copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const LIMIT_BYTES = 1048576;
const LIMIT_PX = 1024;

function inspectHeader(bytes: Buffer): { kind: 'png' | 'jpeg'; w: number; h: number } {
  if (bytes.length >= 24 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { kind: 'png', w: bytes.readUInt32BE(16), h: bytes.readUInt32BE(20) };
  }
  if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    let pos = 2;
    while (pos + 8 < bytes.length) {
      if (bytes[pos] !== 0xff) {
        pos += 1;
        continue;
      }
      const code = bytes[pos + 1]!;
      if (code === 0xd9 || code === 0xda) break;
      const len = bytes.readUInt16BE(pos + 2);
      if ((code >= 0xc0 && code <= 0xc3) || (code >= 0xc5 && code <= 0xc7) || (code >= 0xc9 && code <= 0xcb)) {
        return { kind: 'jpeg', h: bytes.readUInt16BE(pos + 5), w: bytes.readUInt16BE(pos + 7) };
      }
      pos += 2 + len;
    }
  }
  throw new Error('entry.png must be a valid PNG or JPEG file');
}

function publish(): void {
  const root = dirname(fileURLToPath(import.meta.url));
  const src = join(root, 'entry.png');
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const dst = join(outDir, 'entry.png');

  const size = statSync(src).size;
  if (size <= 0 || size > LIMIT_BYTES) {
    throw new Error(`entry.png size ${size} exceeds ${LIMIT_BYTES}`);
  }
  const info = inspectHeader(readFileSync(src));
  if (info.w <= 0 || info.h <= 0 || info.w > LIMIT_PX || info.h > LIMIT_PX) {
    throw new Error(`entry.png dimensions ${info.w}x${info.h} invalid (limit ${LIMIT_PX}x${LIMIT_PX})`);
  }

  mkdirSync(outDir, { recursive: true, mode: 0o755 });
  copyFileSync(src, dst);
  try {
    chmodSync(dst, 0o644);
  } catch {
    // Non-POSIX filesystem
  }
}

publish();
