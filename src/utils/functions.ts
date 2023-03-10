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
  function isStraightChecker(hand: string[]) : boolean {
    // Create an object to store the value of each card
    const cardValues: {[key: string]: number} = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    hand.sort((a, b) => {
        if(cardValues.hasOwnProperty(a[0] as string) && cardValues.hasOwnProperty(b[0] as string)){
            return cardValues[a[0] as string]! - cardValues[b[0] as string]!;
        }
        return 0;
    });
    // Check for a straight
    for (let i = 0; i < hand.length - 1; i++) {
      if (cardValues.hasOwnProperty(hand[i] as string[0]) && cardValues.hasOwnProperty(hand[i + 1] as string [0]) 
      && cardValues[hand[i] as string [0] as string]! + 1 !== cardValues[hand[i + 1] as string [0]] ) {
          return false;
      }
  }
  
    return true;
}

  handRanks.sort();

  //const isStraight = handRanks.every(
    //(rank, i) => rank === (handRanks[0] as string) + i
  //);

  const isStraight = isStraightChecker(handRanks as string[]);

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

interface iOldHands {
  id: number;
  hand: string;
  evalValValue: number;
  evalHand: string;
}

export function formatHands(oldData: iOldHands[]) {
  let hands: string[] = [];
  const array = Array.isArray(oldData) ? oldData : [];
  array.forEach((element) => {
    hands.push(element.hand);
  });
  return hands;
}
