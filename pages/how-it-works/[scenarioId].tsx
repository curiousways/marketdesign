import { useState } from "react";
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
  parseScenarioId,
} from "@/utils/walkthroughs";

interface HowItWorksScenarioParams extends ParsedUrlQuery {
  scenarioId: string;
};

interface HowItWorksScenarioProps {
  scenarioId: string;
}

const HowItWorksScenario: NextPage<HowItWorksScenarioProps> = ({
  scenarioId,
}) => {
  const { roleId, scenario, walkthrough } = parseScenarioId(scenarioId);
  const [stage, setStage] = useState(1);
  const sidebarContent = scenario.sidebarContent?.[stage];

  return (
    <main>
      <div
        className="flex items-stretch font-poppins relative border-t border-green-dark min-h-screen"
      >
        <SideBar
          stage={stage}
          scenarioId={scenarioId}
          roleId={roleId}
          setStage={setStage}
          data={scenario}
          sidebarContent={sidebarContent}
          title={walkthrough.title}
        />
        <MainContent
          stage={stage}
          setStage={setStage}
          data={scenario}
          roleId={roleId}
        />
      </div>
    </main>
  );
};

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
