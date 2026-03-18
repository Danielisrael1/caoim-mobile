export type ServiceCategory =
  | "worship"
  | "study"
  | "fellowship"
  | "prayer"
  | "outreach";

export type GeneratedServiceEvent = {
  id: string;
  title: string;
  description?: string;
  category: ServiceCategory;
  location: string;
  startAt: Date;
  endAt: Date;
};

const DEFAULT_LOCATION = "Omega Cathedral";

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function setTime(base: Date, hour24: number, minute: number) {
  const x = new Date(base);
  x.setHours(hour24, minute, 0, 0);
  return x;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isFriday(d: Date) {
  return d.getDay() === 5;
}

function getLastFridayOfMonth(anyDateInMonth: Date) {
  const year = anyDateInMonth.getFullYear();
  const month = anyDateInMonth.getMonth();
  const d = new Date(year, month + 1, 0);
  while (d.getDay() !== 5) d.setDate(d.getDate() - 1);
  return startOfDay(d);
}

function fridayIndexInMonth(d: Date) {
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
  const offsetToFriday = (5 - firstDay.getDay() + 7) % 7;
  const firstFridayDate = 1 + offsetToFriday;
  return Math.floor((d.getDate() - firstFridayDate) / 7) + 1;
}

function makeId(prefix: string, startAt: Date) {
  const y = startAt.getFullYear();
  const m = pad2(startAt.getMonth() + 1);
  const d = pad2(startAt.getDate());
  const hh = pad2(startAt.getHours());
  const mm = pad2(startAt.getMinutes());
  return `${prefix}_${y}${m}${d}_${hh}${mm}`;
}

type GenerateArgs = {
  from?: Date;
  daysAhead?: number;
  location?: string;
};

/**
 * Generates recurring CAOIM service events using the *device timezone*.
 *
 * Rules:
 * - Monday: Bible Study 6pm–9pm
 * - Wednesday: Deliverance Service 6pm–9pm
 * - Friday: Midnight Service 8pm–12am (first 3 Fridays)
 * - Last Friday: Overnight Service 8pm–5am (next day)
 * - Sunday: Morning 7–9, Main 9–2, Evening 5–7:30
 */
export function generateRecurringServices({
  from = new Date(),
  daysAhead = 60,
  location = DEFAULT_LOCATION,
}: GenerateArgs = {}): GeneratedServiceEvent[] {
  const out: GeneratedServiceEvent[] = [];
  const fromDay = startOfDay(from);
  const toDay = addDays(fromDay, daysAhead);

  for (let day = new Date(fromDay); day <= toDay; day = addDays(day, 1)) {
    const dow = day.getDay(); // 0 Sun .. 6 Sat

    // Monday — Bible Study — 6pm to 9pm
    if (dow === 1) {
      const startAt = setTime(day, 18, 0);
      const endAt = setTime(day, 21, 0);
      out.push({
        id: makeId("svc_biblestudy", startAt),
        title: "Bible Study",
        description: "Every Monday (6:00 PM – 9:00 PM).",
        category: "study",
        location,
        startAt,
        endAt,
      });
    }

    // Wednesday — Deliverance Service — 6pm to 9pm
    if (dow === 3) {
      const startAt = setTime(day, 18, 0);
      const endAt = setTime(day, 21, 0);
      out.push({
        id: makeId("svc_deliverance", startAt),
        title: "Deliverance Service",
        description: "Every Wednesday (6:00 PM – 9:00 PM).",
        category: "prayer",
        location,
        startAt,
        endAt,
      });
    }

    // Friday rules
    if (isFriday(day)) {
      const lastFriday = getLastFridayOfMonth(day);

      // Last Friday — Overnight Service — 8pm to 5am (next day)
      if (isSameDay(day, lastFriday)) {
        const startAt = setTime(day, 20, 0);
        const endAt = setTime(addDays(day, 1), 5, 0);
        out.push({
          id: makeId("svc_overnight", startAt),
          title: "Overnight Service",
          description: "Last Friday of the month (8:00 PM – 5:00 AM).",
          category: "prayer",
          location,
          startAt,
          endAt,
        });
      } else {
        // First three Fridays — Midnight Service — 8pm to 12am
        const idx = fridayIndexInMonth(day);
        if (idx >= 1 && idx <= 3) {
          const startAt = setTime(day, 20, 0);
          const endAt = setTime(addDays(day, 1), 0, 0);
          out.push({
            id: makeId("svc_midnight", startAt),
            title: "Midnight Service",
            description:
              "First three Fridays of the month (8:00 PM – 12:00 AM).",
            category: "prayer",
            location,
            startAt,
            endAt,
          });
        }
      }
    }

    // Sunday — Morning, Main, Evening
    if (dow === 0) {
      // Morning Service 7:00–9:00
      {
        const startAt = setTime(day, 7, 0);
        const endAt = setTime(day, 9, 0);
        out.push({
          id: makeId("svc_sun_morning", startAt),
          title: "Sunday Morning Service",
          description: "Every Sunday (7:00 AM – 9:00 AM).",
          category: "worship",
          location,
          startAt,
          endAt,
        });
      }

      // Main Service 9:00–14:00
      {
        const startAt = setTime(day, 9, 0);
        const endAt = setTime(day, 14, 0);
        out.push({
          id: makeId("svc_sun_main", startAt),
          title: "Sunday Main Service",
          description: "Every Sunday (9:00 AM – 2:00 PM).",
          category: "worship",
          location,
          startAt,
          endAt,
        });
      }

      // Evening Service 17:00–19:30
      {
        const startAt = setTime(day, 17, 0);
        const endAt = setTime(day, 19, 30);
        out.push({
          id: makeId("svc_sun_evening", startAt),
          title: "Sunday Evening Service",
          description: "Every Sunday (5:00 PM – 7:30 PM).",
          category: "worship",
          location,
          startAt,
          endAt,
        });
      }
    }
  }

  return out.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
}

function nextDateForDayOfWeek(from: Date, targetDow: number) {
  // from: any date/time in local/device timezone
  const start = new Date(from);
  // Normalize to start-of-day to avoid DST/minute drift
  start.setHours(0, 0, 0, 0);

  const currentDow = start.getDay();
  const delta = (targetDow - currentDow + 7) % 7;
  return addDays(start, delta);
}

function getNthFridayOfMonth(year: number, monthIndex0: number, n: number) {
  // monthIndex0: 0-11
  const firstDay = new Date(year, monthIndex0, 1);
  firstDay.setHours(0, 0, 0, 0);
  const offsetToFriday = (5 - firstDay.getDay() + 7) % 7;
  const firstFridayDate = 1 + offsetToFriday;
  return new Date(year, monthIndex0, firstFridayDate + 7 * (n - 1));
}

/**
 * Returns exactly ONE card per service: "the next occurrence" from now.
 * This keeps the Events tab from showing many cards for different dates.
 */
export function generateNextServiceOccurrences(
  from: Date = new Date(),
  location: string = DEFAULT_LOCATION,
): GeneratedServiceEvent[] {
  const out: GeneratedServiceEvent[] = [];

  // Monday — Bible Study
  {
    const day = nextDateForDayOfWeek(from, 1);
    const startAt = setTime(day, 18, 0);
    const endAt = setTime(day, 21, 0);
    out.push({
      id: makeId("svc_biblestudy", startAt),
      title: "Bible Study",
      description: "Every Monday (6:00 PM – 9:00 PM).",
      category: "study",
      location,
      startAt,
      endAt,
    });
  }

  // Wednesday — Deliverance Service
  {
    const day = nextDateForDayOfWeek(from, 3);
    const startAt = setTime(day, 18, 0);
    const endAt = setTime(day, 21, 0);
    out.push({
      id: makeId("svc_deliverance", startAt),
      title: "Deliverance Service",
      description: "Every Wednesday (6:00 PM – 9:00 PM).",
      category: "prayer",
      location,
      startAt,
      endAt,
    });
  }

  // Friday rules: next Friday could be overnight (last Friday) OR midnight (first 3 Fridays)
  {
    const nextFriday = nextDateForDayOfWeek(from, 5);
    const lastFriday = getLastFridayOfMonth(nextFriday);

    const year = nextFriday.getFullYear();
    const month = nextFriday.getMonth();

    if (isSameDay(nextFriday, lastFriday)) {
      // Overnight Service
      const startAt = setTime(nextFriday, 20, 0);
      const endAt = setTime(addDays(nextFriday, 1), 5, 0);
      out.push({
        id: makeId("svc_overnight", startAt),
        title: "Overnight Service",
        description: "Last Friday of the month (8:00 PM – 5:00 AM).",
        category: "prayer",
        location,
        startAt,
        endAt,
      });
    } else {
      // Determine if there's a qualifying midnight service on an upcoming Friday.
      // We pick the next Friday that is among the first three Fridays of its month.
      let chosen: Date | null = null;
      for (let i = 0; i < 8; i++) {
        const cand = addDays(nextFriday, i * 7);
        const candLastFriday = getLastFridayOfMonth(cand);
        if (isSameDay(cand, candLastFriday)) continue;

        const idx = fridayIndexInMonth(cand);
        if (idx >= 1 && idx <= 3) {
          chosen = cand;
          break;
        }
      }

      // Fallback: if somehow not found (unlikely), just use nextFriday.
      const day = chosen ?? nextFriday;
      const startAt = setTime(day, 20, 0);
      const endAt = setTime(addDays(day, 1), 0, 0);
      out.push({
        id: makeId("svc_midnight", startAt),
        title: "Midnight Service",
        description: "First three Fridays of the month (8:00 PM – 12:00 AM).",
        category: "prayer",
        location,
        startAt,
        endAt,
      });
    }
  }

  // Sunday — three services
  {
    const day = nextDateForDayOfWeek(from, 0);

    // Morning
    {
      const startAt = setTime(day, 7, 0);
      const endAt = setTime(day, 9, 0);
      out.push({
        id: makeId("svc_sun_morning", startAt),
        title: "Sunday Morning Service",
        description: "Every Sunday (7:00 AM – 9:00 AM).",
        category: "worship",
        location,
        startAt,
        endAt,
      });
    }

    // Main
    {
      const startAt = setTime(day, 9, 0);
      const endAt = setTime(day, 14, 0);
      out.push({
        id: makeId("svc_sun_main", startAt),
        title: "Sunday Main Service",
        description: "Every Sunday (9:00 AM – 2:00 PM).",
        category: "worship",
        location,
        startAt,
        endAt,
      });
    }

    // Evening
    {
      const startAt = setTime(day, 17, 0);
      const endAt = setTime(day, 19, 30);
      out.push({
        id: makeId("svc_sun_evening", startAt),
        title: "Sunday Evening Service",
        description: "Every Sunday (5:00 PM – 7:30 PM).",
        category: "worship",
        location,
        startAt,
        endAt,
      });
    }
  }

  // If any startAt is in the past (e.g. today is Monday 7pm and we produced 6pm), push it to the next week.
  // This makes the list reliably "upcoming".
  const now = from;
  const normalized = out.map((e) => {
    if (e.startAt.getTime() >= now.getTime()) return e;

    // add 7 days
    const startAt = addDays(e.startAt, 7);
    const endDeltaMs = e.endAt.getTime() - e.startAt.getTime();
    const endAt = new Date(startAt.getTime() + endDeltaMs);
    return {
      ...e,
      id: makeId(e.id.split("_")[0] ?? "svc", startAt),
      startAt,
      endAt,
    };
  });

  return normalized.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
}
