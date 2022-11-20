import React, { ChangeEvent, useEffect, useRef, useState } from "react";
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
    marketState,
    scenario,
    roleId,
    goToNextStage,
    setMarketState,
  } = useWalkthroughContext();

  const { isFormEnabled } = scenario.options;
  const isDivisibleInputEnabled = isFormEnabled && !!scenario.options.allowDivision;
  const isMarketSolvable = marketState >= WalkthroughMarketState.solvable;
  const priceInputNames = scenario
    .myProjects
    .map((_, index) => `project-${index}-price`);

  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [animatedPriceInputName, setAnimatedPriceInputName] = useState<string | undefined>(
    priceInputNames[0]
  );

  // Proceed to next market state when submit button is clicked.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextStage();
    setMarketState(WalkthroughMarketState.solvable);
  };

  const onInputChange = () => {
    if (!formRef.current) {
      return;
    }

    const inputs = [...formRef.current.querySelectorAll('input')];
    const firstInvalidInput = inputs.find((input) => !input.checkValidity());

    setAnimatedPriceInputName(firstInvalidInput?.name);
  };

  useEffect(() => {
    // For the case where the user submits the form and puts the market into a
    // solveable state, then clicks the back button.
    if (isFormEnabled) {
      setMarketState(WalkthroughMarketState.pending);
    }
  }, [isFormEnabled, setMarketState]);

  useEffect(() => {
    if (animatedPriceInputName) {
      return;
    }

    if (submitButtonRef.current) {
      submitButtonRef.current.focus();
    }
  }, [animatedPriceInputName]);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
      layout
      className="border-2 border-black px-5 py-4 rounded-lg w-full"
    >
      <div className="text-black text-xl">
        <p className="font-bold">
          My Project{scenario.myProjects.length ? 's' : ''}
        </p>
        <p>{roles[roleId].label}</p>
      </div>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        onChange={console.log}
        className="flex flex-col"
      >
        <ul>
          {scenario.myProjects.map((project, projectIndex) => {
            const projectValue = getProjectValue(project, roleId);

            return (
              <li
                key={project.title + project.subtitle}
                className={classNames(
                  'mt-3',
                  isMarketSolvable && project.isInactive ? 'opacity-30' : '',
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
                      name={priceInputNames[projectIndex]}
                      animate={isFormEnabled && animatedPriceInputName === priceInputNames[projectIndex]}
                      onChange={onInputChange}
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
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={!isFormEnabled && !isMarketSolvable}
              className={classNames(
                'w-full rounded-lg bg-[#848484] text-white text-xs py-2',
                isFormEnabled
                  ? 'hover:bg-black cursor-pointer'
                  : '',
                isFormEnabled && !animatedPriceInputName ? 'animate-scale-large' : '',
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
