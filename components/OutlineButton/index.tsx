import { motion } from 'framer-motion';
import { FC, MouseEventHandler, ReactNode } from 'react';
import { fadeIn } from '@/utils/animations';
import { classNames } from '../../utils';

type OutlineButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler;
  className?: string;
};

export const OutlineButton: FC<OutlineButtonProps> = ({
  children,
  onClick,
  className,
}: OutlineButtonProps) => (
  <motion.button
    variants={fadeIn}
    initial="hidden"
    animate="visible"
    exit="hidden"
    layout
    onClick={onClick}
    className={classNames(
      'text-center border-2 border-black rounded-lg p-3 text-black text-l hover:bg-black hover:text-white duration-300',
      className,
    )}
  >
    {children}
  </motion.button>
);
