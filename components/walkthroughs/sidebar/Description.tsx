import { motion } from "framer-motion";

import { fadeIn } from "@/utils/animations";
import { ReactNode } from "react";

type Props = {
  // walkthrough: number;
  stage: number;
  // nextWalkthrough: () => void;
  children: ReactNode;
};

const Navigation = ({
  // walkthrough,
  stage,
  // nextWalkthrough,
  children,
}: Props) => {
  const hide = !children;

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate={hide ? "hidden" : "visible"}
      layout
      className="space-y-4 text-xl"
    >
      <div className="bg-green-dark py-7 px-3 rounded-lg text-white">
        <div
          className="space-y-5 text-white"
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Navigation;
