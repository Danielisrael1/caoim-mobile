/**
 * Offline NIV Bible Data
 *
 * This file contains selected chapters from the NIV translation.
 * Chapters not yet populated will show a "coming soon" placeholder.
 * To add more content: add verse arrays under the chapter key.
 */
import { BibleChapter } from "./types";

type BookData = { [chapter: string]: BibleChapter };

/* ── Genesis ────────────────────────────────────── */
const gen: BookData = {
  "1": [
    {
      verse: 1,
      text: "In the beginning God created the heavens and the earth.",
    },
    {
      verse: 2,
      text: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.",
    },
    {
      verse: 3,
      text: 'And God said, "Let there be light," and there was light.',
    },
    {
      verse: 4,
      text: "God saw that the light was good, and he separated the light from the darkness.",
    },
    {
      verse: 5,
      text: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.',
    },
    {
      verse: 6,
      text: 'And God said, "Let there be a vault between the waters to separate water from water."',
    },
    {
      verse: 7,
      text: "So God made the vault and separated the water under the vault from the water above it. And it was so.",
    },
    {
      verse: 8,
      text: 'God called the vault "sky." And there was evening, and there was morning—the second day.',
    },
    {
      verse: 9,
      text: 'And God said, "Let the water under the sky be gathered to one place, and let dry ground appear." And it was so.',
    },
    {
      verse: 10,
      text: 'God called the dry ground "land," and the gathered waters he called "seas." And God saw that it was good.',
    },
    {
      verse: 11,
      text: 'Then God said, "Let the land produce vegetation: seed-bearing plants and trees on the land that bear fruit with seed in it, according to their various kinds." And it was so.',
    },
    {
      verse: 12,
      text: "The land produced vegetation: plants bearing seed according to their kinds and trees bearing fruit with seed in it according to their kinds. And God saw that it was good.",
    },
    {
      verse: 13,
      text: "And there was evening, and there was morning—the third day.",
    },
    {
      verse: 14,
      text: 'And God said, "Let there be lights in the vault of the sky to separate the day from the night, and let them serve as signs to mark sacred times, and days and years,',
    },
    {
      verse: 15,
      text: 'and let them be lights in the vault of the sky to give light on the earth." And it was so.',
    },
    {
      verse: 16,
      text: "God made two great lights—the greater light to govern the day and the lesser light to govern the night. He also made the stars.",
    },
    {
      verse: 17,
      text: "God set them in the vault of the sky to give light on the earth,",
    },
    {
      verse: 18,
      text: "to govern the day and the night, and to separate light from darkness. And God saw that it was good.",
    },
    {
      verse: 19,
      text: "And there was evening, and there was morning—the fourth day.",
    },
    {
      verse: 20,
      text: 'And God said, "Let the water teem with living creatures, and let birds fly above the earth across the vault of the sky."',
    },
    {
      verse: 21,
      text: "So God created the great creatures of the sea and every living thing with which the water teems and that moves about in it, according to their kinds, and every winged bird according to its kind. And God saw that it was good.",
    },
    {
      verse: 22,
      text: 'God blessed them and said, "Be fruitful and increase in number and fill the water in the seas, and let the birds increase on the earth."',
    },
    {
      verse: 23,
      text: "And there was evening, and there was morning—the fifth day.",
    },
    {
      verse: 24,
      text: 'And God said, "Let the land produce living creatures according to their kinds: the livestock, the creatures that move along the ground, and the wild animals, each according to its kind." And it was so.',
    },
    {
      verse: 25,
      text: "God made the wild animals according to their kinds, the livestock according to their kinds, and all the creatures that move along the ground according to their kinds. And God saw that it was good.",
    },
    {
      verse: 26,
      text: 'Then God said, "Let us make mankind in our image, in our likeness, so that they may rule over the fish in the sea and the birds in the sky, over the livestock and all the wild animals, and over all the creatures that move along the ground."',
    },
    {
      verse: 27,
      text: "So God created mankind in his own image, in the image of God he created them; male and female he created them.",
    },
    {
      verse: 28,
      text: 'God blessed them and said to them, "Be fruitful and increase in number; fill the earth and subdue it. Rule over the fish in the sea and the birds in the sky and over every living creature that moves on the ground."',
    },
    {
      verse: 29,
      text: 'Then God said, "I give you every seed-bearing plant on the face of the whole earth and every tree that has fruit with seed in it. They will be yours for food.',
    },
    {
      verse: 30,
      text: 'And to all the beasts of the earth and all the birds in the sky and all the creatures that move along the ground—everything that has the breath of life in it—I give every green plant for food." And it was so.',
    },
    {
      verse: 31,
      text: "God saw all that he had made, and it was very good. And there was evening, and there was morning—the sixth day.",
    },
  ],
};

