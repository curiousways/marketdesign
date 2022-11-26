import { FC } from 'react';
import { findProjectIndex, includesProject } from '@/utils/walkthroughs';
import { MarketParticipant } from '../MarketParticipant';
import { Project } from '../../../types/project';
import { useProjectsContext } from '../../../context/ProjectsContext';

type MarketParticipantListProps = {
  myProjects: Project[];
  buyerProjects: Project[];
  sellerProjects: Project[];
  losingBuyerProjects: Project[];
  losingSellerProjects: Project[];
  showWinners: boolean;
  showSurpluses: boolean;
  isMarketSolved: boolean;
  isMarketSolvable: boolean;
};

/**
 * Sort to bring "my projects" to the top of the list.
 */
const sortMyProjects = (
  myProjects: Project[],
  buyerProjects: Project[],
  sellerProjects: Project[],
  losingProjects: Project[],
  showingWinners: boolean,
) =>
  [...sellerProjects, ...buyerProjects].sort((a, b) => {
    const isLoserA = showingWinners && includesProject(a, losingProjects);
    const isLoserB = showingWinners && includesProject(b, losingProjects);
    const isMyProjectA = myProjects.includes(a);
    const isMyProjectB = myProjects.includes(b);

    return (
      Number(isLoserB ?? 0) - Number(isLoserA ?? 0) ||
      Number(isMyProjectB ?? 0) - Number(isMyProjectA ?? 0)
    );
  });

const getMyActiveProjects = (projects: Project[], myProjects: Project[]) =>
  myProjects.filter((project) => projects.includes(project));

const getIsMyFirstProject = (
  projects: Project[],
  project: Project,
  myProjects: Project[],
) => {
  const projectIndex = getMyActiveProjects(projects, myProjects).indexOf(
    project,
  );

  return projectIndex === 0;
};

const getIsMyLastProject = (
  projects: Project[],
  project: Project,
  myProjects: Project[],
) => {
  const activeProjects = getMyActiveProjects(projects, myProjects);
  const projectIndex = getMyActiveProjects(projects, myProjects).indexOf(
    project,
  );

  return projectIndex + 1 === activeProjects.length;
};

export const MarketParticipantList: FC<MarketParticipantListProps> = ({
  myProjects,
  buyerProjects,
  sellerProjects,
  losingBuyerProjects,
  losingSellerProjects,
  showWinners,
  showSurpluses,
  isMarketSolved,
  isMarketSolvable,
}: MarketParticipantListProps) => {
  const { getProjectCost } = useProjectsContext();
  const allLosingProjects = [...losingSellerProjects, ...losingBuyerProjects];
  const sortedProjects = sortMyProjects(
    myProjects,
    buyerProjects,
    sellerProjects,
    allLosingProjects,
    showWinners,
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
          myProjects,
        );

        const isMyLastProject = getIsMyLastProject(
          sortedProjects,
          project,
          myProjects,
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
              isMyProject={myProjects.includes(project)}
              isMyFirstProject={isMyFirstProject}
              isMyLastProject={isMyLastProject}
              isMySubsequentProject={
                getMyActiveProjects(sortedProjects, myProjects).includes(
                  project,
                ) && !isMyFirstProject
              }
              projectCost={getProjectCost(project)}
              discountOrBonus={project.discountOrBonus}
              products={project.products}
              accepted={project.accepted(projectCost)}
              showCosts={myProjects.includes(project) || isMarketSolvable}
              showWinners={showWinners}
              showSurpluses={showSurpluses}
              isMarketSolved={isMarketSolved}
            />
          </li>
        );
      })}
    </ul>
  );
};
