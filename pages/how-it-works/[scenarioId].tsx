import type {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";

import SideBar from "@/components/walkthroughs/sidebar/SideBar";
import MainContent from "@/components/walkthroughs/Main/MainContent";
import { ParsedUrlQuery } from "querystring";
import {
  getAllScenarioIds,
  isValidScenarioId,
} from "@/utils/walkthroughs";
import { WalkthroughProvider } from "@/context/WalkthroughContext";

interface HowItWorksScenarioParams extends ParsedUrlQuery {
  scenarioId: string;
};

interface HowItWorksScenarioProps {
  scenarioId: string;
}

const HowItWorksScenario: NextPage<HowItWorksScenarioProps> = ({
  scenarioId,
}) => (
  <WalkthroughProvider
    scenarioId={scenarioId}
  >
    <main>
      <div
        className="flex items-stretch font-poppins relative border-t border-green-dark min-h-screen"
      >
        <SideBar />
        <MainContent />
      </div>
    </main>
  </WalkthroughProvider>
);

export const getStaticPaths: GetStaticPaths<HowItWorksScenarioParams> = async () => ({
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
> = async ({ params }) => {
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