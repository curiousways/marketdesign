import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';
import { classNames } from '@/utils/index';
import { RoleId } from '@/types/roles';
import { roles } from '../../data/roles';
import { CreditWithIcon } from '../CreditWithIcon';
import { CostInput } from '../CostInput';
import { Project } from '../../types/project';
import { useProjectsContext } from '../../context/ProjectsContext';
import { MapRegion } from '../MapRegion';
import { MAP_INDICES } from '../../constants/map';
import { Biodiversity } from '../Biodiversity';
import { Nutrients } from '../Nutrients';
import { Credit } from '../Credit';
import { Checkbox } from '../Checkbox';

type ProjectDetailsProps = {
  projects: Project[];
  isFormEnabled?: boolean;
  isFormReviseEnabled?: boolean;
  isFormSubmitHidden?: boolean;
  hasFixedBids?: boolean;
  isDivisibleInputEnabled?: boolean;
  isDivisibleInputRequired?: boolean;
  showDivisibleInput?: boolean;
  onFormSubmit: () => void;
  onFormRevise?: () => void;
  roleId: RoleId;
  animateNextSteps?: boolean;
};

const MAP_REGION_ICON_SIZE = 50;

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
  if (project.fixedBid) {
    return project.fixedBid;
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
  isFormReviseEnabled,
  isFormSubmitHidden,
  hasFixedBids,
  isDivisibleInputEnabled,
  isDivisibleInputRequired,
  showDivisibleInput,
  onFormSubmit,
  onFormRevise,
  roleId,
  animateNextSteps,
}: ProjectDetailsProps) => {
  const { getProjectCost, setProjectCost, setIsProjectDivisible } =
    useProjectsContext();

  const { sharedCost } = projects.find((project) => !!project.sharedCost) ?? {};
  const divisibleInputRef = useRef<HTMLInputElement>(null);

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

    projects.forEach((project) => {
      setIsProjectDivisible(project, !!divisibleInputRef.current?.checked);
    });

    onFormSubmit();
  };

  const onRevise = (event: FormEvent) => {
    if (!isFormReviseEnabled) {
      return;
    }

    if (!formRef.current) {
      return;
    }

    formRef.current.reset();
    onFormRevise?.();
    event.preventDefault();
  };

  const isInvestorScenario = !!projects.some(
    (project) => !!project.costPerCredit,
  );

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
      layout
      className="border-2 border-black px-5 py-4 rounded-lg w-full"
      data-testid="project-details"
    >
      <div className="text-black text-l">
        <p className="font-bold">My Project{projects.length ? 's' : ''}</p>
        <p>{isInvestorScenario ? 'Investor' : roles[roleId].label}</p>
      </div>

      <form ref={formRef} onSubmit={onSubmit} className="flex flex-col">
        <ul className="relative">
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
                key={JSON.stringify(project)}
                className={classNames(
                  'mb-3',
                  project.isInactive ? 'opacity-30' : '',
                )}
              >
                {!!project.subtitle && (
                  <span className="flex justify-end text-sm underline">
                    {project.subtitle}
                  </span>
                )}
                <div className="flex gap-x-3 justify-between items-center">
                  {/* Selected map region(s) */}
                  {!project.costPerCredit && project.mapRegions && (
                    <div className="flex">
                      {project.mapRegions.map((mapRegion, _index, arr) => (
                        <MapRegion
                          isSmall
                          key={mapRegion}
                          region={mapRegion}
                          size={MAP_REGION_ICON_SIZE / arr.length}
                          index={MAP_INDICES[mapRegion.split('-')[0]]}
                          roleId={roleId}
                        />
                      ))}
                    </div>
                  )}

                  {/* Credits */}
                  <div className="flex gap-x-1">
                    {sharedCost ? (
                      <>
                        {project.products.biodiversity && (
                          <Biodiversity type="grey" />
                        )}
                        {project.products.nutrients && (
                          <Nutrients type="grey" />
                        )}
                      </>
                    ) : (
                      <>
                        <CreditWithIcon
                          count={project.products.biodiversity}
                          costPerCredit={project.costPerCredit}
                          Icon={<Biodiversity type="grey" />}
                        />
                        <CreditWithIcon
                          count={project.products.nutrients}
                          costPerCredit={project.costPerCredit}
                          Icon={<Nutrients type="grey" />}
                        />
                      </>
                    )}
                  </div>

                  {/* Project Value */}
                  <div>
                    <p className="font-light">
                      £{Math.round(projectValue).toLocaleString()}
                    </p>
                    {!!project.costPerCredit && (
                      <p className="text-xs">per credit</p>
                    )}
                  </div>

                  <div className="flex-1 max-w-[50%]">
                    <div className="flex flex-col items-end">
                      <CostInput
                        cost={project.cost}
                        disabled={!isFormEnabled || project.isInactive}
                        bid={hasFixedBids ? getProjectBid(project) : undefined}
                        value={value}
                        name={priceInputNames[projectIndex]}
                        animate={
                          !!isFormEnabled &&
                          animateNextSteps &&
                          animatedInputName === priceInputNames[projectIndex]
                        }
                        onInputChange={onCostInputChange}
                        onSelectChange={onCostInputChange}
                        placeholder={getCostInputPlaceholder(roleId)}
                      />
                      {!!project.costPerCredit && (
                        <p className="mt-1 text-xs">per credit</p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          {sharedCost && (
            <li className="absolute top-0 bottom-0 flex items-center">
              <Credit
                count={1}
                costPerCredit={sharedCost}
                className="inline-flex"
              />
            </li>
          )}
        </ul>

        <div className="flex items-center">
          {showDivisibleInput ? (
            <Checkbox
              ref={divisibleInputRef}
              required={isDivisibleInputRequired}
              name="is-divisible"
              disabled={!isDivisibleInputEnabled}
              onChange={onInputChange}
              className={classNames(
                isFormEnabled &&
                  animatedInputName === 'is-divisible' &&
                  isDivisibleInputEnabled &&
                  animateNextSteps
                  ? 'animate-scale-large'
                  : '',
              )}
            >
              Divisible
            </Checkbox>
          ) : (
            isInvestorScenario && (
              <span className="text-black opacity-30">Divisible</span>
            )
          )}
          <div className="relative w-[100px] ml-auto">
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={!isFormEnabled && !isFormReviseEnabled}
              onClick={onRevise}
              className={classNames(
                'w-full rounded-lg bg-[#848484] text-white text-xs py-2',
                isFormEnabled ? 'hover:bg-black cursor-pointer' : '',
                isFormEnabled && !animatedInputName && animateNextSteps
                  ? 'animate-scale-large'
                  : '',
                isFormSubmitHidden ? 'hidden' : '',
              )}
            >
              {isFormReviseEnabled ? 'Revise' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};
