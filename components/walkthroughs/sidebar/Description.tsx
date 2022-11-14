import { motion } from "framer-motion";

import { Data } from "@/types/index";
import { fadeIn } from "@/utils/animations";

type Props = {
  walkthrough: number;
  stage: number;
  data: Data | undefined;
  nextWalkthrough: () => void;
  html: string;
};

const Navigation = ({
  walkthrough,
  stage,
  data,
  nextWalkthrough,
  html,
}: Props) => {
  const hide = data?.options.hide_description.includes(stage);

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
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </motion.div>
  );
};

export default Navigation;
