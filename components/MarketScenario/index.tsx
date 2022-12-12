import { motion } from 'framer-motion';

import Link from 'next/link';
import { FC } from 'react';
import { fadeInDown } from '@/utils/animations';
import { RoleId } from '@/types/roles';
import { MarketParticipantList } from '../MarketParticipantList';
import { MarketOutcome } from '../MarketOutcome';
import { Project } from '../../types/project';
import { useProjectsContext } from '../../context/ProjectsContext';
import { HighlightedMapRegions } from '../../types/map';
import { Map } from '../Map';
import { getGroupedProjects } from '../../utils/project';

type MarketScenarioProps = {
  myProjects: Project[];
  buyerProjects: Project[];
  sellerProjects: Project[];
  roleId?: RoleId;
  showAllProjects?: boolean;
  showWinners: boolean;
  showSurpluses: boolean;
  isMarketSolved: boolean;
  showCosts: boolean;
  showParticipants: boolean;
  showMap?: boolean;
  highlightedMapRegions?: HighlightedMapRegions;
  investorRegions?: string[];
  onMapRegionClick?: (region: string) => void;
  link?: {
    href: string;
    text: string;
  };
};

export const MarketScenario: FC<MarketScenarioProps> = ({
  myProjects,
  buyerProjects,
  sellerProjects,
  link,
  roleId,
  showAllProjects,
  showWinners,
  showSurpluses,
  isMarketSolved,
  showCosts,
  showParticipants,
  showMap,
  highlightedMapRegions,
  investorRegions,
  onMapRegionClick,
}: MarketScenarioProps) => {
  const { getProjectCost } = useProjectsContext();

  const activeUserProjects = myProjects.filter(
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

  const hasAcceptedGroupedProject = (projects: Project[], project: Project) =>
    getGroupedProjects(projects, project).some((groupedProject) =>
      groupedProject.accepted(getProjectCost(groupedProject)),
    );

  const getWinningProjects = (projects: Project[], projectRoleId: RoleId) => {
    const hasUserProjects = hasAcceptedUserProjects(projects, projectRoleId);

    return getAllProjects(projects, projectRoleId).filter(
      (project) =>
        hasAcceptedGroupedProject(projects, project) ||
        (hasUserProjects && activeUserProjects.includes(project)),
    );
  };

  const getLosingProjects = (projects: Project[], projectRoleId: RoleId) => {
    const hasUserProjects = hasAcceptedUserProjects(projects, projectRoleId);

    return getAllProjects(projects, projectRoleId).filter(
      (project) =>
        !hasAcceptedGroupedProject(projects, project) &&
        !(hasUserProjects && activeUserProjects.includes(project)),
    );
  };

  const getActiveProjects = (
    projects: Project[],
    projectRoleId: RoleId,
  ): Project[] => {
    if (showAllProjects) {
      return projects;
    }

    return getAllProjects(projects, projectRoleId);
  };

  // Show the "return to index" link if given.
  if (link) {
    return (
      <div className="flex items-center h-full">
        <Link href={link.href} className="text-xl font-bold">
          {link.text}
        </Link>
      </div>
    );
  }

  if (showParticipants && roleId) {
    return (
      <>
        <motion.div
          key="participants"
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
        >
          <MarketParticipantList
            roleId={roleId}
            myProjects={myProjects}
            sellerProjects={getActiveProjects(sellerProjects, 'seller')}
            buyerProjects={getActiveProjects(buyerProjects, 'buyer')}
            losingProjects={[
              ...getLosingProjects(buyerProjects, 'buyer'),
              ...getLosingProjects(sellerProjects, 'seller'),
            ]}
            showCosts={showCosts}
            showWinners={showWinners}
            showSurpluses={showSurpluses}
            isMarketSolved={isMarketSolved}
          />
        </motion.div>

        {showWinners && (
          <motion.div
            key="market-outcome"
            variants={fadeInDown}
            initial="hidden"
            animate="visible"
          >
            <MarketOutcome
              isMarketSolved={isMarketSolved}
              sellerProjects={getWinningProjects(sellerProjects, 'seller')}
              buyerProjects={getWinningProjects(buyerProjects, 'buyer')}
            />
          </motion.div>
        )}
      </>
    );
  }

  if (showMap) {
    return (
      <div className="m-5">
        <Map
          highlightedMapRegions={highlightedMapRegions}
          investorRegions={investorRegions}
          onMapRegionClick={onMapRegionClick}
        />
      </div>
    );
  }

  return null;
};
