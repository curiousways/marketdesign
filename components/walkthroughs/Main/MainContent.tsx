import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";

import { container, fadeInDown } from "@/utils/animations";

import { WalkthroughData } from "@/types/walkthrough";

import MarketOutcome from "./MarketOutcome";
import LoadingOverlay from "./LoadingOverlay";
import ParticipantsList from "./ParticipantsList";
import { RoleId } from "@/types/roles";

type Props = {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  data: WalkthroughData;
  roleId: RoleId;
};

const MainContent = ({
  stage,
  setStage,
  data,
  roleId,
}: Props) => {
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

  const activeUserProjects = data.myProjects.filter((project) => !project.isInactive);

  const sellerProjectsIncludingUser = roleId === 'seller'
      ? [...data.sellerProjects, ...activeUserProjects]
      : data.sellerProjects;

  const buyerProjectsIncludingUser = roleId === 'buyer'
    ? [...data.buyerProjects, ...activeUserProjects]
    : data.buyerProjects;

  // Extract winners and losers for both buyers and sellers
  const sellerProjectsLost = sellerProjectsIncludingUser.filter((project) => !project.accepted);
  const buyerProjectsLost = buyerProjectsIncludingUser.filter((project) => !project.accepted);
  const sellerProjectsWon = sellerProjectsIncludingUser.filter((project) => project.accepted);
  const buyersProjectsWon = buyerProjectsIncludingUser.filter((project) => project.accepted);

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
                sellerProjects={sellerProjectsLost}
                buyerProjects={buyerProjectsLost}
                type="losers"
                stage={stage}
                data={data}
                roleId={roleId}
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
                <ParticipantsList
                  sellerProjects={data.sellerProjects}
                  buyerProjects={data.buyerProjects}
                  stage={stage}
                  data={data}
                  roleId={roleId}
                />
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
                    sellerProjects={sellerProjectsIncludingUser}
                    buyerProjects={buyerProjectsIncludingUser}
                    stage={stage}
                    data={data}
                    roleId={roleId}
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
                  sellerProjects={sellerProjectsWon}
                  buyerProjects={buyersProjectsWon}
                  stage={stage}
                  data={data}
                  roleId={roleId}
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
                <MarketOutcome
                  stage={stage}
                  options={data.options}
                  sellerProjects={sellerProjectsWon}
                  buyerProjects={buyersProjectsWon}
                />
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
