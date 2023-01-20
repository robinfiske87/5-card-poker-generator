export const sortHands = (a: Hand, b: Hand) => {
  if (a.evalVal !== b.evalVal) {
    return b.evalVal - a.evalVal;
  }
  const aHand = a.hand.split(",");
  const bHand = b.hand.split(",");
  for (let i = 0; i < aHand.length; i++) {
    if (getCardValue(aHand[i] as string) !== getCardValue(bHand[i] as string)) {
      return (
        getCardValue(bHand[i] as string) - getCardValue(aHand[i] as string)
      );
    }
  }
  return 0;
};

export const getCardValue = (card: string) => {
  const cardValue = card[0];
  switch (cardValue) {
    case "T":
      return 10;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      return parseInt(cardValue as string);
  }
};

const rank = {
  "Royal Flush": 10,
  "Straight Flush": 9,
  "Four of a Kind": 8,
  "Full House": 7,
  Flush: 6,
  Straight: 5,
  "Three of a Kind": 4,
  "Two Pairs": 3,
  Pair: 2,
  "High Card": 1,
};

export function rankHand(evaluation: keyof typeof rank): number {
  return rank[evaluation];
}

export function analyzeHand(hand: string[]): string {
    const handRanks = hand.map((card) => card[0]);
    const handSuits = hand.map((card) => card[1]);

    // Check for flush
    const isFlush = handSuits.every((suit) => suit === handSuits[0]);

    // Check for straight
    handRanks.sort();
    // eslint-disable-next-line
    const isStraight = handRanks.every(
      (rank, i) => rank === (handRanks[0] as string) + i
    );

    // Check for Royal flush
    const isRoyalFlush = isFlush && isStraight && handRanks[4] === "A";

    // Check for Four of a Kind
    const fourOfAKind = handRanks.filter(
      (rank) => handRanks.filter((r) => r === rank).length === 4
    );

    // Check for Three of a Kind
    const threeOfAKind = handRanks.filter(
      (rank) => handRanks.filter((r) => r === rank).length === 3
    );

    // Check for two pairs
    const twoPairs = handRanks.filter(
      (rank) => handRanks.filter((r) => r === rank).length === 2
    );

    // Check for Pairs
    const pairs = handRanks.filter(
      (rank) => handRanks.filter((r) => r === rank).length === 2
    );

    if (isRoyalFlush) {
      return "Royal Flush";
    } else if (isFlush) {
      return "Flush";
    } else if (isStraight) {
      return "Straight";
    } else if (fourOfAKind.length > 0) {
      return "Four of a Kind";
    } else if (threeOfAKind.length > 0 && pairs.length > 0) {
      return "Full House";
    } else if (threeOfAKind.length > 0) {
      return "Three of a Kind";
    } else if (twoPairs.length === 4) {
      return "Two Pairs";
    } else if (pairs.length === 2) {
      return "Pair";
    } else {
      return "High Card";
    }
  }
