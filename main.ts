// One Word for the Boss — make.fun bounty
// u-swift-badger-44-one-word-for-the-boss-6b48c735
//
// Writes exactly one word for the boss to /output/entry.txt.
// The gate: exactly one word, 1-120 characters, a single non-blank line.
//
// Word choice: "Micromanager" — the classic one-word boss roast.
// It needs no setup and no punchline: every office worker reads it
// and instantly pictures the boss hovering over their shoulder,
// re-reading the email they just sent. Sharp, funny, one beat.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY = "Micromanager";

// Gate enforced before writing: the competition accepts only UTF-8 text
// of 1-120 characters, a single non-blank line — and this bounty asks for
// exactly ONE word, so the entry must contain no spaces or punctuation.
function validateEntry(text: string): void {
  if (text.trim().length === 0) throw new Error("entry is blank");
  if (text.length < 1 || text.length > 120) {
    throw new Error(`entry is ${text.length} chars, must be 1-120`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word (no whitespace)");
  }
  if (!/^[A-Za-z]+$/.test(text)) {
    throw new Error("entry must be a single alphabetic word");
  }
}

const OUT = process.env.OUTPUT_PATH ?? "/output/entry.txt";

validateEntry(ENTRY);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${OUT}`);