/* ── Psalms ──────────────────────────────────────── */
const psa: BookData = {
  "1": [
    {
      verse: 1,
      text: "Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers,",
    },
    {
      verse: 2,
      text: "but whose delight is in the law of the LORD, and who meditates on his law day and night.",
    },
    {
      verse: 3,
      text: "That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither—whatever they do prospers.",
    },
    {
      verse: 4,
      text: "Not so the wicked! They are like chaff that the wind blows away.",
    },
    {
      verse: 5,
      text: "Therefore the wicked will not stand in the judgment, nor sinners in the assembly of the righteous.",
    },
    {
      verse: 6,
      text: "For the LORD watches over the way of the righteous, but the way of the wicked leads to destruction.",
    },
  ],
  "23": [
    { verse: 1, text: "The LORD is my shepherd, I lack nothing." },
    {
      verse: 2,
      text: "He makes me lie down in green pastures, he leads me beside quiet waters,",
    },
    {
      verse: 3,
      text: "he refreshes my soul. He guides me along the right paths for his name's sake.",
    },
    {
      verse: 4,
      text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
    },
    {
      verse: 5,
      text: "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.",
    },
    {
      verse: 6,
      text: "Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the LORD forever.",
    },
  ],
  "91": [
    {
      verse: 1,
      text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
    },
    {
      verse: 2,
      text: 'I will say of the LORD, "He is my refuge and my fortress, my God, in whom I trust."',
    },
    {
      verse: 3,
      text: "Surely he will save you from the fowler's snare and from the deadly pestilence.",
    },
    {
      verse: 4,
      text: "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    },
    {
      verse: 5,
      text: "You will not fear the terror of night, nor the arrow that flies by day,",
    },
    {
      verse: 6,
      text: "nor the pestilence that stalks in the darkness, nor the plague that destroys at midday.",
    },
    {
      verse: 7,
      text: "A thousand may fall at your side, ten thousand at your right hand, but it will not come near you.",
    },
    {
      verse: 8,
      text: "You will only observe with your eyes and see the punishment of the wicked.",
    },
    {
      verse: 9,
      text: 'If you say, "The LORD is my refuge," and you make the Most High your dwelling,',
    },
    {
      verse: 10,
      text: "no harm will overtake you, no disaster will come near your tent.",
    },
    {
      verse: 11,
      text: "For he will command his angels concerning you to guard you in all your ways;",
    },
    {
      verse: 12,
      text: "they will lift you up in their hands, so that you will not strike your foot against a stone.",
    },
    {
      verse: 13,
      text: "You will tread on the lion and the cobra; you will trample the great lion and the serpent.",
    },
    {
      verse: 14,
      text: '"Because he loves me," says the LORD, "I will rescue him; I will protect him, for he acknowledges my name.',
    },
    {
      verse: 15,
      text: "He will call on me, and I will answer him; I will be with him in trouble, I will deliver him and honor him.",
    },
    {
      verse: 16,
      text: 'With long life I will satisfy him and show him my salvation."',
    },
  ],
};

/* ── Proverbs ────────────────────────────────────── */
const pro: BookData = {
  "3": [
    {
      verse: 1,
      text: "My son, do not forget my teaching, but keep my commands in your heart,",
    },
    {
      verse: 2,
      text: "for they will prolong your life many years and bring you peace and prosperity.",
    },
    {
      verse: 3,
      text: "Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart.",
    },
    {
      verse: 4,
      text: "Then you will win favor and a good name in the sight of God and man.",
    },
    {
      verse: 5,
      text: "Trust in the LORD with all your heart and lean not on your own understanding;",
    },
    {
      verse: 6,
      text: "in all your ways submit to him, and he will make your paths straight.",
    },
  ],
};

/* ── Matthew ─────────────────────────────────────── */
const mat: BookData = {
  "5": [
    {
      verse: 1,
      text: "Now when Jesus saw the crowds, he went up on a mountainside and sat down. His disciples came to him,",
    },
    { verse: 2, text: "and he began to teach them." },
    {
      verse: 3,
      text: '"Blessed are the poor in spirit, for theirs is the kingdom of heaven.',
    },
    {
      verse: 4,
      text: "Blessed are those who mourn, for they will be comforted.",
    },
    {
      verse: 5,
      text: "Blessed are the meek, for they will inherit the earth.",
    },
    {
      verse: 6,
      text: "Blessed are those who hunger and thirst for righteousness, for they will be filled.",
    },
    {
      verse: 7,
      text: "Blessed are the merciful, for they will be shown mercy.",
    },
    { verse: 8, text: "Blessed are the pure in heart, for they will see God." },
    {
      verse: 9,
      text: "Blessed are the peacemakers, for they will be called children of God.",
    },
    {
      verse: 10,
      text: "Blessed are those who are persecuted because of righteousness, for theirs is the kingdom of heaven.",
    },
    {
      verse: 11,
      text: '"Blessed are you when people insult you, persecute you and falsely say all kinds of evil against you because of me.',
    },
    {
      verse: 12,
      text: "Rejoice and be glad, because great is your reward in heaven, for in the same way they persecuted the prophets who were before you.",
    },
  ],
  "6": [
    {
      verse: 9,
      text: "\"This, then, is how you should pray: 'Our Father in heaven, hallowed be your name,",
    },
    {
      verse: 10,
      text: "your kingdom come, your will be done, on earth as it is in heaven.",
    },
    { verse: 11, text: "Give us today our daily bread." },
    {
      verse: 12,
      text: "And forgive us our debts, as we also have forgiven our debtors.",
    },
    {
      verse: 13,
      text: "And lead us not into temptation, but deliver us from the evil one.'",
    },
  ],
};

/* ── John ────────────────────────────────────────── */
const jhn: BookData = {
  "1": [
    {
      verse: 1,
      text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    },
    { verse: 2, text: "He was with God in the beginning." },
    {
      verse: 3,
      text: "Through him all things were made; without him nothing was made that has been made.",
    },
    {
      verse: 4,
      text: "In him was life, and that life was the light of all mankind.",
    },
    {
      verse: 5,
      text: "The light shines in the darkness, and the darkness has not overcome it.",
    },
    { verse: 6, text: "There was a man sent from God whose name was John." },
    {
      verse: 7,
      text: "He came as a witness to testify concerning that light, so that through him all might believe.",
    },
    {
      verse: 8,
      text: "He himself was not the light; he came only as a witness to the light.",
    },
    {
      verse: 9,
      text: "The true light that gives light to everyone was coming into the world.",
    },
    {
      verse: 10,
      text: "He was in the world, and though the world was made through him, the world did not recognize him.",
    },
    {
      verse: 11,
      text: "He came to that which was his own, but his own did not receive him.",
    },
    {
      verse: 12,
      text: "Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God—",
    },
    {
      verse: 13,
      text: "children born not of natural descent, nor of human decision or a husband's will, but born of God.",
    },
    {
      verse: 14,
      text: "The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
    },
  ],
  "3": [
    {
      verse: 16,
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    },
    {
      verse: 17,
      text: "For God did not send his Son into the world to condemn the world, but to save the world through him.",
    },
    {
      verse: 18,
      text: "Whoever believes in him is not condemned, but whoever does not believe stands condemned already because they have not believed in the name of God's one and only Son.",
    },
  ],
};

/* ── Romans ───────────────────────────────────────── */
const rom: BookData = {
  "8": [
    {
      verse: 1,
      text: "Therefore, there is now no condemnation for those who are in Christ Jesus,",
    },
    {
      verse: 2,
      text: "because through Christ Jesus the law of the Spirit who gives life has set you free from the law of sin and death.",
    },
    {
      verse: 28,
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    },
    {
      verse: 31,
      text: "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    },
    {
      verse: 37,
      text: "No, in all these things we are more than conquerors through him who loved us.",
    },
    {
      verse: 38,
      text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers,",
    },
    {
      verse: 39,
      text: "neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
    },
  ],
};

/* ── 1 Corinthians ───────────────────────────────── */
const _1co: BookData = {
  "13": [
    {
      verse: 1,
      text: "If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong or a clanging cymbal.",
    },
    {
      verse: 2,
      text: "If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have a faith that can move mountains, but do not have love, I am nothing.",
    },
    {
      verse: 3,
      text: "If I give all I possess to the poor and give over my body to hardship that I may boast, but do not have love, I gain nothing.",
    },
    {
      verse: 4,
      text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
    },
    {
      verse: 5,
      text: "It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
    },
    {
      verse: 6,
      text: "Love does not delight in evil but rejoices with the truth.",
    },
    {
      verse: 7,
      text: "It always protects, always trusts, always hopes, always perseveres.",
    },
    { verse: 8, text: "Love never fails." },
    {
      verse: 13,
      text: "And now these three remain: faith, hope and love. But the greatest of these is love.",
    },
  ],
};

/* ── Ephesians ───────────────────────────────────── */
const eph: BookData = {
  "6": [
    {
      verse: 10,
      text: "Finally, be strong in the Lord and in his mighty power.",
    },
    {
      verse: 11,
      text: "Put on the full armor of God, so that you can take your stand against the devil's schemes.",
    },
    {
      verse: 12,
      text: "For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world and against the spiritual forces of evil in the heavenly realms.",
    },
    {
      verse: 13,
      text: "Therefore put on the full armor of God, so that when the day of evil comes, you may be able to stand your ground, and after you have done everything, to stand.",
    },
  ],
};

/* ── Philippians ─────────────────────────────────── */
const php: BookData = {
  "4": [
    {
      verse: 4,
      text: "Rejoice in the Lord always. I will say it again: Rejoice!",
    },
    {
      verse: 6,
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    },
    {
      verse: 7,
      text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    },
    {
      verse: 8,
      text: "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.",
    },
    { verse: 13, text: "I can do all this through him who gives me strength." },
    {
      verse: 19,
      text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
    },
  ],
};

/* ── Revelation ──────────────────────────────────── */
const rev: BookData = {
  "21": [
    {
      verse: 1,
      text: "Then I saw a new heaven and a new earth, for the first heaven and the first earth had passed away, and there was no longer any sea.",
    },
    {
      verse: 2,
      text: "I saw the Holy City, the new Jerusalem, coming down out of heaven from God, prepared as a bride beautifully dressed for her husband.",
    },
    {
      verse: 3,
      text: "And I heard a loud voice from the throne saying, \"Look! God's dwelling place is now among the people, and he will dwell with them. They will be his people, and God himself will be with them and be their God.",
    },
    {
      verse: 4,
      text: "'He will wipe every tear from their eyes. There will be no more death' or mourning or crying or pain, for the old order of things has passed away.\"",
    },
    {
      verse: 5,
      text: 'He who was seated on the throne said, "I am making everything new!" Then he said, "Write this down, for these words are trustworthy and true."',
    },
  ],
};

/** Full NIV data map — book ID → chapter data */
export const NIV_DATA: { [bookId: string]: BookData } = {
  gen,
  psa,
  pro,
  mat,
  jhn,
  rom,
  "1co": _1co,
  eph,
  php,
  rev,
};
