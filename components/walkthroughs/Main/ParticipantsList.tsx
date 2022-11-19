import { WalkthroughScenario, WalkthroughProject, WalkthroughMarketState} from "@/types/walkthrough";
import { RoleId } from "@/types/roles";
import Project from "./Project";
import { useWalkthroughContext } from "@/context/WalkthroughContext";
import { findProjectIndex, includesProject, isMyProject } from "@/utils/walkthroughs";

type Props = {
  buyerProjects: WalkthroughProject[];
  sellerProjects: WalkthroughProject[];
  losingBuyerProjects: WalkthroughProject[];
  losingSellerProjects: WalkthroughProject[];
  data: WalkthroughScenario;
  roleId: RoleId;
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
) => [...sellerProjects, ...buyerProjects].sort((a, b) => {
  const isLoserA = showingWinners && includesProject(a, losingProjects);
  const isLoserB = showingWinners && includesProject(b, losingProjects);
  const isMyProjectA = isMyProject(scenario, a);
  const isMyProjectB = isMyProject(scenario, b);

  return (
    Number(isLoserB ?? 0)
    - Number(isLoserA ?? 0)
  ) || (
    Number(isMyProjectB ?? 0)
    - Number(isMyProjectA ?? 0)
  );
});

const ParticipantsList = ({
  buyerProjects,
  sellerProjects,
  losingBuyerProjects,
  losingSellerProjects,
  data,
  roleId,
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

  return (
    <ul>
      {sortedProjects.map((project) => (
        <li key={project.title + project.subtitle}>
          <Project
            projectRoleId={includesProject(project, buyerProjects) ? 'buyer' : 'seller'}
            project={project}
            options={data.options}
            roleId={roleId}
            isLoser={includesProject(project, allLosingProjects)}
            loserIndex={findProjectIndex(project, allLosingProjects)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ParticipantsList;
