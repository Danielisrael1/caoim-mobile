#!/usr/bin/env node
/**
 * Download Full KJV Bible & Convert to App Format
 *
 * Uses the free, public-domain KJV text from https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/Books.json
 * and individual book files from the same repo.
 *
 * Output: constants/bible/data/kjv/*.json  (one file per book)
 *
 * Usage:  node scripts/download-bible.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ─── Book ID mapping (our IDs → GitHub repo file names) ────────────────
const BOOKS = [
  // Old Testament
  { id: "gen", file: "Genesis", chapters: 50 },
  { id: "exo", file: "Exodus", chapters: 40 },
  { id: "lev", file: "Leviticus", chapters: 27 },
  { id: "num", file: "Numbers", chapters: 36 },
  { id: "deu", file: "Deuteronomy", chapters: 34 },
  { id: "jos", file: "Joshua", chapters: 24 },
  { id: "jdg", file: "Judges", chapters: 21 },
  { id: "rut", file: "Ruth", chapters: 4 },
  { id: "1sa", file: "1Samuel", chapters: 31 },
  { id: "2sa", file: "2Samuel", chapters: 24 },
  { id: "1ki", file: "1Kings", chapters: 22 },
  { id: "2ki", file: "2Kings", chapters: 25 },
  { id: "1ch", file: "1Chronicles", chapters: 29 },
  { id: "2ch", file: "2Chronicles", chapters: 36 },
  { id: "ezr", file: "Ezra", chapters: 10 },
  { id: "neh", file: "Nehemiah", chapters: 13 },
  { id: "est", file: "Esther", chapters: 10 },
  { id: "job", file: "Job", chapters: 42 },
  { id: "psa", file: "Psalms", chapters: 150 },
  { id: "pro", file: "Proverbs", chapters: 31 },
  { id: "ecc", file: "Ecclesiastes", chapters: 12 },
  { id: "sng", file: "SongofSolomon", chapters: 8 },
  { id: "isa", file: "Isaiah", chapters: 66 },
  { id: "jer", file: "Jeremiah", chapters: 52 },
  { id: "lam", file: "Lamentations", chapters: 5 },
  { id: "ezk", file: "Ezekiel", chapters: 48 },
  { id: "dan", file: "Daniel", chapters: 12 },
  { id: "hos", file: "Hosea", chapters: 14 },
  { id: "jol", file: "Joel", chapters: 3 },
  { id: "amo", file: "Amos", chapters: 9 },
  { id: "oba", file: "Obadiah", chapters: 1 },
  { id: "jon", file: "Jonah", chapters: 4 },
  { id: "mic", file: "Micah", chapters: 7 },
  { id: "nah", file: "Nahum", chapters: 3 },
  { id: "hab", file: "Habakkuk", chapters: 3 },
  { id: "zep", file: "Zephaniah", chapters: 3 },
  { id: "hag", file: "Haggai", chapters: 2 },
  { id: "zec", file: "Zechariah", chapters: 14 },
  { id: "mal", file: "Malachi", chapters: 4 },
  // New Testament
  { id: "mat", file: "Matthew", chapters: 28 },
  { id: "mrk", file: "Mark", chapters: 16 },
  { id: "luk", file: "Luke", chapters: 24 },
  { id: "jhn", file: "John", chapters: 21 },
  { id: "act", file: "Acts", chapters: 28 },
  { id: "rom", file: "Romans", chapters: 16 },
  { id: "1co", file: "1Corinthians", chapters: 16 },
  { id: "2co", file: "2Corinthians", chapters: 13 },
  { id: "gal", file: "Galatians", chapters: 6 },
  { id: "eph", file: "Ephesians", chapters: 6 },
  { id: "php", file: "Philippians", chapters: 4 },
  { id: "col", file: "Colossians", chapters: 4 },
  { id: "1th", file: "1Thessalonians", chapters: 5 },
  { id: "2th", file: "2Thessalonians", chapters: 3 },
  { id: "1ti", file: "1Timothy", chapters: 6 },
  { id: "2ti", file: "2Timothy", chapters: 4 },
  { id: "tit", file: "Titus", chapters: 3 },
  { id: "phm", file: "Philemon", chapters: 1 },
  { id: "heb", file: "Hebrews", chapters: 13 },
  { id: "jas", file: "James", chapters: 5 },
  { id: "1pe", file: "1Peter", chapters: 5 },
  { id: "2pe", file: "2Peter", chapters: 3 },
  { id: "1jn", file: "1John", chapters: 5 },
  { id: "2jn", file: "2John", chapters: 1 },
  { id: "3jn", file: "3John", chapters: 1 },
  { id: "jud", file: "Jude", chapters: 1 },
  { id: "rev", file: "Revelation", chapters: 22 },
];

const BASE_URL = "https://raw.githubusercontent.com/aruljohn/Bible-kjv/master";

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const req = https
      .get(url, { timeout: 30000 }, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          return fetchJSON(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse JSON from ${url}: ${e.message}`));
          }
        });
      })
      .on("error", reject)
      .on("timeout", () => {
        req.destroy();
        reject(new Error("timeout"));
      });
  });
}

/** Retry wrapper */
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchJSON(url);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
}

