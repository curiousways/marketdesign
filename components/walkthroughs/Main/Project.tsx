import { motion } from "framer-motion";

import { classNames } from "@/utils/index";

import { WalkthroughProject, WalkthroughOptions, WalkthroughMarketState, WalkthroughScenario } from "@/types/walkthrough";
import { fadeInDown } from "@/utils/animations";

import HammerIcon from "../icons/HammerIcon";
import PoundcashTag from "../icons/PoundcashTag";
import { RoleId } from "@/types/roles";
import { ProjectTitle } from "./ProjectTitle";
import AdjustedProductCount from "./AdjustedProductCount";
import CartPlus from "../icons/CartPlus";
import { useWalkthroughContext } from "@/context/WalkthroughContext";
import { isMyProject } from "@/utils/walkthroughs";
import { CSSProperties } from "react";
import OfferIcon from "../icons/OfferIcon";

type Props = {
  project: WalkthroughProject;
  projectRoleId: 'buyer' | 'seller';
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
  projectRoleId: RoleId,
) => {
  const adjustedCost = getAdjustedCost(cost, accepted);

  if (projectRoleId === 'buyer') {
    return adjustedCost - discountOrBonus;
  }

  return adjustedCost + discountOrBonus;
}

const isMyFirstProject = (
  project: WalkthroughProject,
  scenario: WalkthroughScenario,
) => {
  const projectIndex = scenario.myProjects.indexOf(project);

  return projectIndex === 0;
}

const isMyLastProject = (
  project: WalkthroughProject,
  scenario: WalkthroughScenario,
) => {
  const projectIndex = scenario.myProjects.indexOf(project);

  return projectIndex + 1 === scenario.myProjects.length;
}

const getMyProjectStyles = (
  project: WalkthroughProject,
  scenario: WalkthroughScenario,
): CSSProperties => {
  const borderRadius = '0.5rem';
  const borderWidth = '2px';
  const borderColor = 'black';
  const borderStyle = 'solid';

  if (!isMyProject(scenario, project)) {
    return { borderRadius }
  }

  const myProjectStyles: CSSProperties = {
    borderRightColor: borderColor,
    borderLeftColor: borderColor,
    borderRightStyle: borderStyle,
    borderLeftStyle: borderStyle,
    borderRightWidth: borderWidth,
    borderLeftWidth: borderWidth,
  };

  const isFirst = isMyFirstProject(project, scenario);
  const isLast = isMyLastProject(project, scenario);

  if (isFirst) {
    Object.assign(myProjectStyles, {
      borderTopColor: borderColor,
      borderTopStyle: borderStyle,
      borderTopWidth: borderWidth,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    });
  }

  if (isLast) {
    Object.assign(myProjectStyles, {
      borderBottomColor: borderColor,
      borderBottomStyle: borderStyle,
      borderBottomWidth: borderWidth,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    });

    if (!isFirst) {
      Object.assign(myProjectStyles, {
        marginTop: 0,
      });
    }
  }

  return myProjectStyles;
};

