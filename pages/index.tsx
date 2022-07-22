import { useState, useEffect } from "react";

import type { NextPage } from "next";

import axios from "axios";
import useSWR from "swr";

// import AppContextProvider from "@/context/Context";

import PricingRuleSelect from "@/components/home/PricingRuleSelect";
import FreeDisposalSelect from "@/components/home/FreeDisposalSelect";
import Modal from "@/components/home/Modal";
import ResultModal from "@/components/home/ResultModal";
import Badge from "@/components/proto/Badge";

type Result = {
  [key: string]: any;
};

// API call function using axios
const fetcher = (url: string, freeDisposal: boolean, bidders: any[]) =>
  axios
    .post(url, { free_disposal: freeDisposal, bidders: bidders })
    .then((res) => res.data);

const Home: NextPage = () => {
  const [pricingRule, setPricingRule] = useState("lindsay2018");
  const [freeDisposal, setFreeDisposal] = useState(true);
  const [bidders, setBidders] = useState<any[]>([]);
  const [result, setResult] = useState<Result>({});

  // Controls different modals
  const [openBuyerModal, setOpenBuyerModal] = useState(false);
  const [openSellerModal, setOpenSellerModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  // Controls result data fetching
  const [shouldFetch, setShouldFetch] = useState(false);

  const updateBidders = (newBidder: any) => setBidders([...bidders, newBidder]);
  const solveMarket = () => {
    setShouldFetch(true);
    setShowResultModal(true);
  };

  // Returns array of sellers and buyers
  const sellers = bidders.filter((bidder) => bidder.bids[0].v < 0);
  const buyers = bidders.filter((bidder) => bidder.bids[0].v > 0);

  // API call using SWR
  const url = `https://marketdesign.herokuapp.com/solve/${pricingRule}`;
  const { data, error } = useSWR(
    [shouldFetch ? url : null, freeDisposal, bidders],
    fetcher,
    {
      onSuccess: function (data, ...rest) {
        setShouldFetch(false);
        setResult(data);
        // Replace bidders array with the one from the result
        setBidders(data?.problem.bidders);
      },
    }
  );

  return (
    <>
      <div className="max-w-[1110px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Pricing rule */}
          <PricingRuleSelect setPricingRule={setPricingRule} />
          {/* Free Disposal */}
          <FreeDisposalSelect
            freeDisposal={freeDisposal}
            setFreeDisposal={setFreeDisposal}
          />

          {/* Bidders */}
          <div className="grid grid-cols-2 gap-16">
            {/* Sellers */}
            <div>
              <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                  <div className="ml-4 mt-2">
                    <h3 className="text-lg leading-6 text-gray-900">
                      Sellers list
                    </h3>
                  </div>
                  <div className="ml-4 mt-2 flex-shrink-0">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setOpenSellerModal(true)}
                    >
                      Add new Seller
                    </button>
                  </div>
                </div>
              </div>
              <ul className="px-4 py-5 border-b border-gray-200 space-y-4">
                {sellers.map((seller, i) => (
                  <li
                    key={i}
                    className="shadow-sm border border-gray-200 rounded-md p-3 space-y-4"
                  >
                    <Badge winning={seller.bids[0].winning} />
                    <div className="flex justify-between items-center">
                      <img
                        className="rounded-full w-12 h-12 border border-purple-200"
                        src="https://joeschmoe.io/api/v1/random"
                        alt=""
                      />
                      <div className="space-x-8">
                        <span>{seller.name}</span>
                        <span>{Math.abs(seller.bids[0].v)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buyers */}
            <div>
              <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                  <div className="ml-4 mt-2">
                    <h3 className="text-lg leading-6 text-gray-900">
                      Buyers List
                    </h3>
                  </div>
                  <div className="ml-4 mt-2 flex-shrink-0">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setOpenBuyerModal(true)}
                    >
                      Add new Buyer
                    </button>
                  </div>
                </div>
              </div>
              <ul className="px-4 py-5 border-b border-gray-200 space-y-4">
                {buyers.map((buyer, i) => (
                  <li
                    key={i}
                    className="shadow-sm border border-gray-200 rounded-md p-3 space-y-4"
                  >
                    <Badge winning={buyer.bids[0].winning} />
                    <div className="flex justify-between items-center">
                      <img
                        className="rounded-full w-12 h-12 border border-purple-200"
                        src="https://joeschmoe.io/api/v1/random"
                        alt=""
                      />
                      <div className="space-x-8">
                        <span>{buyer.name}</span>
                        <span>{Math.abs(buyer.bids[0].v)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
            onClick={solveMarket}
          >
            Solve Market
          </button>
        </div>

        {/* Bidder Info modals */}
        {openBuyerModal && (
          <Modal
            open={openBuyerModal}
            setOpen={setOpenBuyerModal}
            type="Buyer"
            addBidder={updateBidders}
          />
        )}
        {openSellerModal && (
          <Modal
            open={openSellerModal}
            setOpen={setOpenSellerModal}
            type="Seller"
            addBidder={updateBidders}
          />
        )}
        {showResultModal && (
          <ResultModal
            open={showResultModal}
            setOpen={setShowResultModal}
            result={result}
          />
        )}
      </div>
    </>
  );
};

export default Home;
