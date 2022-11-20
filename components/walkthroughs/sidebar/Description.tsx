import { motion } from "framer-motion";

import { fadeIn } from "@/utils/animations";
import { useWalkthroughContext } from "@/context/WalkthroughContext";

const Description = () => {
  const { scenario, stage } = useWalkthroughContext();
  const sidebarContent = scenario.sidebarContent?.[stage];
  const hide = !sidebarContent;

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
          {sidebarContent}
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