const Project = ({
  project,
  projectRoleId,
  stage,
  options,
  className = "",
}: Props) => {
  const { marketState, scenario, getProjectCost } = useWalkthroughContext();
  const { discountOrBonus, products, accepted } = project;
  const { showCosts } = options;

  const showAcceptedState = marketState >= WalkthroughMarketState.showing_winners;
  const projectCost = getProjectCost(project);
  const acceptedCost = accepted(projectCost);
  const isNotAccepted = showAcceptedState && !acceptedCost;
  const isBuyer = projectRoleId === 'buyer';

  // Define some colour classes.
  const shadowColor = isBuyer ? 'neo-shadow-brown' : 'neo-shadow-green';
  const backgroundColor = isBuyer ? 'bg-brown' : 'bg-green-light';
  const textColor = isBuyer ? 'text-brown' : 'text-green-light';
  const dividerColor = isBuyer ? 'border-brown' : 'border-green-light';

  // Adjust metrics for projects that were only partially accepted.
  const adjustedCost = getAdjustedCost(projectCost, acceptedCost);

  const isMySubsequentProject = (
    isMyProject(scenario, project) &&
    !isMyFirstProject(project, scenario)
  );

  return (
    <motion.div
      variants={fadeInDown}
      initial="hidden"
      animate="visible"
      style={getMyProjectStyles(project, scenario)}
      className="overflow-hidden"
    >
      {/* Add a divider between multiple user projects. */}
      {isMySubsequentProject && (
        <div className={`border-t-2 border-dashed ${dividerColor} w-full`} />
      )}

      <div
        className={classNames(
          "relative px-10 py-5 flex",
          isNotAccepted ? 'opacity-30' : '',
          className,
        )}
      >
        {/* Percentage-based background colour */}
        <div
          className={`absolute h-full ${backgroundColor} top-0 left-0`}
          style={{
            width: typeof acceptedCost === 'number' && showAcceptedState
              ? `${acceptedCost}%`
              : '100%'
          }}
        />

        {/* Full-width background colour */}
        <div
          className={`absolute h-full w-full ${backgroundColor} top-0 left-0 opacity-50`}
        />

        {/* Content */}
        <div className="z-10 items-center flex gap-x-10 justify-between w-full">
          <ProjectTitle
            acceptedCost={acceptedCost}
            showCosts={showCosts}
            project={project}
            hideMainTitle={isMySubsequentProject}
          />

          {/* Products */}
          <div className="flex gap-x-10 flex-[20%]">
            {/* Biodiversity */}
            {typeof products.biodiversity === 'number' && (
              <div
                className={`h-[66px] w-[66px] rounded-lg flex items-center justify-center relative ${shadowColor}`}
              >
                <AdjustedProductCount
                  count={products.biodiversity}
                  accepted={acceptedCost}
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
            )}

            {/* Nutrients */}
            {typeof products.nutrients === 'number' && (
              <div
                className={`h-[66px] w-[66px] ${shadowColor} rounded-lg flex items-center justify-center relative`}
              >
                <AdjustedProductCount
                  count={products.nutrients}
                  accepted={acceptedCost}
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
            )}
          </div>

          <div className="flex gap-x-10 flex-[50%]">
            {/* Bid */}
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate={showCosts ? 'visible' : '' }
              className="bg-white rounded-lg border border-black px-1 w-[95px]"
            >
              <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white border border-black">
                {isBuyer ? <HammerIcon /> : <OfferIcon />}
              </div>
              <div className="text-center text-sm relative -mt-2">
                <p className="text-light-grey">
                  {isBuyer ? 'Bid' : 'Offer'}
                </p>
                <p>£{adjustedCost.toLocaleString()}</p>
                {adjustedCost !== projectCost && (
                  <p className={`${textColor} opacity-50`}>
                    £{projectCost.toLocaleString()}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Discount */}
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate={
                marketState >= WalkthroughMarketState.showing_surpluses && !isNotAccepted ? 'visible' : ''
              }
              className="bg-white rounded-lg border border-black px-1 w-[95px]"
            >
              <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white border border-black">
                <p className="text-black">
                  {isBuyer ? '-' : '+'}
                </p>
              </div>
              <div className="text-center text-sm relative -mt-2">
                <p className="text-light-grey">
                  {isBuyer ? 'Discount' : 'Bonus'}
                </p>
                <p>£{discountOrBonus.toLocaleString()}</p>
              </div>
            </motion.div>

            {/* Pays */}
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate={
                marketState === WalkthroughMarketState.solved && !isNotAccepted ? 'visible' : ''
              }
              className="bg-white rounded-lg border border-black px-1 w-[95px]"
            >
              <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white border border-black">
                {isBuyer ? <PoundcashTag /> : <CartPlus />}
              </div>
              <div className="text-center text-sm relative -mt-2">
                <p className="text-light-grey">
                  {isBuyer ? 'Pays' : 'Received'}
                </p>
                <p>
                  £{(calculatePayment(
                    projectCost,
                    discountOrBonus,
                    accepted(projectCost),
                    projectRoleId,
                  )).toLocaleString()}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;
