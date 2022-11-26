import { motion } from 'framer-motion';

import Link from 'next/link';
import { fadeInDown } from '@/utils/animations';
import { useWalkthroughContext } from '@/context/WalkthroughContext';
import { WalkthroughMarketState } from '@/types/walkthrough';
import { RoleId } from '@/types/roles';
import { getNextScenarioId } from '@/utils/walkthroughs';
import { Map } from '@/components/map/Map';
import { MarketParticipantList } from '../../common/MarketParticipantList';
import { MarketOutcome } from '../../common/MarketOutcome';
import { Project } from '../../../types/project';
import { useProjectsContext } from '../../../context/ProjectsContext';

const MainContentBody = () => {
  const { getProjectCost } = useProjectsContext();
  const { stage, scenario, scenarioId, roleId, marketState } =
    useWalkthroughContext();

  const activeUserProjects = scenario.myProjects.filter(
    (project) => !project.isInactive,
  );

  const getAllProjects = (projects: Project[], projectRoleId: RoleId) => {
    if (projectRoleId === roleId) {
      return [...projects, ...activeUserProjects];
    }

    return projects;
  };

  const hasAcceptedUserProjects = (
    projects: Project[],
    projectRoleId: RoleId,
  ) =>
    getAllProjects(projects, projectRoleId).some(
      (project) =>
        project.accepted(getProjectCost(project)) &&
        activeUserProjects.includes(project),
    );

  const getWinningProjects = (projects: Project[], projectRoleId: RoleId) => {
    const hasUserProjects = hasAcceptedUserProjects(projects, projectRoleId);

    return getAllProjects(projects, projectRoleId).filter(
      (project) =>
        project.accepted(getProjectCost(project)) ||
        (hasUserProjects && activeUserProjects.includes(project)),
    );
  };

  const getLosingProjects = (projects: Project[], projectRoleId: RoleId) => {
    const hasUserProjects = hasAcceptedUserProjects(projects, projectRoleId);

    return getAllProjects(projects, projectRoleId).filter(
      (project) =>
        !project.accepted(getProjectCost(project)) &&
        !(hasUserProjects && activeUserProjects.includes(project)),
    );
  };

  const getActiveProjects = (
    projects: Project[],
    projectRoleId: RoleId,
  ): Project[] => {
    if (marketState < WalkthroughMarketState.solvable) {
      return projects;
    }

    return getAllProjects(projects, projectRoleId);
  };

  // Show the "return to index" link for the last stage of the last scenario.
  if (stage === scenario.options.stages && !getNextScenarioId(scenarioId)) {
    return (
      <div className="flex items-center h-full">
        <Link href={`/how-it-works#${roleId}`} className="text-xl font-bold">
          Return to Walkthrough index
        </Link>
      </div>
    );
  }

  if (scenario.options.showParticipants) {
    return (
      <>
        <motion.div
          key="losing-participants"
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
        >
          <MarketParticipantList
            myProjects={scenario.myProjects}
            sellerProjects={getActiveProjects(
              scenario.sellerProjects,
              'seller',
            )}
            buyerProjects={getActiveProjects(scenario.buyerProjects, 'buyer')}
            losingSellerProjects={getLosingProjects(
              scenario.sellerProjects,
              'seller',
            )}
            losingBuyerProjects={getLosingProjects(
              scenario.buyerProjects,
              'buyer',
            )}
            isMarketSolvable={marketState > WalkthroughMarketState.solvable}
            showWinners={marketState >= WalkthroughMarketState.showing_winners}
            showSurpluses={
              marketState >= WalkthroughMarketState.showing_surpluses
            }
            isMarketSolved={marketState === WalkthroughMarketState.solved}
          />
        </motion.div>

        {marketState >= WalkthroughMarketState.showing_winners && (
          <motion.div
            key="market-outcome"
            variants={fadeInDown}
            initial="hidden"
            animate="visible"
          >
            <MarketOutcome
              isMarketSolved={marketState === WalkthroughMarketState.solved}
              sellerProjects={getWinningProjects(
                scenario.sellerProjects,
                'seller',
              )}
              buyerProjects={getWinningProjects(
                scenario.buyerProjects,
                'buyer',
              )}
            />
          </motion.div>
        )}
      </>
    );
  }

  if (scenario.options.showMaps) {
    return (
      <div className="m-5">
        <Map highlightedMapRegions={scenario.options.highlightedMapRegions} />
      </div>
    );
  }

  return null;
};

export default MainContentBody;
