/**
 * Offline NKJV Bible Data — selected chapters
 */
import { BibleChapter } from "./types";

type BookData = { [chapter: string]: BibleChapter };

const gen: BookData = {
  "1": [
    {
      verse: 1,
      text: "In the beginning God created the heavens and the earth.",
    },
    {
      verse: 2,
      text: "The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters.",
    },
    {
      verse: 3,
      text: 'Then God said, "Let there be light"; and there was light.',
    },
    {
      verse: 4,
      text: "And God saw the light, that it was good; and God divided the light from the darkness.",
    },
    {
      verse: 5,
      text: "God called the light Day, and the darkness He called Night. So the evening and the morning were the first day.",
    },
    {
      verse: 6,
      text: 'Then God said, "Let there be a firmament in the midst of the waters, and let it divide the waters from the waters."',
    },
    {
      verse: 7,
      text: "Thus God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament; and it was so.",
    },
    {
      verse: 8,
      text: "And God called the firmament Heaven. So the evening and the morning were the second day.",
    },
    {
      verse: 26,
      text: 'Then God said, "Let Us make man in Our image, according to Our likeness; let them have dominion over the fish of the sea, over the birds of the air, and over the cattle, over all the earth and over every creeping thing that creeps on the earth."',
    },
    {
      verse: 27,
      text: "So God created man in His own image; in the image of God He created him; male and female He created them.",
    },
    {
      verse: 31,
      text: "Then God saw everything that He had made, and indeed it was very good. So the evening and the morning were the sixth day.",
    },
  ],
};

const psa: BookData = {
  "23": [
    { verse: 1, text: "The LORD is my shepherd; I shall not want." },
    {
      verse: 2,
      text: "He makes me to lie down in green pastures; He leads me beside the still waters.",
    },
    {
      verse: 3,
      text: "He restores my soul; He leads me in the paths of righteousness for His name's sake.",
    },
    {
      verse: 4,
      text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil; for You are with me; Your rod and Your staff, they comfort me.",
    },
    {
      verse: 5,
      text: "You prepare a table before me in the presence of my enemies; You anoint my head with oil; my cup runs over.",
    },
    {
      verse: 6,
      text: "Surely goodness and mercy shall follow me all the days of my life; and I will dwell in the house of the LORD forever.",
    },
  ],
};

const jhn: BookData = {
  "1": [
    {
      verse: 1,
      text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    },
    { verse: 2, text: "He was in the beginning with God." },
    {
      verse: 3,
      text: "All things were made through Him, and without Him nothing was made that was made.",
    },
    { verse: 4, text: "In Him was life, and the life was the light of men." },
    {
      verse: 5,
      text: "And the light shines in the darkness, and the darkness did not comprehend it.",
    },
    {
      verse: 14,
      text: "And the Word became flesh and dwelt among us, and we beheld His glory, the glory as of the only begotten of the Father, full of grace and truth.",
    },
  ],
  "3": [
    {
      verse: 16,
      text: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
    },
    {
      verse: 17,
      text: "For God did not send His Son into the world to condemn the world, but that the world through Him might be saved.",
    },
  ],
};

const rom: BookData = {
  "8": [
    {
      verse: 1,
      text: "There is therefore now no condemnation to those who are in Christ Jesus, who do not walk according to the flesh, but according to the Spirit.",
    },
    {
      verse: 28,
      text: "And we know that all things work together for good to those who love God, to those who are the called according to His purpose.",
    },
    {
      verse: 31,
      text: "What then shall we say to these things? If God is for us, who can be against us?",
    },
    {
      verse: 37,
      text: "Yet in all these things we are more than conquerors through Him who loved us.",
    },
    {
      verse: 38,
      text: "For I am persuaded that neither death nor life, nor angels nor principalities nor powers, nor things present nor things to come,",
    },
    {
      verse: 39,
      text: "nor height nor depth, nor any other created thing, shall be able to separate us from the love of God which is in Christ Jesus our Lord.",
    },
  ],
};

export const NKJV_DATA: { [bookId: string]: BookData } = {
  gen,
  psa,
  jhn,
  rom,
};
