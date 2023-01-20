import { type NextPage } from "next";
import Head from "next/head";
import Cards from "../components/Cards";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>5-card generator</title>
        <meta name="description" content="5-card-generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#50c878] to-[#006199]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[3.5rem]">
            5-Card Generator
          </h1>
          <div className="m-5 flex grid-cols-1 items-center justify-center gap-4 bg-white p-5 sm:grid-cols-2 md:gap-8">
            <Cards />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
