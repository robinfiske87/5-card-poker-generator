import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

import { prisma } from "../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const earlyHands = await prisma.hands.findMany({
    take: 5,
    orderBy: {
      id: "desc",
    },
  });

  // eslint-disable-next-line
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // s ome legacy browsers (IE11, various SmartTVs) choke on 204
  });

  res.status(200).json({
    oldHands: earlyHands,
  });
}
