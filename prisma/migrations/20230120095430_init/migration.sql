/*
  Warnings:

  - You are about to drop the `hands` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "hands";

-- CreateTable
CREATE TABLE "Hands" (
    "id" SERIAL NOT NULL,
    "hand" TEXT[],
    "evalValue" INTEGER NOT NULL,
    "evalHand" TEXT NOT NULL,

    CONSTRAINT "Hands_pkey" PRIMARY KEY ("id")
);
