import React from "react";
import { motion } from "framer-motion";

import { fadeIn } from "@/utils/animations";
import SellerVector from "@/components/walkthroughs/icons/SellerVector";
import BuyerVector from "@/components/walkthroughs/icons/BuyerVector";
import BiodiversityIconGray from "@/components/walkthroughs/icons/BiodiversityIcon";
import NutrientsIcon from "@/components/walkthroughs/icons/NutrientsIcon";
import { roles } from "data/roles";
import { classNames } from "@/utils/index";
import { useWalkthroughContext } from "@/context/WalkthroughContext";
import { WalkthroughMarketState, WalkthroughProject } from "@/types/walkthrough";
import Input from "./Input";
import { RoleId } from "@/types/roles";
import ProductCount from "./ProductCount";

const INPUT_NAME = 'project-cost';

const getProjectValue = (project: WalkthroughProject, roleId: RoleId) => {
  if (project.costPerCredit) {
    return project.costPerCredit;
  }

  if (!Array.isArray(project.cost)) {
    return project.cost;
  }

  if (roleId === 'buyer') {
    return Math.max(...project.cost);
  }

  return Math.min(...project.cost);
}

const Details = () => {
  const {
    stage,
    scenario,
    roleId,
    goToNextStage,
    setMarketState,
  } = useWalkthroughContext();

  const { isFormEnabled } = scenario.options;
  const isDivisibleInputEnabled = isFormEnabled && !!scenario.options.allowDivision;

  // Proceed to next market state when submit button is clicked.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextStage();
    setMarketState(WalkthroughMarketState.solvable);
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
      layout
      // onAnimationComplete={() => !isPresent && safeToRemove()}
      className="border-2 border-black px-5 py-4 rounded-lg w-full"
    >
      <div className="text-black text-xl">
        <p className="font-bold">
          My Project{scenario.myProjects.length ? 's' : ''}
        </p>
        <p>{roles[roleId].label}</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col"
      >
        <ul>
          {scenario.myProjects.map((project) => {
            const projectValue = getProjectValue(project, roleId);

            return (
              <li
                key={project.title + project.subtitle}
                className={classNames(
                  'mt-3',
                  scenario.options.setMyPrice && project.isInactive ? 'opacity-30' : '',
                )}
              >
                {!!scenario.myProjects.length && !!project.subtitle && (
                  <span className="flex justify-end text-sm underline">
                    {project.subtitle}
                  </span>
                )}
                <div className="flex gap-x-3 justify-between items-center">
                  {/* Vector */}
                  {!project.costPerCredit && (
                    roleId === "seller" ? <SellerVector /> : <BuyerVector />
                  )}

                  {/* Credits */}
                  <div className="flex gap-x-2">
                    <ProductCount
                      productCount={project.products.biodiversity}
                      costPerCredit={project.costPerCredit}
                      Icon={<BiodiversityIconGray />}
                    />
                    <ProductCount
                      productCount={project.products.nutrients}
                      costPerCredit={project.costPerCredit}
                      Icon={<NutrientsIcon />}
                    />
                  </div>

                  {/* Project Value */}
                  <p className="font-light">£{projectValue.toLocaleString()}</p>

                  <div className="flex-1 max-w-[50%]">
                    <Input
                      project={project}
                      populate={scenario.options.setMyPrice && !project.isInactive}
                      name={INPUT_NAME}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center mt-3">
          {scenario.options.showDivisibleInput && (
            <label
              className={classNames(
                'flex',
                isDivisibleInputEnabled ? 'cursor-pointer' : ''
              )}
            >
              <input
                required type="checkbox"
                disabled={!isDivisibleInputEnabled}
              />
              <span className="ml-2">Divisible</span>
            </label>
          )}
          <div className="relative w-[100px] ml-auto">
            {isFormEnabled && (
              <span className="flex h-3 w-3 absolute -right-1 -top-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            )}
            <button
              type="submit"
              disabled={!isFormEnabled}
              className={classNames(
                'w-full rounded-lg bg-[#848484] text-white text-xs py-2',
                isFormEnabled ? 'hover:bg-black cursor-pointer' : '',
              )}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Details;
