import { FC } from 'react';
import {
  WalkthroughMarketState,
  WalkthroughScenario,
} from '@/types/walkthrough';
import { useWalkthroughContext } from '@/context/WalkthroughContext';
import {
  findProjectIndex,
  includesProject,
  isMyProject,
} from '@/utils/walkthroughs';
import { MarketParticipant } from '../MarketParticipant';
import { Project } from '../../../types/project';

type MarketParticipantListProps = {
  buyerProjects: Project[];
  sellerProjects: Project[];
  losingBuyerProjects: Project[];
  losingSellerProjects: Project[];
  isMarketSolvable: boolean;
};

/**
 * Sort to bring "my projects" to the top of the list.
 */
const sortMyProjects = (
  scenario: WalkthroughScenario,
  buyerProjects: Project[],
  sellerProjects: Project[],
  losingProjects: Project[],
  showingWinners: boolean,
) =>
  [...sellerProjects, ...buyerProjects].sort((a, b) => {
    const isLoserA = showingWinners && includesProject(a, losingProjects);
    const isLoserB = showingWinners && includesProject(b, losingProjects);
    const isMyProjectA = isMyProject(scenario.myProjects, a);
    const isMyProjectB = isMyProject(scenario.myProjects, b);

    return (
      Number(isLoserB ?? 0) - Number(isLoserA ?? 0) ||
      Number(isMyProjectB ?? 0) - Number(isMyProjectA ?? 0)
    );
  });

const getMyActiveProjects = (
  projects: Project[],
  scenario: WalkthroughScenario,
) => scenario.myProjects.filter((project) => projects.includes(project));

const getIsMyFirstProject = (
  projects: Project[],
  project: Project,
  scenario: WalkthroughScenario,
) => {
  const projectIndex = getMyActiveProjects(projects, scenario).indexOf(project);

  return projectIndex === 0;
};

const getIsMyLastProject = (
  projects: Project[],
  project: Project,
  scenario: WalkthroughScenario,
) => {
  const activeProjects = getMyActiveProjects(projects, scenario);
  const projectIndex = getMyActiveProjects(projects, scenario).indexOf(project);

  return projectIndex + 1 === activeProjects.length;
};

export const MarketParticipantList: FC<MarketParticipantListProps> = ({
  buyerProjects,
  sellerProjects,
  losingBuyerProjects,
  losingSellerProjects,
  isMarketSolvable,
}: MarketParticipantListProps) => {
  const { scenario, marketState, getProjectCost } = useWalkthroughContext();
  const showingWinners = marketState >= WalkthroughMarketState.showing_winners;
  const allLosingProjects = [...losingSellerProjects, ...losingBuyerProjects];
  const sortedProjects = sortMyProjects(
    scenario,
    buyerProjects,
    sellerProjects,
    allLosingProjects,
    showingWinners,
  );

  const sortedLosingProjects = sortedProjects.filter((project) =>
    includesProject(project, allLosingProjects),
  );

  return (
    <ul>
      {sortedProjects.map((project) => {
        const isMyFirstProject = getIsMyFirstProject(
          sortedProjects,
          project,
          scenario,
        );

        const isMyLastProject = getIsMyLastProject(
          sortedProjects,
          project,
          scenario,
        );

        const projectCost = getProjectCost(project);

        return (
          <li key={project.title + project.subtitle}>
            <MarketParticipant
              projectRoleId={
                includesProject(project, buyerProjects) ? 'buyer' : 'seller'
              }
              title={project.title}
              subtitle={project.subtitle}
              isLoser={includesProject(project, allLosingProjects)}
              loserIndex={findProjectIndex(project, sortedLosingProjects)}
              isMyProject={isMyProject(scenario.myProjects, project)}
              isMyFirstProject={isMyFirstProject}
              isMyLastProject={isMyLastProject}
              isMySubsequentProject={
                getMyActiveProjects(sortedProjects, scenario).includes(
                  project,
                ) && !isMyFirstProject
              }
              projectCost={getProjectCost(project)}
              discountOrBonus={project.discountOrBonus}
              products={project.products}
              accepted={project.accepted(projectCost)}
              showCosts={
                isMyProject(scenario.myProjects, project) || isMarketSolvable
              }
              showWinners={
                marketState >= WalkthroughMarketState.showing_winners
              }
              showSurpluses={
                marketState >= WalkthroughMarketState.showing_surpluses
              }
              isMarketSolved={marketState === WalkthroughMarketState.solved}
            />
          </li>
        );
      })}
    </ul>
  );
};
