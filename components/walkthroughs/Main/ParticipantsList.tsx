import Buyer from "./Buyer";
import Seller from "./Seller";
import BuyerLost from "./BuyerLost";
import SellerLost from "./SellerLost";

import { Data, Seller as SellerType, Buyer as BuyerType } from "@/types/walkthrough";

type Props = {
  buyers: BuyerType[];
  sellers: SellerType[];
  stage?: number;
  data?: Data;
  type?: "winners" | "losers";
};

const ParticipantsList = ({
  buyers,
  sellers,
  stage,
  data,
  type = "winners",
}: Props) => {
  return (
    <>
      {type === "winners" && (
        <>
          {/* Sellers */}
          <div className="space-y-5">
            {sellers?.map((seller) => (
              <Seller
                key={seller.id}
                stage={stage as number}
                seller={seller}
                options={data?.options as any}
              />
            ))}
          </div>

          {/* Buyers */}
          <div className="space-y-5">
            {buyers?.map((buyer) => (
              <Buyer
                key={buyer.id}
                stage={stage as number}
                buyer={buyer}
                options={data?.options as any}
              />
            ))}
          </div>
        </>
      )}

      {type === "losers" && (
        <div className="space-y-2">
          {/* Sellers */}
          <div className="space-y-2">
            {sellers?.map((seller) => (
              <SellerLost
                key={seller.id}
                seller={seller}
                options={data?.options as any}
              />
            ))}
          </div>

          {/* Buyers */}
          <div className="space-y-2">
            {buyers?.map((buyer) => (
              <BuyerLost
                key={buyer.id}
                buyer={buyer}
                options={data?.options as any}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ParticipantsList;
