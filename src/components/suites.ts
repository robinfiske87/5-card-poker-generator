const suites = ["C", "D", "H", "S"];

const heartsMap = new Map([
  ["2", "🂢"],
  ["3", "🂣"],
  ["4", "🂤"],
  ["5", "🂥"],
  ["6", "🂦"],
  ["7", "🂧"],
  ["8", "🂨"],
  ["9", "🂩"],
  ["T", "🂪"],
  ["J", "🂫"],
  ["Q", "🂭"],
  ["K", "🂮"],
  ["A", "🂡"],
]);

const diamondsMap = new Map([
  ["2", "🂢"],
  ["3", "🃃"],
  ["4", "🃄"],
  ["5", "🃅"],
  ["6", "🃆"],
  ["7", "🃇"],
  ["8", "🃈"],
  ["9", "🃉"],
  ["T", "🃊"],
  ["J", "🃋"],
  ["Q", "🃍"],
  ["K", "🃎"],
  ["A", "🃁"],
]);

const spadesMap = new Map([
  ["2", "🂢"],
  ["3", "🂣"],
  ["4", "🂤"],
  ["5", "🂥"],
  ["6", "🂦"],
  ["7", "🂧"],
  ["8", "🂨"],
  ["9", "🂩"],
  ["T", "🂪"],
  ["J", "🂫"],
  ["Q", "🂭"],
  ["K", "🂮"],
  ["A", "🂡"],
]);

const clubsMap = new Map([
  ["2", "🃒"],
  ["3", "🃓"],
  ["4", "🃔"],
  ["5", "🃕"],
  ["6", "🃖"],
  ["7", "🃗"],
  ["8", "🃘"],
  ["9", "🃙"],
  ["T", "🃚"],
  ["J", "🃛"],
  ["Q", "🃝"],
  ["K", "🃞"],
  ["A", "🃑"],
]);

function getCharacterMapBySuite(suite: string) {
  switch (suite) {
    case "D":
      return diamondsMap;
    case "S":
      return spadesMap;
    case "C":
      return clubsMap;
    case "H":
    default:
      return heartsMap;
  }
}

export { suites, getCharacterMapBySuite };
