import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

import { prisma } from "../../server/db";

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
    res.status(405).json({
      error: "Method not allowed",
    });
  }

  const earlyHands = await prisma.hands.findMany({
    take: 5,
    orderBy: {
      id: "desc",
    },
  });

  res.status(200).json({
    oldHands: earlyHands,
  });
}
