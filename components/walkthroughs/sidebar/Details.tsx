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
import { WalkthroughMarketState } from "@/types/walkthrough";
import Input from "./Input";

const INPUT_NAME = 'project-cost';

const Details = () => {
  const {
    stage,
    scenario,
    roleId,
    goToNextStage,
    setMarketState,
    getProjectCost,
  } = useWalkthroughContext();

  const isFormEnabled = stage === scenario.options.allow_button_click;
  const isDivisibleInputEnabled = isFormEnabled && !!scenario.options.allow_division;

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
            const projectValue = Array.isArray(project.cost)
              ? Math.max(...project.cost)
              : project.cost;

            return (
              <li
                key={project.title + project.subtitle}
                className={classNames(
                  'mt-3',
                  stage >= scenario.options.set_my_price && project.isInactive ? 'opacity-30' : '',
                )}
              >
                {!!scenario.myProjects.length && !!project.subtitle && (
                  <span className="flex justify-end text-sm underline">
                    {project.subtitle}
                  </span>
                )}
                <div className="flex gap-x-3 justify-between items-center">
                  {/* Vector */}
                  <>{roleId === "seller" ? <SellerVector /> : <BuyerVector />}</>

                  {/* Credits */}
                  <div className="flex gap-x-2">
                    {/* Biodiversity */}
                    <div className="relative">
                      <span className="absolute -right-1 top-0 text-[10px] text-black font-bold border border-black rounded-full bg-white w-[14px] h-[14px] flex justify-center items-center">
                        {project.products.biodiversity}
                      </span>
                      <BiodiversityIconGray />
                    </div>
                    {/* Nutrients */}
                    <div className="relative">
                      <span className="absolute -right-1 top-0 text-[10px] text-black font-bold border border-black rounded-full bg-white w-[14px] h-[14px] flex justify-center items-center">
                      {project.products.nutrients}
                      </span>
                      <NutrientsIcon />
                    </div>
                  </div>

                  {/* Project Value */}
                  <p className="font-light">£{projectValue.toLocaleString()}</p>

                  <div className="flex-1">
                    <Input
                      project={project}
                      populate={stage >= scenario.options.set_my_price && !project.isInactive}
                      name={INPUT_NAME}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center mt-3">
          {scenario.options.show_divisible_input && (
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
