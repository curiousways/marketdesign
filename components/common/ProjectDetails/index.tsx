import React, { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { fadeIn } from '@/utils/animations';
import SellerVector from '@/components/walkthroughs/icons/SellerVector';
import BuyerVector from '@/components/walkthroughs/icons/BuyerVector';
import BiodiversityIconGray from '@/components/walkthroughs/icons/BiodiversityIcon';
import NutrientsIcon from '@/components/walkthroughs/icons/NutrientsIcon';
import { classNames } from '@/utils/index';
import { RoleId } from '@/types/roles';
import { roles } from '../../../data/roles';
import { ProductCount } from '../ProductCount';
import { CostInput } from '../CostInput';
import { Project } from '../../../types/project';
import { isMyWalkthroughProject } from '../../../utils/walkthroughs';

type ProjectDetailsProps = {
  projects: Project[];
  isFormEnabled?: boolean;
  isDivisibleInputEnabled?: boolean;
  showDivisibleInput?: boolean;
  isMarketSolvable?: boolean;
  onFormSubmit: () => void;
  roleId: RoleId;
  getProjectCost: (project: Project) => number;
  setProjectCost: (project: Project, cost: number) => void;
};

const getProjectValue = (project: Project, roleId: RoleId) => {
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
};

const getProjectBid = (project: Project): number | undefined => {
  if (!isMyWalkthroughProject(project)) {
    return;
  }

  if (project.bid) {
    return project.bid;
  }

  return Array.isArray(project.cost) ? undefined : project.cost;
};

const getCostInputPlaceholder = (roleId: RoleId) => {
  if (roleId === 'buyer') {
    return 'Enter bid...';
  }

  if (roleId === 'seller') {
    return 'Enter offer...';
  }

  return;
};

export const ProjectDetails: FC<ProjectDetailsProps> = ({
  projects,
  isFormEnabled,
  isDivisibleInputEnabled,
  showDivisibleInput,
  isMarketSolvable,
  onFormSubmit,
  roleId,
  getProjectCost,
  setProjectCost,
}: ProjectDetailsProps) => {
  const priceInputNames = projects.map((_, index) => `project-${index}-price`);

  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [animatedInputName, setAnimatedInputName] = useState<
    string | undefined
  >(priceInputNames[0]);

  const onInputChange = () => {
    if (!formRef.current) {
      return;
    }

    const inputs = [...formRef.current.querySelectorAll('input')];
    const firstInvalidInput = inputs.find((input) => !input.checkValidity());

    setAnimatedInputName(firstInvalidInput?.name);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    onFormSubmit();
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
      layout
      className="border-2 border-black px-5 py-4 rounded-lg w-full"
    >
      <div className="text-black text-l">
        <p className="font-bold">My Project{projects.length ? 's' : ''}</p>
        <p>{roles[roleId].label}</p>
      </div>

      <form ref={formRef} onSubmit={onSubmit} className="flex flex-col">
        <ul>
          {projects.map((project, projectIndex) => {
            const projectValue = getProjectValue(project, roleId);
            const value = project.costPerCredit
              ? project.costPerCredit
              : getProjectCost(project);

            const onCostInputChange = (
              event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
            ) => {
              setProjectCost(project, Number(event.target.value));
              onInputChange();
            };

            return (
              <li
                key={project.title + project.subtitle}
                className={classNames(
                  'mb-3',
                  isMarketSolvable && project.isInactive ? 'opacity-30' : '',
                )}
              >
                {!!project.subtitle && (
                  <span className="flex justify-end text-sm underline">
                    {project.subtitle}
                  </span>
                )}
                <div className="flex gap-x-3 justify-between items-center">
                  {/* Vector */}
                  {!project.costPerCredit &&
                    (roleId === 'seller' ? <SellerVector /> : <BuyerVector />)}

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
                    <CostInput
                      cost={project.cost}
                      disabled={!isFormEnabled}
                      bid={getProjectBid(project)}
                      value={value}
                      name={priceInputNames[projectIndex]}
                      animate={
                        !!isFormEnabled &&
                        animatedInputName === priceInputNames[projectIndex]
                      }
                      onInputChange={onCostInputChange}
                      onSelectChange={onCostInputChange}
                      placeholder={getCostInputPlaceholder(roleId)}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center">
          {showDivisibleInput && (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label
              className={classNames(
                'flex select-none',
                isDivisibleInputEnabled ? 'cursor-pointer' : '',
                isFormEnabled &&
                  animatedInputName === 'is-divisible' &&
                  isDivisibleInputEnabled
                  ? 'animate-scale-large'
                  : '',
              )}
            >
              <span>
                <input
                  required={isDivisibleInputEnabled}
                  type="checkbox"
                  name="is-divisible"
                  disabled={!isDivisibleInputEnabled}
                  onChange={onInputChange}
                />
              </span>
              <span className="ml-2">Divisible</span>
            </label>
          )}
          <div className="relative w-[100px] ml-auto">
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={!isFormEnabled}
              className={classNames(
                'w-full rounded-lg bg-[#848484] text-white text-xs py-2',
                isFormEnabled ? 'hover:bg-black cursor-pointer' : '',
                isFormEnabled && !animatedInputName
                  ? 'animate-scale-large'
                  : '',
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
