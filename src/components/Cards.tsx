import React from "react";
import { useQuery } from "react-query";
import { getCharacterMapBySuite } from "./suites";
import { api } from "../utils/api";

// A function that fetches data from an API
interface iUser {
  pokerHand: string[];
  evaluationValue: number;
  evaluationHandName: string;
}

const fetchHand = async (): Promise<iUser> => {
  const res = await fetch("/api/hand");
  return res.json() as Promise<iUser>;
};

// The Cards component, which is a functional component
const Cards: React.FC = () => {
  const submitHandWithanalyzes = api.poker.submitHand.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const fetchCards = () => {
    submitHandWithanalyzes.mutateAsync({
      pokerHand: data?.pokerHand.toString() as string,
      evaulationValue: data?.evaluationValue as number,
      evaluationHandName: data?.evaluationHandName as string,
    });
    void refetch();
  };

  // Use the useQuery hook to fetch data from the API
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "hand",
    fetchHand
  );

  // If the data is loading, return a loading message
  if (isLoading) return <div>Loading...</div>;

  if (isFetching) return <div>Fetching...</div>;

  // If there is an error, return an error message
  if (error) return <div>Error fetching from the API </div>;

  return (
    <main className="">
      <div className="flex flex-col items-center justify-center">
        <div className="text-8xl">
          {data &&
            data?.pokerHand.map((card, index) => {
              const color =
                card[1] === "H" || card[1] === "C"
                  ? "tex-black"
                  : "text-red-900";
              return (
                <span key={index}>
                  <span className={color}>
                    {getCharacterMapBySuite(card[1] as string).get(
                      card[0] as string
                    )}
                  </span>
                </span>
              );
            })}
        </div>
        <div className="text-1xl">
          {data?.evaluationHandName}
          <br />
          hand score: {data?.evaluationValue}
        </div>
        <button
          className="rounded bg-emerald-500 py-2 px-4 font-bold text-white hover:bg-emerald-700 active:bg-emerald-800"
          onClick={() => fetchCards()}
        >
          Give new hand
        </button>
      </div>
    </main>
  );
};

export default Cards;
