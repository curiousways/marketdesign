import { useEffect } from "react";
import { motion } from "framer-motion";

import { container, fadeInDown } from "@/utils/animations";
import MarketOutcome from "./MarketOutcome";
import LoadingOverlay from "./LoadingOverlay";
import ParticipantsList from "./ParticipantsList";
import { useWalkthroughContext } from "@/context/WalkthroughContext";
import { WalkthroughMarketState, WalkthroughProject } from "@/types/walkthrough";
import { RoleId } from "@/types/roles";

const MainContent = () => {
  const {
    stage,
    scenario,
    isMarketSolving,
    roleId,
    marketState,
    goToNextMarketState,
  } = useWalkthroughContext();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (
      marketState === WalkthroughMarketState.showing_winners ||
      marketState === WalkthroughMarketState.showing_surpluses
    ) {
      timer = setTimeout(goToNextMarketState, 5000);

      return;
    }

    if (isMarketSolving) {
      timer = setTimeout(goToNextMarketState, 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [
    isMarketSolving,
    marketState,
    goToNextMarketState,
  ]);

  const activeUserProjects = scenario.myProjects.filter((project) => !project.isInactive);

  const getAllProjects = (
    projects: WalkthroughProject[],
    projectRoleId: RoleId,
  ) => {
    if (projectRoleId === roleId) {
      return [...projects, ...activeUserProjects];
    }

    return projects;
  }

  const getWinningProjects = (
    projects: WalkthroughProject[],
    projectRoleId: RoleId,
  ) => (
    getAllProjects(projects, projectRoleId).filter((project) => project.accepted)
  );

  const getLosingProjects = (
    projects: WalkthroughProject[],
    projectRoleId: RoleId,
  ) => (
    getAllProjects(projects, projectRoleId).filter((project) => !project.accepted)
  );

  const getActiveProjects = (
    projects: WalkthroughProject[],
    projectRoleId: RoleId,
  ): WalkthroughProject[] => {
    if (marketState < WalkthroughMarketState.solvable) {
      return projects;
    }

    if (marketState >= WalkthroughMarketState.showing_winners) {
      return getWinningProjects(projects, projectRoleId);
    }

    return getAllProjects(projects, projectRoleId);
  };

  return (
    <div className="border-l border-green-dark pt-4 pb-24 w-full relative flex justify-center">
      <LoadingOverlay />

      {stage >= scenario.options.show_participants && (
        <>
          {/* Losers list */}
          {marketState >= WalkthroughMarketState.showing_winners && (
            <motion.div
              key="losing-participants"
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
            >
              <ParticipantsList
                sellerProjects={getLosingProjects(scenario.sellerProjects, 'seller')}
                buyerProjects={getLosingProjects(scenario.buyerProjects, 'buyer')}
                type="losers"
                stage={stage}
                data={scenario}
                roleId={roleId}
              />
            </motion.div>
          )}

          <div className="space-y-5">
            <motion.div
              key="all-participants"
              variants={container}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              <ParticipantsList
                sellerProjects={getActiveProjects(scenario.sellerProjects, 'seller')}
                buyerProjects={getActiveProjects(scenario.buyerProjects, 'buyer')}
                stage={stage}
                data={scenario}
                roleId={roleId}
              />
            </motion.div>

            {/* Market Outcome */}
            {marketState >= WalkthroughMarketState.showing_winners && (
              <motion.div
                key="market-outcome"
                variants={fadeInDown}
                initial="hidden"
                animate="visible"
              >
                <MarketOutcome
                  sellerProjects={getWinningProjects(scenario.sellerProjects, 'seller')}
                  buyerProjects={getWinningProjects(scenario.buyerProjects, 'buyer')}
                />
              </motion.div>
            )}
          </div>
        </>
      )}

      {scenario.options.show_maps && stage < scenario.options.show_participants && (
        <p className="text-4xl">MAP</p>
      )}
    </div>
  );
};

export default MainContent;
