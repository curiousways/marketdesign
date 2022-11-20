import { WalkthroughsByRole } from "@/types/walkthrough";
import { genericWalkthroughs } from "./scenarios/generic";
import { buyerWalkthroughs } from "./scenarios/buyers";
import { sellerWalkthroughs } from "./scenarios/sellers";

export const walkthroughsByRole: WalkthroughsByRole = [
  {
    roleId: 'generic',
    walkthroughs: genericWalkthroughs,
  },
  {
    roleId: 'seller',
    walkthroughs: sellerWalkthroughs,
  },
  {
    roleId: 'buyer',
    walkthroughs: buyerWalkthroughs,
  },
];
