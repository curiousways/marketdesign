import { FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowButton } from '../ArrowButton';

type PaginationProps = {
  title: string;
  subtitle?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  onNextClick?: () => void;
  onPreviousClick?: () => void;
  animateNextSteps?: boolean;
};

const noop = () => {};

export const Pagination: FC<PaginationProps> = ({
  title,
  subtitle,
  hasNextPage,
  hasPreviousPage,
  onNextClick = noop,
  onPreviousClick = noop,
  animateNextSteps,
}: PaginationProps) => (
  <motion.div layout className="text-center text-l w-full mt-2">
    {!!subtitle && <p className="text-green-dark mb-1">{subtitle}</p>}
    <div className="flex gap-x-4 items-center justify-between">
      {/* Previous button */}
      <ArrowButton
        rotate
        onClick={onPreviousClick}
        hide={!hasPreviousPage}
        ariaLabel="Previous"
      />

      {!!title && (
        <div className="bg-green-dark text-white rounded-lg px-3 py-1 flex-1">
          <p>{title}</p>
        </div>
      )}

      {/* Next button */}
      <ArrowButton
        className={animateNextSteps ? 'animate-scale-large' : ''}
        onClick={onNextClick}
        hide={!hasNextPage}
        ariaLabel="Next"
      />
    </div>
  </motion.div>
);
