import BuyerLost from "./BuyerLost";
import SellerLost from "./SellerLost";

import { WalkthroughScenario, WalkthroughProject} from "@/types/walkthrough";
import { RoleId } from "@/types/roles";
import Project from "./Project";
import { useWalkthroughContext } from "@/context/WalkthroughContext";
import { isMyProject } from "@/utils/walkthroughs";

type Props = {
  buyerProjects: WalkthroughProject[];
  sellerProjects: WalkthroughProject[];
  stage: number;
  data: WalkthroughScenario;
  type?: "winners" | "losers";
  roleId: RoleId;
};

/**
 * Sort to bring "my projects" to the top of the list.
 */
const sortMyProjects = (
  scenario: WalkthroughScenario,
  allProjects: WalkthroughProject[],
) => (
  allProjects.sort((a, b) => (
    Number(isMyProject(scenario, b) ?? 0) - Number(isMyProject(scenario, a) ?? 0)
  ))
);

const ParticipantsList = ({
  buyerProjects,
  sellerProjects,
  stage,
  data,
  roleId,
  type = "winners",
}: Props) => {
  const { scenario } = useWalkthroughContext();
  const sortedBuyerProjects = sortMyProjects(scenario, buyerProjects);
  const sortedSellerProjects = sortMyProjects(scenario, sellerProjects);

  return (
    <div className="z-10 space-y-5">
      {type === "winners" && (
        <>
          {/* Sellers */}
          {sortedSellerProjects.map((project) => (
            <Project
              key={project.title + project.subtitle}
              projectRoleId="seller"
              stage={stage}
              project={project}
              options={data.options}
              roleId={roleId}
            />
          ))}

          {/* Buyers */}
          {sortedBuyerProjects.map((project) => (
            <Project
            key={project.title + project.subtitle}
              projectRoleId="buyer"
              stage={stage}
              project={project}
              options={data.options}
              roleId={roleId}
            />
          ))}
        </>
      )}

      {type === "losers" && (
        <div className="px-2">
          {/* Sellers */}
          {sortedSellerProjects.map((project) => (
            <div
            key={project.title + project.subtitle}
              className="mb-2"
            >
              <SellerLost
                project={project}
              />
            </div>
          ))}

          {/* Buyers */}
          {sortedBuyerProjects.map((project) => (
            <div
              key={project.title + project.subtitle}
              className="mb-2"
            >
              <BuyerLost
                project={project}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticipantsList;
