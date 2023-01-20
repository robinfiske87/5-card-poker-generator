-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hands" (
    "id" SERIAL NOT NULL,
    "hand" TEXT[],
    "evalValue" INTEGER NOT NULL,
    "evalHand" TEXT NOT NULL,

    CONSTRAINT "hands_pkey" PRIMARY KEY ("id")
);
