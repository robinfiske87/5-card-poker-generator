import React from "react";
import { useMutation, useQuery } from "react-query";
import { getCharacterMapBySuite } from "./suites";
import { api } from "../utils/api";
import { fetchHand, oldHands, winner } from "../utils/apiFetching";
import { formatHands } from "../utils/functions";

// The Cards component, which is a functional component
const Cards: React.FC = () => {
  const submitHandWithanalyzes = api.poker.submitHand.useMutation({
    onSuccess: (data) => {
      //console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const fetchCards = () => {
    submitHandWithanalyzes.mutateAsync({
      pokerHand: handData?.pokerHand.toString() as string,
      evaulationValue: handData?.evaluationValue as number,
      evaluationHandName: handData?.evaluationHandName as string,
    });
    void refetch();
    void oldRefetch();
    submitWinner();
  };

  // Use the useQuery hook to fetch data from the API
  const {
    data: handData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery("hand", fetchHand);

  const { data: oldData, refetch: oldRefetch } = useQuery("old", oldHands, {
    refetchOnWindowFocus: false,
  });

  const { mutate: winnerdata } = useMutation(winner, {
    onSuccess: (data) => {
      console.log(
        "Winner of the 5 previously generated hands: " + JSON.stringify(data)
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const submitWinner = () => {
    winnerdata(formatHands(oldData as any));
  };

  // If the data is loading, return a loading message
  if (isLoading) return <div>Loading...</div>;

  if (isFetching) return <div>Fetching...</div>;

  // If there is an error, return an error message
  if (error) return <div>Error fetching from the API </div>;

  return (
    <main className="">
      <div className="flex flex-col items-center justify-center">
        <div className="text-8xl">
          {handData &&
            handData?.pokerHand.map((card, index) => {
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
          {handData?.evaluationHandName}
          <br />
          hand score: {handData?.evaluationValue}
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
