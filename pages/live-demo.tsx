import { useState, useEffect } from "react";

import type { NextPage } from "next";

import axios from "axios";
import useSWR from "swr";

import { bids } from "data/bids/bids";
import { Data, Bidder } from "@/types/demo";

import SideBar from "@/components/demo/sidebar/SideBar";
import MainContent from "@/components/demo/Main/MainContent";

// API call function using axios
// freeDisposal: boolean,
const fetcher = (url: string, bidders: Bidder[]) =>
  axios.post(url, { free_disposal: true, bidders: bidders }).then((res) => {
    console.log(res.data);
    return res.data;
  });

const Demo: NextPage = () => {
  const [bidders, setBidders] = useState<Bidder[]>(bids);
  const [result, setResult] = useState<Data | undefined>();

  // Controls result data fetching
  const [shouldFetch, setShouldFetch] = useState(false);

  const solveMarket = () => {
    setShouldFetch(true);
  };

  // API call using SWR
  const url = `https://marketdesign.herokuapp.com/solve/lindsay2018`;
  const { data, error } = useSWR([shouldFetch ? url : null, bidders], fetcher, {
    onSuccess: function (data, ...rest) {
      setShouldFetch(false);
      setResult(data);
      // Replace bidders array with the one from the result
      setBidders(data?.problem.bidders);
    },
  });

  return (
    <main>
      <div className="flex items-stretch font-poppins relative border-t border-green-dark min-h-screen">
        <SideBar solveMarket={solveMarket} updateBidders={setBidders} />
        <MainContent loading={shouldFetch} result={result} bidders={bidders} />
      </div>
    </main>
  );
};

export default Demo;
