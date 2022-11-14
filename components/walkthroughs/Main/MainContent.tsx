import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";

import { container, fadeInDown } from "@/utils/animations";

import { Data, Seller as SellerType, Buyer as BuyerType } from "@/types/walkthrough";

import MarketOutcome from "./MarketOutcome";
import LoadingOverlay from "./LoadingOverlay";
import ParticipantsList from "./ParticipantsList";

type Props = {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  data: Data | undefined;
};

const MainContent = ({ stage, setStage, data }: Props) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (
      stage === data?.options.show_losers ||
      stage === data?.options.show_surpluses
    ) {
      timer = setTimeout(() => setStage((prev) => prev + 1), 8000);
    }

    if (data?.options.show_calculating_overlay.includes(stage)) {
      timer = setTimeout(() => setStage((prev) => prev + 1), 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [stage, data?.options]);

  // Last stage of each walkthrough
  const maxStage = data?.options?.stages!;

  // User role either buyer or seller
  const role = data?.options?.role!;

  // List excluding user
  const listExcludingUser =
    role === "seller"
      ? data?.sellers.filter((seller) => seller.id !== 1)
      : data?.buyers.filter((buyer) => buyer.id !== 1);

  // extract winners and losers for both buyers and sellers
  const sellersLost = data?.sellers.filter((seller) => seller.received === "0");
  const buyersLost = data?.buyers.filter((buyer) => buyer.pays === "0");
  const sellersWon = data?.sellers.filter((seller) => seller.received !== "0");
  const buyersWon = data?.buyers.filter((buyer) => buyer.pays !== "0");

  return (
    <div className="border-l border-green-dark pt-4 pb-24 w-full relative flex justify-center">
      {/* Loading Screen */}
      {data?.options.show_calculating_overlay.includes(stage) && (
        <LoadingOverlay stage={stage} data={data} />
      )}

      {stage >= data?.options.show_participants && (
        <>
          {/* Losers list */}
          {stage >= data?.options.show_losers && (
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
            >
              <ParticipantsList
                sellers={sellersLost as SellerType[]}
                buyers={buyersLost as BuyerType[]}
                type="losers"
              />
            </motion.div>
          )}

          <div className="space-y-5">
            {/* Partial List excluding user */}
            {stage < data?.options.highlight_me && (
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >
                {role === "seller" && (
                  <ParticipantsList
                    sellers={listExcludingUser as SellerType[]}
                    buyers={data?.buyers as BuyerType[]}
                    stage={stage}
                    data={data as Data}
                  />
                )}

                {role === "buyer" && (
                  <ParticipantsList
                    sellers={data?.sellers as SellerType[]}
                    buyers={listExcludingUser as BuyerType[]}
                    stage={stage}
                    data={data as Data}
                  />
                )}
              </motion.div>
            )}

            {/* Full List including user */}
            {stage < data?.options.show_losers &&
              stage >= data?.options.highlight_me && (
                <motion.div
                  variants={fadeInDown}
                  initial="hidden"
                  animate="visible"
                  className="space-y-5"
                >
                  <ParticipantsList
                    sellers={data?.sellers as SellerType[]}
                    buyers={data?.buyers as BuyerType[]}
                    stage={stage}
                    data={data as Data}
                  />
                </motion.div>
              )}

            {/* Winners */}
            {stage >= data?.options.show_losers && (
              <motion.div
                variants={fadeInDown}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >
                <ParticipantsList
                  sellers={sellersWon as SellerType[]}
                  buyers={buyersWon as BuyerType[]}
                  stage={stage}
                  data={data as Data}
                />
              </motion.div>
            )}

            {/* Market Outcome */}
            {stage >= data?.options.show_market_outcome && (
              <motion.div
                variants={fadeInDown}
                initial="hidden"
                animate="visible"
              >
                <MarketOutcome stage={stage} options={data?.options as any} />
              </motion.div>
            )}
          </div>
        </>
      )}

      {data?.options?.show_maps && stage < data?.options.show_participants && (
        <p className="text-4xl">MAP</p>
      )}
    </div>
  );
};

export default MainContent;
