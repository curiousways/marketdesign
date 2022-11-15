import Buyer from "./Buyer";
import Seller from "./Seller";
import BuyerLost from "./BuyerLost";
import SellerLost from "./SellerLost";

import { WalkthroughData, Project} from "@/types/walkthrough";
import { RoleId } from "@/types/roles";

type Props = {
  buyerProjects: Project[];
  sellerProjects: Project[];
  stage: number;
  data: WalkthroughData;
  type?: "winners" | "losers";
  roleId: RoleId;
};

/**
 * Sort to bring "my projects" to the top of the list.
 */
const sortMyProjects = (projects: Project[]) => (
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
              <Seller
                key={project.title}
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
              <Buyer
                key={project.title}
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
        <div className="space-y-2">
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
