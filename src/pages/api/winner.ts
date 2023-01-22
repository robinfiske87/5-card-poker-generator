import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { analyzeHand, rankHand } from "../../utils/functions";

interface Hand {
  hand: string;
}

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

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  if (!req.body.hands) {
    return res.status(404).json({
      error: "hands must be an array",
    });
  }
  const body = req.body as { hands: Hand[] };
  // const body = {
  //   hands: ["AH,AS,7D,2H,2D", "AH,AC,KH,KS,QD", "5H,5D,5S,5H,6H"],
  // };

  if (!Array.isArray(body.hands)) {
    return res.status(404).json({
      error: "hands must be an array",
    });
  }

  const mappedHand = body.hands.map((hand: any = []) => {
    const cards = hand.split(",");
    const name = analyzeHand(cards);
    const value = rankHand(
      name as
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
    return {
      hand: hand,
      evalName: name,
      evalVal: value,
    };
  });

  let winner;

  if (!mappedHand[0]) {
    res.status(404).json({
      winner: undefined,
    });
  }

  let highValue = 0;
  let highIndex = 0;
  mappedHand.forEach((hand, index) => {
    if (hand.evalVal > highValue) {
      highValue = hand.evalVal;
      highIndex = index;
    }
  });

  winner = mappedHand[highIndex];

  res.status(200).json({
    winner,
  });
}
