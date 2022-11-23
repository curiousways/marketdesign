import { motion } from 'framer-motion';

import { fadeInDown } from '@/utils/animations';

const LoadingOverlay = () => {
  return (
    <motion.div
      variants={fadeInDown}
      initial="hidden"
      whileInView="visible"
      className="absolute top-0 left-0 w-full h-full bg-black/70 z-10 flex justify-center items-center"
    >
      <div className="flex flex-col items-center">
        <p className="text-center text-white text-2xl font-bold">
          Determining Market Winners
        </p>

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

export default LoadingOverlay;
