/** A single verse */
export interface BibleVerse {
  verse: number;
  text: string;
}

/** A chapter is just an array of verses */
export type BibleChapter = BibleVerse[];

/** A book maps chapter number (1-based string key) to its verses */
export interface BibleBook {
  name: string;
  abbrev: string;
  chapters: { [chapter: string]: BibleChapter };
}

/** A complete Bible version maps book ID to its data */
export interface BibleVersion {
  id: string;
  name: string;
  language: string;
  books: { [bookId: string]: BibleBook };
}

/** Supported version IDs */
export type BibleVersionId = "kjv" | "niv" | "nkjv" | "luganda";

/** Book metadata for the list screen */
export interface BookMeta {
  id: string;
  name: string;
  chapters: number;
  testament: "old" | "new";
}
