import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { ParsedUrlQuery } from 'querystring';
import { getAllScenarioIds, isValidScenarioId } from '@/utils/walkthroughs';
import { WalkthroughProvider } from '@/context/WalkthroughContext';
import { Walkthrough } from '../../components/common/Walkthrough';

interface HowItWorksScenarioParams extends ParsedUrlQuery {
  scenarioId: string;
}

interface HowItWorksScenarioProps {
  scenarioId: string;
}

const HowItWorksScenario: NextPage<HowItWorksScenarioProps> = ({
  scenarioId,
}) => (
  <WalkthroughProvider scenarioId={scenarioId}>
    <Walkthrough />
  </WalkthroughProvider>
);

export const getStaticPaths: GetStaticPaths<HowItWorksScenarioParams> = () => ({
  fallback: false,
  paths: getAllScenarioIds().map((scenarioId) => ({
    params: {
      scenarioId,
    },
  })),
});

export const getStaticProps: GetStaticProps<
  HowItWorksScenarioProps,
  HowItWorksScenarioParams
> = ({ params }) => {
  const { scenarioId } = params ?? {};

  // 404 if the scenario ID is invalid.
  if (!isValidScenarioId(scenarioId)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      scenarioId,
    },
  };
};

export default HowItWorksScenario;
