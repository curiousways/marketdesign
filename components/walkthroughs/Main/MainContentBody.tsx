import { motion } from "framer-motion";

import { container, fadeInDown } from "@/utils/animations";
import MarketOutcome from "./MarketOutcome";
import ParticipantsList from "./ParticipantsList";
import { useWalkthroughContext } from "@/context/WalkthroughContext";
import { WalkthroughMarketState, WalkthroughProject } from "@/types/walkthrough";
import { RoleId } from "@/types/roles";
import { getNextScenarioId } from "@/utils/walkthroughs";
import Link from "next/link";

const MainContentBody = () => {
  const {
    stage,
    scenario,
    scenarioId,
    roleId,
    marketState,
  } = useWalkthroughContext();

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

  // Show the "return to index" link for the last stage of the last scenario.
  if (stage === scenario.options.stages && !getNextScenarioId(scenarioId)) {
    return (
      <div className="flex items-center">
        <Link href="/how-it-works">
          <a className="text-xl font-bold">Return to Walkthrough index</a>
        </Link>
      </div>
    )
  }

  if (stage >= scenario.options.show_participants) {
    return (
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
    );
  };

  if (scenario.options.show_maps) {
    return (
      <p className="text-4xl">MAP</p>
    );
  }

  return null;
};

export default MainContentBody;
