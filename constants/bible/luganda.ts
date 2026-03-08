/**
 * Offline Luganda Bible Data — selected chapters
 * Luganda translation of key scripture passages
 */
import { BibleChapter } from "./types";

type BookData = { [chapter: string]: BibleChapter };

const gen: BookData = {
  "1": [
    { verse: 1, text: "Ku lubereberye Katonda yatonda eggulu n'ensi." },
    {
      verse: 2,
      text: "Ensi yali terina kifaananyi era nga njereere; ekizikiza kyali ku maaso g'obuziba; era Omwoyo gwa Katonda gwali gutuula ku maaso g'amazzi.",
    },
    {
      verse: 3,
      text: 'Awo Katonda n\'ayogera nti, "Wabeerewo ekitangaala"; ne wabeera ekitangaala.',
    },
    {
      verse: 4,
      text: "Katonda n'alaba ekitangaala nti kirungi; Katonda n'ayawula ekitangaala n'ekizikiza.",
    },
    {
      verse: 5,
      text: "Katonda n'ayita ekitangaala nti Emisana, n'ekizikiza n'akiyita Ekiro. Ne wabeerawo akawungeezi, ne wabeerawo enkya; olunaku olw'olubereberye.",
    },
    {
      verse: 27,
      text: "Awo Katonda n'atonda omuntu mu kifaananyi kye, mu kifaananyi kya Katonda n'amutonda; omusajja n'omukazi n'abatonda.",
    },
    {
      verse: 31,
      text: "Katonda n'alaba byonna bye yakola, era, laba, byali birungi nnyo. Ne wabeerawo akawungeezi, ne wabeerawo enkya; olunaku olw'omukaaga.",
    },
  ],
};

const psa: BookData = {
  "23": [
    { verse: 1, text: "Mukama ye musumba wange; siribeera na kwetaaga." },
    {
      verse: 2,
      text: "Angalamiza mu malundiro ag'omuddo; antwalira ku mazzi ag'emirembe.",
    },
    {
      verse: 3,
      text: "Azzawo emmeeme yange; antwekyusa mu makubo ag'obutuukirivu olw'erinnya lye.",
    },
    {
      verse: 4,
      text: "Weewaawo ne ntambulira mu kiwonvu eky'ekisiikirize eky'okufa, siitya kibi: kubanga ggwe oli nange; omuggo gwo n'omuti gwo bye binziriza.",
    },
    {
      verse: 5,
      text: "Ontegekera emmeeza mu maaso g'abalabe bange; ofukidde omutwe gwange amafuta; ekikompe kyange kiyiika.",
    },
    {
      verse: 6,
      text: "Mazima ebirungi n'okusaasira binandiyanga ennaku zonna ez'obulamu bwange; era nnaabeeranga mu nnyumba ya Mukama ennaku zonna.",
    },
  ],
};

const jhn: BookData = {
  "1": [
    {
      verse: 1,
      text: "Ku lubereberye waaliwo Ekigambo, era Ekigambo kyali ne Katonda, era Ekigambo yali Katonda.",
    },
    { verse: 2, text: "Oyo yali ne Katonda ku lubereberye." },
    {
      verse: 3,
      text: "Ebintu byonna byakolebwa ku lulwe; so tewaali kintu na kimu ekyakolebwa wataali ye.",
    },
    {
      verse: 4,
      text: "Mu ye mwalimu obulamu; n'obulamu bwali ekitangaala ky'abantu.",
    },
    {
      verse: 5,
      text: "N'ekitangaala kyaka mu kizikiza; n'ekizikiza tekiyinza kukikoma.",
    },
    {
      verse: 14,
      text: "Ekigambo ne kifuuka omubiri, ne kibeera mu ffe, ne tulaba ekitiibwa kye, ekitiibwa ng'eky'Omwana eyazaalibwa omu ow'obw'omu bwa Kitaawe, ng'ajjudde ekisa n'amazima.",
    },
  ],
  "3": [
    {
      verse: 16,
      text: "Kubanga Katonda bwe yayagala ensi bwe yatyo, n'awaayo Omwana we eyazaalibwa omu, buli amukkiriza aleme okuzikirira, naye abeere n'obulamu obutaggwaawo.",
    },
    {
      verse: 17,
      text: "Kubanga Katonda teyasindika Mwana we mu nsi kusala ensi omusango, wabula ensi erokolebwe ku lulwe.",
    },
  ],
};

const rom: BookData = {
  "8": [
    {
      verse: 1,
      text: "Noolwekyo kaakano tewali kusalirizibwa kw'abo abali mu Kristo Yesu.",
    },
    {
      verse: 28,
      text: "Era tumanyi nti ebintu byonna byakola wamu okugasa abo abaagala Katonda, be bayitibwa ng'okwoagala kwe bwe kuli.",
    },
    {
      verse: 31,
      text: "Kale tuligamba tutya ku bintu bino? Katonda bw'aba ku lwaffe, ani alitulwanyisa?",
    },
    {
      verse: 37,
      text: "Naye mu bintu bino byonna tuwangula nnyo ku lw'oyo eyatwagala.",
    },
    {
      verse: 38,
      text: "Kubanga nkakasa nti newakubadde okufa, newakubadde obulamu, newakubadde bamalayika, newakubadde abafuzi, newakubadde ebintu ebiriwo, newakubadde ebintu ebigenda okujja, newakubadde amaanyi,",
    },
    {
      verse: 39,
      text: "newakubadde obugulumivu, newakubadde obuwanvu, newakubadde ekintu kirala kyonna ekyatondebwa, tebirina buyinza kutwawula n'okwagala kwa Katonda okuli mu Kristo Yesu Mukama waffe.",
    },
  ],
};

export const LUGANDA_DATA: { [bookId: string]: BookData } = {
  gen,
  psa,
  jhn,
  rom,
};
