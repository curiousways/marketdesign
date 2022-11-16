import { WalkthroughsByRole } from "@/types/walkthrough";
import { buyerWalkthroughs } from "./scenarios/buyers";
import { sellerWalkthroughs } from "./scenarios/sellers";

export const walkthroughsByRole: WalkthroughsByRole = [
  {
    roleId: 'seller',
    walkthroughs: sellerWalkthroughs,
  },
  {
    roleId: 'buyer',
    walkthroughs: buyerWalkthroughs,
  },
];
