import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";

import { container, fadeInDown } from "@/utils/animations";

import { Buyer, WalkthroughData, Seller } from "@/types/walkthrough";

import MarketOutcome from "./MarketOutcome";
import LoadingOverlay from "./LoadingOverlay";
import ParticipantsList from "./ParticipantsList";

type Props = {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  data: WalkthroughData;
};

const filterUser = <
  T extends (Seller | Buyer
)[]>(arr: T) => arr.filter((item) => item.id !== 1)

const MainContent = ({ stage, setStage, data }: Props) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (
      stage === data.options.show_losers ||
      stage === data.options.show_surpluses
    ) {
      timer = setTimeout(() => setStage((prev) => prev + 1), 8000);
    }

    if (data.options.show_calculating_overlay.includes(stage)) {
      timer = setTimeout(() => setStage((prev) => prev + 1), 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [stage, data.options]);

  // Last stage of each walkthrough
  const maxStage = data.options.stages;

  // User role either buyer or seller
  const role = data.options.role;

  // Lists excluding user
  const sellersExcludingUser = data.sellers.filter((seller) => seller.id !== 1);
  const buyersExcludingUser = data.buyers.filter((buyer) => buyer.id !== 1);

  // extract winners and losers for both buyers and sellers
  const sellersLost = data.sellers.filter((seller) => seller.received === "0");
  const buyersLost = data.buyers.filter((buyer) => buyer.pays === "0");
  const sellersWon = data.sellers.filter((seller) => seller.received !== "0");
  const buyersWon = data.buyers.filter((buyer) => buyer.pays !== "0");

  return (
    <div className="border-l border-green-dark pt-4 pb-24 w-full relative flex justify-center">
      {/* Loading Screen */}
      {data.options.show_calculating_overlay.includes(stage) && (
        <LoadingOverlay stage={stage} data={data} />
      )}

      {stage >= data.options.show_participants && (
        <>
          {/* Losers list */}
          {stage >= data.options.show_losers && (
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
            >
              <ParticipantsList
                sellers={sellersLost}
                buyers={buyersLost}
                type="losers"
                stage={stage}
                data={data}
              />
            </motion.div>
          )}

          <div className="space-y-5">
            {/* Partial List excluding user */}
            {stage < data.options.highlight_me && (
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >
                {role === "seller" && (
                  <ParticipantsList
                    sellers={sellersExcludingUser}
                    buyers={data.buyers}
                    stage={stage}
                    data={data}
                  />
                )}

                {role === "buyer" && (
                  <ParticipantsList
                    sellers={data.sellers}
                    buyers={buyersExcludingUser}
                    stage={stage}
                    data={data}
                  />
                )}
              </motion.div>
            )}

            {/* Full List including user */}
            {stage < data.options.show_losers &&
              stage >= data.options.highlight_me && (
                <motion.div
                  variants={fadeInDown}
                  initial="hidden"
                  animate="visible"
                  className="space-y-5"
                >
                  <ParticipantsList
                    sellers={data.sellers}
                    buyers={data.buyers}
                    stage={stage}
                    data={data}
                  />
                </motion.div>
              )}

            {/* Winners */}
            {stage >= data.options.show_losers && (
              <motion.div
                variants={fadeInDown}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >
                <ParticipantsList
                  sellers={sellersWon}
                  buyers={buyersWon}
                  stage={stage}
                  data={data}
                />
              </motion.div>
            )}

            {/* Market Outcome */}
            {stage >= data.options.show_market_outcome && (
              <motion.div
                variants={fadeInDown}
                initial="hidden"
                animate="visible"
              >
                <MarketOutcome stage={stage} options={data.options} />
              </motion.div>
            )}
          </div>
        </>
      )}

      {data.options.show_maps && stage < data.options.show_participants && (
        <p className="text-4xl">MAP</p>
      )}
    </div>
  );
};

export default MainContent;
