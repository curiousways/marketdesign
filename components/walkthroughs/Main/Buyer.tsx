import { motion } from "framer-motion";

import { classNames } from "@/utils/index";

import { Project, WalkthroughOptions } from "@/types/walkthrough";
import { fadeInDown } from "@/utils/animations";

import HammerIcon from "../icons/HammerIcon";
import PoundcashTag from "../icons/PoundcashTag";
import { RoleId } from "@/types/roles";
import { ProjectTitle } from "./ProjectTitle";
import AdjustedProductCount from "./AdjustedProductCount";

type Props = {
  project: Project;
  stage: number;
  options: WalkthroughOptions;
  roleId: RoleId;
  className?: string;
};

const getAdjustedCost = (
  cost: number,
  accepted: boolean | number,
) => typeof accepted === 'number' ? (accepted / 100) * cost : cost;

const calculatePayment = (
  cost: number,
  discountOrBonus: number,
  accepted: boolean | number,
) => {
  const adjustedCost = getAdjustedCost(cost, accepted);

  return adjustedCost - discountOrBonus;
}

const Buyer = ({
  project,
  stage,
  options,
  className = "",
  roleId,
}: Props) => {
  const { cost, discountOrBonus, products, isMyProject, accepted } = project;
  const { show_bids, show_surpluses, show_final_payments, highlight_me } =
    options;

  const highlightMe = roleId === "buyer" && stage >= highlight_me && isMyProject;
  const showBids = stage >= show_bids;

  // Adjust metrics for projects that were only partially accepted.
  const adjustedCost = getAdjustedCost(cost, accepted);

  return (
    <motion.div
      variants={fadeInDown}
      initial="hidden"
      animate="visible"
      className={classNames(
        "relative px-10 py-5 rounded-lg flex min-w-[736px] overflow-hidden",
        highlightMe ? "border-2 border-black" : "",
        className
      )}
    >
      {/* Percentage-based background colour */}
      <div
        className="absolute h-full bg-brown top-0 left-0"
        style={{
          width: typeof accepted === 'number' ? `${accepted}%` : '100%'
        }}
      />

      {/* Full-width background colour */}
      <div
        className="absolute h-full w-full bg-brown top-0 left-0 opacity-50"
      />

      {/* Content */}
      <div className="z-10 items-center flex gap-x-10">
        <ProjectTitle
          showAcceptedPercentage={showBids}
          project={project}
        />

        {/* Products */}
        <div className="flex gap-x-10">
          {/* Biodiversity */}
          <div className="h-[66px] w-[66px] neo-shadow-brown rounded-lg flex items-center justify-center relative">
          <AdjustedProductCount
              count={products.biodiversity}
              accepted={accepted}
            />
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M8.81169 7.68831C8.81169 3.71831 12.03 0.5 16 0.5C19.97 0.5 23.1884 3.71832 23.1884 7.68831C23.1884 8.30864 23.6912 8.81169 24.3116 8.81169C28.2817 8.81169 31.5 12.03 31.5 16C31.5 19.97 28.2817 23.1884 24.3116 23.1884C23.6913 23.1884 23.1884 23.6913 23.1884 24.3116C23.1884 28.2817 19.97 31.5 16 31.5C12.03 31.5 8.81169 28.2817 8.81169 24.3116C8.81169 23.6912 8.30864 23.1884 7.68831 23.1884C3.71832 23.1884 0.5 19.97 0.5 16C0.5 12.03 3.71831 8.81169 7.68831 8.81169C8.30873 8.81169 8.81169 8.30873 8.81169 7.68831Z"
                stroke="white"
              />
            </svg>
          </div>

          {/* Nutrients */}
          <div className="h-[66px] w-[66px] neo-shadow-brown rounded-lg flex items-center justify-center relative">
            <AdjustedProductCount
              count={products.nutrients}
              accepted={accepted}
            />
            <svg
              width="22"
              height="32"
              viewBox="0 0 22 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M3.55382 28.7654L3.5538 28.7654C1.58991 27.0217 0.5 24.6703 0.5 22.2332C0.5 18.4038 2.4831 15.5249 5.04685 11.8362L5.05338 11.8268C6.98602 9.04625 9.20932 5.84757 10.9755 1.52781L10.9998 1.60143L11.0243 1.52726C12.7905 5.8473 15.0139 9.04614 16.9466 11.8268L16.9531 11.8361C19.5168 15.5249 21.5 18.4038 21.5 22.2332C21.5 24.6703 20.4101 27.0217 18.4462 28.7654C16.4949 30.498 13.7822 31.5 11 31.5C8.19741 31.5 5.51957 30.511 3.55382 28.7654Z"
                stroke="white"
              />
            </svg>
          </div>
        </div>

        <div className="flex gap-x-10">
          {/* Bid */}
          {showBids && (
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg border border-black px-1 w-[95px]"
            >
              <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white border border-black">
                <HammerIcon />
              </div>
              <div className="text-center text-sm relative -mt-2">
                <p className="text-light-grey">Bid</p>
                <p>£{adjustedCost.toLocaleString()}</p>
                {adjustedCost !== cost && (
                  <p className="text-brown opacity-50">£{cost.toLocaleString()}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Discount */}
          {stage >= show_surpluses && (
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg border border-black px-1 w-[95px]"
            >
              <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white border border-black">
                <p className="text-black">-</p>
              </div>
              <div className="text-center text-sm relative -mt-2">
                <p className="text-light-grey">Discount</p>
                <p>£{discountOrBonus.toLocaleString()}</p>
              </div>
            </motion.div>
          )}

          {/* Pays */}
          {stage >= show_final_payments && (
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg border border-black px-1 w-[95px]"
            >
              <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white border border-black">
                <PoundcashTag />
              </div>
              <div className="text-center text-sm relative -mt-2">
                <p className="text-light-grey">Pays</p>
                <p>£{(calculatePayment(cost, discountOrBonus, accepted)).toLocaleString()}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Buyer;
