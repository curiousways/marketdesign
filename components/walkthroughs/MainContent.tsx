import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";

import { classNames } from "@/utils/index";
import { container, list } from "@/utils/animations";

import { Data } from "@/types/index";

import Buyer from "./Buyer";
import BuyerLost from "./BuyerLost";
import Seller from "./Seller";
import SellerLost from "./SellerLost";
import MarketOutcome from "./MarketOutcome";
import LoadingOverlay from "./LoadingOverlay";

type Props = {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  walkthrough: number;
  data: Data | undefined;
};

const MainContent = ({ stage, setStage, data, walkthrough }: Props) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (walkthrough === 1.1 && stage === 5) {
      timer = setTimeout(() => setStage((prev) => prev + 1), 2000);
    }

    if (data?.options.show_calculating_overlay.includes(stage)) {
      timer = setTimeout(() => setStage((prev) => prev + 1), 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [stage, data?.options]);

  const maxStage = data?.options?.stages!;

  const highlightBuyersList = walkthrough === 1.1 && stage === 3;
  const highlightSellersList = walkthrough === 1.1 && stage === 2;

  // Losers
  const sellersLost = data?.sellers.filter((seller) => seller.received === "0");
  const buyersLost = data?.buyers.filter((buyer) => buyer.pays === "0");
  const sellersWon = data?.sellers.filter((seller) => seller.received !== "0");
  const buyersWon = data?.buyers.filter((buyer) => buyer.pays !== "0");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="bg-[#D9D9D9] pt-20 pb-24 w-full relative flex"
    >
      {/* Loading Screen */}
      {data?.options.show_calculating_overlay.includes(stage) && (
        <LoadingOverlay stage={stage} data={data} />
      )}

      {/* Losers */}
      {!data?.options.hide_losers.includes(stage) && (
        <motion.div variants={list} initial="hidden" animate="visible">
          {buyersLost?.map((buyer) => (
            <BuyerLost
              key={buyer.id}
              stage={stage}
              maxStage={maxStage}
              buyer={buyer}
              options={data?.options as any}
            />
          ))}

          {sellersLost?.map((seller) => (
            <SellerLost
              key={seller.id}
              stage={stage}
              maxStage={maxStage}
              seller={seller}
              options={data?.options as any}
            />
          ))}
        </motion.div>
      )}

      <div className="space-y-5">
        {/* Full List */}
        {data?.options.hide_losers.includes(stage) && (
          <motion.div
            variants={list}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {/* Buyers */}
            <div
              className={classNames(
                "space-y-5 py-2 px-40 rounded-lg",
                highlightBuyersList ? "relative z-50 bg-[#D9D9D9]" : ""
              )}
            >
              {data?.buyers.map((buyer) => (
                <Buyer
                  key={buyer.id}
                  stage={stage}
                  maxStage={maxStage}
                  buyer={buyer}
                  options={data.options}
                />
              ))}
            </div>

            {/* Sellers */}
            <div
              className={classNames(
                "space-y-5 py-2 px-40 rounded-lg",
                highlightSellersList ? "relative z-50 bg-[#D9D9D9]" : ""
              )}
            >
              {data?.sellers.map((seller) => (
                <Seller
                  key={seller.id}
                  stage={stage}
                  walkthrough={walkthrough}
                  maxStage={maxStage}
                  seller={seller}
                  options={data.options}
                  className={classNames(
                    data?.options?.highlight_me.includes(stage) &&
                      seller.title === "My Project"
                      ? "relative z-50"
                      : ""
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Winners */}
        {!data?.options.hide_losers.includes(stage) && (
          <motion.div
            variants={list}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {/* Buyers */}
            <div className="space-y-5 px-2 rounded-lg">
              {buyersWon?.map((buyer) => (
                <Buyer
                  key={buyer.id}
                  stage={stage}
                  maxStage={maxStage}
                  buyer={buyer}
                  options={data?.options as any}
                />
              ))}
            </div>

            {/* Sellers */}
            <div className="space-y-5 px-2 rounded-lg">
              {sellersWon?.map((seller) => (
                <Seller
                  key={seller.id}
                  stage={stage}
                  walkthrough={walkthrough}
                  maxStage={maxStage}
                  seller={seller}
                  options={data?.options as any}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Market Outcome */}
        {stage >= data?.options.show_market_outcome && (
          <motion.div
            variants={list}
            initial="hidden"
            animate="visible"
            className={classNames(
              "space-y-5 py-2 px-2 rounded-lg",
              data?.options.hide_losers.includes(stage) ? "px-40" : ""
            )}
          >
            <MarketOutcome
              stage={stage}
              walkthrough={walkthrough}
              maxStage={maxStage}
              options={data?.options as any}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MainContent;
