import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';

type DescriptionBoxProps = {
  children?: ReactNode;
};

export const DescriptionBox: FC<DescriptionBoxProps> = ({
  children,
}: DescriptionBoxProps) => {
  const hide = !children;

  return (
    <motion.div
      data-testid="description-box"
      variants={fadeIn}
      initial="hidden"
      animate={hide ? 'hidden' : 'visible'}
      layout
      className="text-l"
    >
      <div className="bg-green-dark py-5 px-3 rounded-lg text-white">
        <div className="space-y-5 text-white">{children}</div>
      </div>
    </motion.div>
  );
};
