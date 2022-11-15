import { useState } from "react";
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  NextPage,
} from "next";

import SideBar from "@/components/walkthroughs/sidebar/SideBar";
import MainContent from "@/components/walkthroughs/Main/MainContent";
import { ParsedUrlQuery } from "querystring";
import {
  getAllScenarioIds,
  getScenario,
  getScenarioByRole,
  getWalkthroughForScenario,
  isValidRoleId,
  isValidScenarioId,
} from "@/utils/walkthroughs";
import { roles } from "data/roles";
import { RoleId } from "@/types/roles";

interface HowItWorksWalthroughParams extends ParsedUrlQuery {
  scenarioId: string;
  roleId: string;
};

interface HowItWorksWalthroughProps {
  scenarioId: string;
  roleId: RoleId;
}

const HowItWorksWalthrough: NextPage<HowItWorksWalthroughProps> = ({
  scenarioId,
  roleId,
}) => {
  const scenarioForRole = getScenarioByRole(scenarioId, roleId);
  const [stage, setStage] = useState(1);
  const sidebarContent = scenarioForRole.sidebarContent?.[stage];
  const { title } = getWalkthroughForScenario(scenarioId);

  return (
    <main>
      <div
        className="flex items-stretch font-poppins relative border-t border-green-dark min-h-screen"
      >
        <SideBar
          stage={stage}
          scenarioId={scenarioId}
          setStage={setStage}
          data={scenarioForRole}
          sidebarContent={sidebarContent}
          title={title}
        />
        <MainContent
          stage={stage}
          setStage={setStage}
          data={scenarioForRole}
        />
      </div>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths<HowItWorksWalthroughParams> = async () => {
  const paths: GetStaticPathsResult<HowItWorksWalthroughParams>['paths'] = [];

  // Build up the available paths for each scenario from the walkthrough data
  // (e.g /how-it-works/1-1/buyer)
  getAllScenarioIds().forEach((scenarioId) => {
    Object.keys(roles).forEach((roleId) => {
      paths.push({
        params: {
          scenarioId,
          roleId,
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  }
};

export const getStaticProps: GetStaticProps<
  HowItWorksWalthroughProps,
  HowItWorksWalthroughParams
> = async ({ params }) => {
  const { scenarioId, roleId } = params ?? {};

  // 404 if the scenario ID or role ID are invalid.
  if (!isValidScenarioId(scenarioId) || !isValidRoleId(roleId)) {
    return {
      notFound: true,
    };
  }

  const scenario = getScenario(scenarioId);

  // 404 if no scenario defined for the given role.
  if (!(roleId in scenario.roles)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      scenarioId,
      roleId,
    },
  };
};

export default HowItWorksWalthrough;
