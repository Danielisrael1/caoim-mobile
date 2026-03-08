/**
 * Offline Bible Service
 * Provides verse lookup across KJV (complete), NIV, NKJV, and Luganda.
 * All data is bundled in the app — no network required.
 *
 * KJV: Complete — 66 books, 1,189 chapters, 31,102 verses (public domain)
 * NIV / NKJV / Luganda: Partial samples (selected chapters only)
 */
import { BIBLE_BOOKS_META } from "./books";
import { getKjvChapter } from "./data/kjv";
import { LUGANDA_DATA } from "./luganda";
import { NIV_DATA } from "./niv";
import { NKJV_DATA } from "./nkjv";
import { BibleChapter, BibleVersionId, BookMeta } from "./types";

/** Partial version data registry (NIV, NKJV, Luganda — sample chapters only) */
const PARTIAL_VERSION_DATA: Record<
  string,
  { [bookId: string]: { [chapter: string]: BibleChapter } }
> = {
  niv: NIV_DATA,
  nkjv: NKJV_DATA,
  luganda: LUGANDA_DATA,
};

/** Version display info */
export const BIBLE_VERSIONS: {
  id: BibleVersionId;
  label: string;
  description: string;
  isComplete: boolean;
}[] = [
  {
    id: "kjv",
    label: "KJV",
    description: "King James Version",
    isComplete: true,
  },
  {
    id: "niv",
    label: "NIV",
    description: "New International Version",
    isComplete: false,
  },
  {
    id: "nkjv",
    label: "NKJV",
    description: "New King James Version",
    isComplete: false,
  },
  {
    id: "luganda",
    label: "Luganda",
    description: "Oluganda Bible",
    isComplete: false,
  },
];

/** Get all book metadata */
export function getBooks(testament?: "old" | "new"): BookMeta[] {
  if (!testament) return BIBLE_BOOKS_META;
  return BIBLE_BOOKS_META.filter((b) => b.testament === testament);
}

/** Get a specific book's metadata */
export function getBook(bookId: string): BookMeta | undefined {
  return BIBLE_BOOKS_META.find((b) => b.id === bookId);
}

/** Get chapter text for a book/chapter/version.
 *  Returns null if chapter data is not available for that version. */
export function getChapter(
  version: BibleVersionId,
  bookId: string,
  chapter: number,
): BibleChapter | null {
  // KJV — complete Bible, use the optimised on-demand loader
  if (version === "kjv") {
    return getKjvChapter(bookId, chapter);
  }

  // Other versions — partial data
  const versionData = PARTIAL_VERSION_DATA[version];
  if (!versionData) return null;
  const bookData = versionData[bookId];
  if (!bookData) return null;
  return bookData[String(chapter)] ?? null;
}

/** Check if a chapter exists for a given version */
export function hasChapter(
  version: BibleVersionId,
  bookId: string,
  chapter: number,
): boolean {
  return getChapter(version, bookId, chapter) !== null;
}

/** Get list of available chapters for a book in a version */
export function getAvailableChapters(
  version: BibleVersionId,
  bookId: string,
): number[] {
  if (version === "kjv") {
    // KJV is complete — return all chapters for the book
    const book = getBook(bookId);
    if (!book) return [];
    return Array.from({ length: book.chapters }, (_, i) => i + 1);
  }

  // Partial versions
  const versionData = PARTIAL_VERSION_DATA[version];
  if (!versionData || !versionData[bookId]) return [];
  return Object.keys(versionData[bookId])
    .map(Number)
    .sort((a, b) => a - b);
}

/** Check if a version has complete data for all books */
export function isVersionComplete(version: BibleVersionId): boolean {
  return BIBLE_VERSIONS.find((v) => v.id === version)?.isComplete ?? false;
}

// Re-export types
export type { BibleChapter, BibleVersionId, BookMeta };
