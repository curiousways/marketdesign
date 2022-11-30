import { FC } from 'react';
import {
  findProjectIndex,
  getGroupedProjects,
  includesProject,
} from '@/utils/project';
import { MarketParticipant } from '../MarketParticipant';
import { Project } from '../../../types/project';
import { useProjectsContext } from '../../../context/ProjectsContext';
import { RoleId } from '../../../types/roles';

type MarketParticipantListProps = {
  myProjects: Project[];
  buyerProjects: Project[];
  sellerProjects: Project[];
  losingProjects: Project[];
  roleId: RoleId;
  showCosts?: boolean;
  showWinners?: boolean;
  showSurpluses?: boolean;
  isMarketSolved?: boolean;
};

/**
 * Sort to bring "my projects" to the top of the list.
 */
const sortMyProjects = (
  myProjects: Project[],
  buyerProjects: Project[],
  sellerProjects: Project[],
  losingProjects: Project[],
  roleId: RoleId,
  showingWinners?: boolean,
) => {
  const allProjects =
    roleId === 'seller'
      ? [...sellerProjects, ...buyerProjects]
      : [...buyerProjects, ...sellerProjects];

  return allProjects.sort((a, b) => {
    const isLoserA = showingWinners && includesProject(a, losingProjects);
    const isLoserB = showingWinners && includesProject(b, losingProjects);
    const isMyProjectA = myProjects.includes(a);
    const isMyProjectB = myProjects.includes(b);

    return (
      Number(isLoserB ?? 0) - Number(isLoserA ?? 0) ||
      Number(isMyProjectB ?? 0) - Number(isMyProjectA ?? 0)
    );
  });
};

export const MarketParticipantList: FC<MarketParticipantListProps> = ({
  myProjects,
  buyerProjects,
  sellerProjects,
  losingProjects,
  roleId,
  showCosts,
  showWinners,
  showSurpluses,
  isMarketSolved,
}: MarketParticipantListProps) => {
  const { getProjectCost, getAcceptedProjectCost } = useProjectsContext();
  const sortedProjects = sortMyProjects(
    myProjects,
    buyerProjects,
    sellerProjects,
    losingProjects,
    roleId,
    showWinners,
  );

  const sortedLosingProjects = sortedProjects.filter((project) =>
    includesProject(project, losingProjects),
  );

  return (
    <ul>
      {sortedProjects.map((project) => {
        const groupedProjects = getGroupedProjects(sortedProjects, project);
        const isGroupedProject = groupedProjects.length > 1;
        const isFirstGroupedProject = groupedProjects.indexOf(project) === 0;
        const isLastGroupedProject =
          groupedProjects.indexOf(project) === groupedProjects.length - 1;

        const projectCost = getProjectCost(project);

        // The total cost for all projects in a grop is needed for the case
        // where a project comprises multple "sub-projects" (e.g. investor bidding).
        const totalCost = groupedProjects
          .map(getAcceptedProjectCost)
          .reduce((a, b) => a + b, 0);

        return (
          <li key={JSON.stringify(project)}>
            <MarketParticipant
              projectRoleId={
                includesProject(project, buyerProjects) ? 'buyer' : 'seller'
              }
              title={project.title}
              subtitle={project.subtitle}
              isLoser={includesProject(project, losingProjects)}
              loserIndex={findProjectIndex(project, sortedLosingProjects)}
              isMyProject={myProjects.includes(project)}
              isGroupedProject={isGroupedProject}
              isFirstGroupedProject={isFirstGroupedProject}
              isLastGroupedProject={isLastGroupedProject}
              isSubsequentGroupedProject={
                isGroupedProject && !isFirstGroupedProject
              }
              projectCost={getProjectCost(project)}
              totalCost={totalCost}
              discountOrBonus={project.discountOrBonus}
              products={project.products}
              accepted={project.accepted(projectCost)}
              showCosts={myProjects.includes(project) || showCosts}
              showWinners={showWinners}
              showSurpluses={showSurpluses}
              isMarketSolved={isMarketSolved}
              showResults={
                !isGroupedProject ||
                project === groupedProjects[groupedProjects.length - 1]
              }
            />
          </li>
        );
      })}
    </ul>
  );
};