/**
 * Convert the GitHub repo format into our app format.
 * Repo format: { "book": "Genesis", "chapters": [ { "chapter": 1, "verses": [ { "verse": 1, "text": "..." } ] } ] }
 * Our format:  { "1": [ { "verse": 1, "text": "..." } ], "2": [...] }
 */
function convertBook(rawData) {
  const result = {};
  for (const ch of rawData.chapters) {
    result[String(ch.chapter)] = ch.verses.map((v) => ({
      verse: v.verse,
      text: v.text,
    }));
  }
  return result;
}

async function main() {
  const outDir = path.join(
    __dirname,
    "..",
    "constants",
    "bible",
    "data",
    "kjv",
  );
  fs.mkdirSync(outDir, { recursive: true });

  let totalVerses = 0;
  let totalChapters = 0;

  for (let i = 0; i < BOOKS.length; i++) {
    const book = BOOKS[i];
    const outFile = path.join(outDir, `${book.id}.json`);

    // Skip if already downloaded
    if (fs.existsSync(outFile)) {
      const existing = JSON.parse(fs.readFileSync(outFile, "utf8"));
      const chapterCount = Object.keys(existing).length;
      if (chapterCount >= book.chapters) {
        const verseCount = Object.values(existing).reduce(
          (sum, ch) => sum + ch.length,
          0,
        );
        totalChapters += chapterCount;
        totalVerses += verseCount;
        console.log(
          `[${i + 1}/${BOOKS.length}] ${book.file} — already downloaded (${chapterCount} ch, ${verseCount} v)`,
        );
        continue;
      }
    }

    const encodedFile = encodeURIComponent(book.file);
    const url = `${BASE_URL}/${encodedFile}.json`;

    process.stdout.write(
      `[${i + 1}/${BOOKS.length}] Downloading ${book.file}...`,
    );

    try {
      const raw = await fetchWithRetry(url);
      const converted = convertBook(raw);

      const chapterCount = Object.keys(converted).length;
      const verseCount = Object.values(converted).reduce(
        (sum, ch) => sum + ch.length,
        0,
      );
      totalChapters += chapterCount;
      totalVerses += verseCount;

      const outFile = path.join(outDir, `${book.id}.json`);
      fs.writeFileSync(outFile, JSON.stringify(converted));

      console.log(` ✓ ${chapterCount} chapters, ${verseCount} verses`);
    } catch (err) {
      console.log(` ✗ ERROR: ${err.message}`);
    }

    // Delay between requests
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n✅ Done! ${totalChapters} chapters, ${totalVerses} verses`);
  console.log(`   Files saved to: ${outDir}`);

  // Generate the index/loader file
  generateLoaderFile(outDir);
}

function generateLoaderFile(dataDir) {
  const loaderPath = path.join(
    __dirname,
    "..",
    "constants",
    "bible",
    "data",
    "kjv",
    "index.ts",
  );

  const imports = BOOKS.map(
    (b) => `import _${b.id}Data from "./${b.id}.json";`,
  ).join("\n");

  const entries = BOOKS.map((b) => `  "${b.id}": _${b.id}Data`).join(",\n");

  const content = `/**
 * KJV Bible Data — Complete (auto-generated)
 * 66 books · 1,189 chapters · 31,102 verses
 * Public domain — King James Version
 */
import { BibleChapter } from "../../types";

${imports}

type BookData = { [chapter: string]: BibleChapter };

export const KJV_DATA: { [bookId: string]: BookData } = {
${entries},
};
`;

  fs.writeFileSync(loaderPath, content);
  console.log(`   Generated loader: ${loaderPath}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
