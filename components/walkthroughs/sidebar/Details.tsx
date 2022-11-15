import React from "react";
import { motion } from "framer-motion";

import { WalkthroughData } from "@/types/walkthrough";
import { fadeIn } from "@/utils/animations";

import SellerVector from "@/components/walkthroughs/icons/SellerVector";
import BuyerVector from "@/components/walkthroughs/icons/BuyerVector";
import BiodiversityIconGray from "@/components/walkthroughs/icons/BiodiversityIcon";
import NutrientsIcon from "@/components/walkthroughs/icons/NutrientsIcon";
import { RoleId } from "@/types/roles";
import { roles } from "data/roles";
import { classNames } from "@/utils/index";

type Props = {
  next: () => void;
  stage: number;
  data: WalkthroughData;
  roleId: RoleId;
};

const Details = ({ data, stage, next, roleId }: Props) => {
  const isFormEnabled = stage === data.options.allow_button_click;
  const isDivisibleInputEnabled = isFormEnabled && !!data.options.allow_division;

  // Proceed to next stage when submit button is clicked
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    next();
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
        <p className="font-bold">My Project</p>
        <p>{roles[roleId].label}</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col"
      >
        <ul>
          {data.myProjects.map((project, projectIndex) => (
            <li key={projectIndex}>
              <div className="mt-3 flex gap-x-3 justify-between items-center">
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

                {/* Project Cost */}
                <p className="font-light">£{project.cost.toLocaleString()}</p>

                <input
                  type="text"
                  placeholder="Enter offer..."
                  className="flex-1 text-sm text-center inline-block rounded-lg py-2 bg-[#e8e8e8]"
                  value={stage >= data.options.set_my_price ? project.cost : ''}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          {data.options.show_divisible_input && (
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
