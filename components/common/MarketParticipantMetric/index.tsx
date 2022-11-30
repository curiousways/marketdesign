import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { fadeInDown } from '@/utils/animations';
import { classNames } from '../../../utils';

type MarketParticipantMetricProps = {
  heading: string;
  show: boolean;
  children: ReactNode;
  icon: ReactNode;
  shiftResults?: boolean;
  shiftOffset?: string;
};

export const MarketParticipantMetric: FC<MarketParticipantMetricProps> = ({
  heading,
  show,
  children,
  icon,
  shiftResults,
  shiftOffset,
}: MarketParticipantMetricProps) => (
  <motion.div
    variants={fadeInDown}
    initial="hidden"
    animate={show ? 'visible' : ''}
    className="w-[95px] z-20 relative"
  >
    <div
      style={{
        transform: shiftResults
          ? `translateY(calc(-50% - ${shiftOffset ?? '0px'}))`
          : undefined,
      }}
      className={classNames(
        'bg-white rounded-lg border border-black px-1 z-10 top-0 w-full',
        shiftResults ? 'absolute' : '',
      )}
    >
      <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white border border-black">
        {icon}
      </div>
      <div className="text-center text-sm relative -mt-2">
        <p className="text-light-grey">{heading}</p>
        {children}
      </div>
    </div>
  </motion.div>
);
