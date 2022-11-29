import { FC } from 'react';
import { findProjectIndex, includesProject } from '@/utils/walkthroughs';
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
  losingProjects,
  roleId,
  showCosts,
  showWinners,
  showSurpluses,
  isMarketSolved,
}: MarketParticipantListProps) => {
  const { getProjectCost } = useProjectsContext();
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

        const groupedProjects = project.groupId
          ? sortedProjects.filter(({ groupId }) => groupId === project.groupId)
          : [];

        // The total cost for all projects in a grop is needed for the case
        // where a project comprises multple "sub-projects" (e.g. investor bidding).
        const totalCost = groupedProjects
          .map((groupedProject) => {
            const groupedProjectCost = getProjectCost(groupedProject);
            const accepted = groupedProject.accepted(groupedProjectCost);

            return typeof accepted === 'number'
              ? (accepted / 100) * groupedProjectCost
              : groupedProjectCost;
          })
          .reduce((a, b) => a + b, 0);

        const isGroupedProject = !!groupedProjects.length;

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
              showCosts={myProjects.includes(project) || showCosts}
              showWinners={showWinners}
              showSurpluses={showSurpluses}
              isMarketSolved={isMarketSolved}
              showResults={
                !isGroupedProject ||
                project === groupedProjects[groupedProjects.length - 1]
              }
              isGroupedProject={isGroupedProject}
              totalCost={totalCost}
            />
          </li>
        );
      })}
    </ul>
  );
};
