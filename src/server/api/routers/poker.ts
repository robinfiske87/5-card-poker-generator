import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const pokerRouter = createTRPCRouter({
  submitHand: publicProcedure
    .input(
      z.object({
        pokerHand: z.string(),
        evaulationValue: z.number(),
        evaluationHandName: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const handInDb = await prisma.hands.create({
        data: {
          hand: input.pokerHand,
          evalValue: input.evaulationValue,
          evalHand: input.evaluationHandName,
        },
      });
      return handInDb;
    }),
  getHands: publicProcedure.query(async () => {
    const earlyHands = await prisma.hands.findMany({
      take: 5,
      orderBy: {
        id: "desc",
      },
    });
    return earlyHands;
  }),
});
