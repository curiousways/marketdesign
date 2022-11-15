import BuyerLost from "./BuyerLost";
import SellerLost from "./SellerLost";

import { WalkthroughData, WalkthroughProject} from "@/types/walkthrough";
import { RoleId } from "@/types/roles";
import Project from "./Project";

type Props = {
  buyerProjects: WalkthroughProject[];
  sellerProjects: WalkthroughProject[];
  stage: number;
  data: WalkthroughData;
  type?: "winners" | "losers";
  roleId: RoleId;
};

/**
 * Sort to bring "my projects" to the top of the list.
 */
const sortMyProjects = (projects: WalkthroughProject[]) => (
  projects.sort((a, b) => Number(b.isMyProject ?? 0) - Number(a.isMyProject ?? 0))
);

const ParticipantsList = ({
  buyerProjects,
  sellerProjects,
  stage,
  data,
  roleId,
  type = "winners",
}: Props) => {
  const sortedBuyerProjects = sortMyProjects(buyerProjects);
  const sortedSellerProjects = sortMyProjects(sellerProjects);

  return (
    <>
      {type === "winners" && (
        <>
          {/* Sellers */}
          <div className="space-y-5">
            {sortedSellerProjects.map((project) => (
              <Project
                key={project.title}
                projectRoleId="seller"
                stage={stage}
                project={project}
                options={data.options}
                roleId={roleId}
              />
            ))}
          </div>

          {/* Buyers */}
          <div className="space-y-5">
            {sortedBuyerProjects.map((project) => (
              <Project
                key={project.title}
                projectRoleId="buyer"
                stage={stage}
                project={project}
                options={data.options}
                roleId={roleId}
              />
            ))}
          </div>
        </>
      )}

      {type === "losers" && (
        <div className="space-y-2 px-1">
          {/* Sellers */}
          <div className="space-y-2">
            {sortedSellerProjects.map((project) => (
              <SellerLost
                key={project.title}
                project={project}
              />
            ))}
          </div>

          {/* Buyers */}
          <div className="space-y-2">
            {sortedBuyerProjects.map((project) => (
              <BuyerLost
                key={project.title}
                project={project}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ParticipantsList;
