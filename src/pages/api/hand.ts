import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

import { analyzeHand, rankHand } from "../../utils/functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const suits = ["S", "D", "C", "H"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
  ];

  const Deck = () => {
    const deck = [];
    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
        const card = { Value: values[x], Suit: suits[i] };
        deck.push(card);
      }
    }
    return deck.map((card) => `${card.Value as string}${card.Suit as string}`);
  };

  const newDeck = Deck();

  function pickRandomCards(cards: string[]): string[] {
    const pickedCards: string[] = [];
    while (pickedCards.length < 5) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      const randomCard = cards[randomIndex];
      if (!pickedCards.includes(randomCard as string)) {
        pickedCards.push(randomCard as string);
      }
    }
    return pickedCards;
  }

  const pokerHand = pickRandomCards(newDeck);

  const evaluationHandName = analyzeHand(pokerHand);

  const evaluationValue = rankHand(
    evaluationHandName as
      | "Royal Flush"
      | "Straight Flush"
      | "Four of a Kind"
      | "Full House"
      | "Flush"
      | "Straight"
      | "Three of a Kind"
      | "Two Pairs"
      | "Pair"
      | "High Card"
  );

  return res.status(200).json({
    pokerHand: pokerHand,
    evaluationValue: evaluationValue,
    evaluationHandName: evaluationHandName,
  });
}
