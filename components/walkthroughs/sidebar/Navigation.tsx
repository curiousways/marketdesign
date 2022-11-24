import { motion } from 'framer-motion';

import { parseScenarioId } from '@/utils/walkthroughs';
import { useWalkthroughContext } from '@/context/WalkthroughContext';
import { ArrowButton } from '../../common/ArrowButton';

const Navigation = () => {
  const {
    walkthrough,
    scenarioId,
    hasPreviousStage,
    hasNextStage,
    goToPreviousStage,
    goToNextStage,
  } = useWalkthroughContext();

  const { walkthroughIndex } = parseScenarioId(scenarioId);

  return (
    <motion.div layout className="text-center text-l w-full mt-2">
      <p className="text-green-dark mb-1">WALKTHROUGH {walkthroughIndex + 1}</p>
      <div className="flex gap-x-4 items-center justify-between">
        {/* Previous button */}
        <ArrowButton
          rotate
          onClick={goToPreviousStage}
          hide={!hasPreviousStage}
        />

        <div className="bg-green-dark text-white rounded-lg px-3 py-1 flex-1">
          <p>{walkthrough.title}</p>
        </div>

        {/* Next button */}
        <ArrowButton
          className="animate-scale-large"
          onClick={goToNextStage}
          hide={!hasNextStage}
        />
      </div>
    </motion.div>
  );
};

export default Navigation;
