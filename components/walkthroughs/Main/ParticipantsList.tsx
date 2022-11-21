import {
  WalkthroughMarketState,
  WalkthroughProject,
  WalkthroughScenario,
} from '@/types/walkthrough';
import { useWalkthroughContext } from '@/context/WalkthroughContext';
import {
  findProjectIndex,
  includesProject,
  isMyProject,
} from '@/utils/walkthroughs';
import Project from './Project';

type Props = {
  buyerProjects: WalkthroughProject[];
  sellerProjects: WalkthroughProject[];
  losingBuyerProjects: WalkthroughProject[];
  losingSellerProjects: WalkthroughProject[];
  data: WalkthroughScenario;
};

/**
 * Sort to bring "my projects" to the top of the list.
 */
const sortMyProjects = (
  scenario: WalkthroughScenario,
  buyerProjects: WalkthroughProject[],
  sellerProjects: WalkthroughProject[],
  losingProjects: WalkthroughProject[],
  showingWinners: boolean,
) =>
  [...sellerProjects, ...buyerProjects].sort((a, b) => {
    const isLoserA = showingWinners && includesProject(a, losingProjects);
    const isLoserB = showingWinners && includesProject(b, losingProjects);
    const isMyProjectA = isMyProject(scenario, a);
    const isMyProjectB = isMyProject(scenario, b);

    return (
      Number(isLoserB ?? 0) - Number(isLoserA ?? 0) ||
      Number(isMyProjectB ?? 0) - Number(isMyProjectA ?? 0)
    );
  });

const getMyActiveProjects = (
  projects: WalkthroughProject[],
  scenario: WalkthroughScenario,
) => scenario.myProjects.filter((project) => projects.includes(project));

const getIsMyFirstProject = (
  projects: WalkthroughProject[],
  project: WalkthroughProject,
  scenario: WalkthroughScenario,
) => {
  const projectIndex = getMyActiveProjects(projects, scenario).indexOf(project);

  return projectIndex === 0;
};

const getIsMyLastProject = (
  projects: WalkthroughProject[],
  project: WalkthroughProject,
  scenario: WalkthroughScenario,
) => {
  const activeProjects = getMyActiveProjects(projects, scenario);
  const projectIndex = getMyActiveProjects(projects, scenario).indexOf(project);

  return projectIndex + 1 === activeProjects.length;
};

const ParticipantsList = ({
  buyerProjects,
  sellerProjects,
  losingBuyerProjects,
  losingSellerProjects,
  data,
}: Props) => {
  const { scenario, marketState } = useWalkthroughContext();
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

        return (
          <li key={project.title + project.subtitle}>
            <Project
              projectRoleId={
                includesProject(project, buyerProjects) ? 'buyer' : 'seller'
              }
              project={project}
              options={data.options}
              isLoser={includesProject(project, allLosingProjects)}
              loserIndex={findProjectIndex(project, sortedLosingProjects)}
              isMyFirstProject={isMyFirstProject}
              isMyLastProject={isMyLastProject}
              isMySubsequentProject={
                getMyActiveProjects(sortedProjects, scenario).includes(
                  project,
                ) && !isMyFirstProject
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ParticipantsList;
