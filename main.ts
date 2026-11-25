// Worst Fix Ever: Funniest Commit Message — one-line commit message.
//
// The line: a deduplication fix that deleted every user twice.
// Specific (the users table), ironic (the repair is the disaster),
// real commit voice (a tired engineer typing "fix:" at 3 AM), and a
// fresh angle — no revert, no testing in production, no "broke
// everything". The punchline lands on the last word. Exactly 60 chars:
// short enough that a judge tie-break on bytes can only help.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const LINE =
  "fix: deduplicated the users table by deleting everyone twice";

function validateGate(text: string): void {
  if (text.length < 1 || text.length > 100) {
    throw new Error(`gate: entry must be 1-100 characters, got ${text.length}`);
  }
  if (Buffer.byteLength(text, "utf8") !== 60) {
    throw new Error(`gate: entry must be exactly 60 bytes, got ${Buffer.byteLength(text, "utf8")}`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r") || text.includes("\t")) {
    throw new Error("gate: entry must be a single line");
  }
}

async function main(): Promise<void> {
  validateGate(LINE);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, LINE, "utf8");
  const roundTrip = await readFile(outPath, "utf8");
  if (roundTrip !== LINE) {
    throw new Error("round-trip mismatch: file content differs from the entry");
  }
  console.log(`wrote ${LINE.length} chars to ${outPath}`);
}

await main();
