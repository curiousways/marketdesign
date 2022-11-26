import { FC } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';

type LoadingOverlayProps = {
  text?: string;
};

export const LoadingOverlay: FC<LoadingOverlayProps> = ({
  text,
}: LoadingOverlayProps) => {
  if (!text) {
    return null;
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center"
    >
      <div className="flex flex-col items-center">
        <p className="text-center text-white text-2xl font-bold">{text}</p>

        <div className="lds-ellipsis inline-block relative w-[80px] h-[80px]">
          <div className="bg-green-light absolute top-[33px] left-[8px] w-[15px] h-[15px] rounded-full" />
          <div className="bg-blue-light absolute top-[33px] left-[8px] w-[15px] h-[15px] rounded-full" />
          <div className="bg-dark-grey absolute top-[33px] left-[32px] w-[15px] h-[15px] rounded-full" />
          <div className="bg-dark-grey absolute top-[33px] left-[56px] w-[15px] h-[15px] rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};
