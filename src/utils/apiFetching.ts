interface iUser {
  pokerHand: string[];
  evaluationValue: number;
  evaluationHandName: string;
}

interface iOldHands {
  id: number;
  hand: string;
  evalValValue: number;
  evalHand: string;
}

//A functions that fetches data from an API endpoint

export const fetchHand = async (): Promise<iUser> => {
  const res = await fetch("/api/hand");
  return res.json() as Promise<iUser>;
};

export const oldHands = async (): Promise<iOldHands> => {
  const res = await fetch("/api/oldHands");
  return res.json() as Promise<iOldHands>;
};

export const winner = async (hands: string[]): Promise<iUser> => {
  const res = await fetch("/api/winner", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hands,
    }),
  });
  return res.json() as Promise<iUser>;
};
