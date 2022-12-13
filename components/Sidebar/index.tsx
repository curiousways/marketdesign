import { FC, MouseEventHandler, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { fadeIn } from '@/utils/animations';
import { Pagination } from '../Pagination';
import { DescriptionBox } from '../DescriptionBox';
import { ProjectDetails } from '../ProjectDetails';
import { RoleId } from '../../types/roles';
import { Project } from '../../types/project';
import { classNames } from '../../utils';

type SidebarProps = {
  title: string;
  subtitle?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  onNextClick?: () => void;
  onPreviousClick?: () => void;
  showSolveMarketBtn?: boolean;
  showDetailsWidget?: boolean;
  onSolveMarketClick: MouseEventHandler;
  sidebarContent?: ReactNode;
  isFormEnabled?: boolean;
  isFormReviseEnabled?: boolean;
  isFormSubmitHidden?: boolean;
  animateNextSteps?: boolean;
  hasFixedBids?: boolean;
  isDivisibleInputEnabled?: boolean;
  showDivisibleInput?: boolean;
  onFormSubmit: () => void;
  onFormRevise?: () => void;
  roleId?: RoleId;
  projects: Project[];
};

export const SideBar: FC<SidebarProps> = ({
  title,
  subtitle,
  hasNextPage,
  hasPreviousPage,
  onNextClick,
  onPreviousClick,
  showSolveMarketBtn,
  showDetailsWidget,
  onSolveMarketClick,
  sidebarContent,
  isFormEnabled,
  isFormReviseEnabled,
  isFormSubmitHidden,
  animateNextSteps,
  hasFixedBids,
  isDivisibleInputEnabled,
  showDivisibleInput,
  onFormSubmit,
  onFormRevise,
  roleId,
  projects,
}: SidebarProps) => (
  <div className="w-1/3 max-w-[434px] py-4 px-5">
    <AnimatePresence>
      <div
        key="sidebar-animation"
        className="gap-y-4 flex flex-col items-center"
      >
        {showDetailsWidget && roleId && (
          <ProjectDetails
            isFormEnabled={isFormEnabled}
            isFormReviseEnabled={isFormReviseEnabled}
            isFormSubmitHidden={isFormSubmitHidden}
            hasFixedBids={hasFixedBids}
            isDivisibleInputEnabled={isDivisibleInputEnabled}
            showDivisibleInput={showDivisibleInput}
            onFormSubmit={onFormSubmit}
            onFormRevise={onFormRevise}
            roleId={roleId}
            projects={projects}
            animateNextSteps={animateNextSteps}
          />
        )}

        {/* Solve Market Button */}
        {showSolveMarketBtn && (
          <motion.button
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            layout
            onClick={onSolveMarketClick}
            className={classNames(
              'text-center border-2 border-black rounded-lg p-3 text-black text-l hover:bg-black hover:text-white duration-300',
              animateNextSteps ? 'animate-scale' : '',
            )}
          >
            Solve Market
          </motion.button>
        )}

        {/* Navigation with next and previous buttons */}
        <Pagination
          title={title}
          subtitle={subtitle}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
          animateNextSteps={animateNextSteps}
        />

        {/* Walkthrough Description text */}
        <DescriptionBox>{sidebarContent}</DescriptionBox>
      </div>
    </AnimatePresence>
  </div>
);
