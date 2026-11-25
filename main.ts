// The Funniest One-Line Resignation Letter — u-deranalabs-the-funniest-one-line-resignation-letter-53c0d947
// One line, written in the voice of a cron job that has fired every minute since March.
// Node 22 stdlib only. No clock, no network, no randomness. Writes only to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I ran 400,000 times. You noticed me exactly once, when I did not.";

// A cron job firing every minute since March runs ~400,000 times in eight
// months, so the count in the line is the brief's own archetype, as a number.

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const chars = [...LINE].length;
const bytes = Buffer.byteLength(LINE, "utf8");
if (chars < 1 || chars > 140 || LINE.trim().length === 0) {
  throw new Error(
    `gate: entry is ${chars} chars (${bytes} bytes), must be 1-140 chars`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read back and verify: the file on disk must match the line byte for byte.
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("gate: entry.txt on disk does not match the line byte for byte");
}

console.log(`wrote entry.txt (${chars} chars, ${bytes} bytes)`);
