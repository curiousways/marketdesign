import { RoleId } from "@/types/roles";
import { roles } from "data/roles";
import { walkthroughsByRole } from "data/walkthroughs";
import { GetWalkthroughScenario, Walkthrough, WalkthroughProject, WalkthroughScenario } from "../types/walkthrough";

const SCENARIO_ID_DELIMITER = '-';

export const isValidScenarioId = (
  maybeScenarioId?: string,
): maybeScenarioId is string => (
  !!maybeScenarioId && getAllScenarioIds().includes(maybeScenarioId)
);

export const isValidRoleId = (
  maybeRoleId?: string,
): maybeRoleId is RoleId => (
  Object.keys(roles).includes(maybeRoleId as RoleId)
);

/**
 * Create an ID to identify and subsequently locate the scenario.
 *
 * The ID is made up of the role, the index of the walkthrough (plus one) and
 * the index of the scenario (plus one).
 *
 * If no scenario index is given we assume we want the first scenario of that
 * walkthrough.
 *
 * @example buyer-1-1
 * @example seller-2-1
 */
 export const createScenarioId = (
  roleId: RoleId,
  walkthroughIndex: number,
  scenarioIndex: number = 0,
) => [roleId, walkthroughIndex + 1, scenarioIndex + 1].join(SCENARIO_ID_DELIMITER);

/**
 * Parse a scenario ID to extract all the data about the scenario.
 */
export const parseScenarioId = (scenarioId: string): {
  walkthrough: Walkthrough;
  getScenario: GetWalkthroughScenario;
  roleId: RoleId;
  walkthroughIndex: number;
  scenarioIndex: number;
} => {
  const [
    roleId,
    walkthroughPart,
    scenarioPart,
  ] = scenarioId.split(SCENARIO_ID_DELIMITER);

  const invalidScenarioIdErr = new Error(`Not a valid scenario ID: ${scenarioId}`);
  const walkthroughNum = Number(walkthroughPart);
  const scenarioNum = Number(scenarioPart);

  if (
    !isValidRoleId(roleId) ||
    !Number.isFinite(walkthroughNum) ||
    !Number.isFinite(scenarioNum)
  ) {
    throw invalidScenarioIdErr;
  }

  const { walkthroughs } = walkthroughsByRole.find((item) => item.roleId === roleId) ?? {};
  const walkthroughIndex = walkthroughNum - 1;
  const scenarioIndex = scenarioNum - 1;
  const walkthrough = walkthroughs?.[walkthroughIndex];
  const getScenario = walkthrough?.scenarios[scenarioIndex];

  if (!getScenario) {
    throw invalidScenarioIdErr;
  }

  return {
    walkthrough,
    getScenario,
    roleId,
    walkthroughIndex,
    scenarioIndex,
  };
};

export const getAllScenarioIds = (): string[] => {
  const scenarioIds: string[] = [];

  walkthroughsByRole.forEach(({ roleId, walkthroughs }) => {
    walkthroughs.forEach((walkthrough, walkthroughIndex) => {
      walkthrough.scenarios.forEach((_, scenarioIndex) => {
        scenarioIds.push(createScenarioId(
          roleId,
          walkthroughIndex,
          scenarioIndex,
        ));
      });
    });
  });

  return scenarioIds;
};

export const getNextScenarioId = (
  scenarioId: string,
): string | undefined => {
  const {
    walkthrough,
    walkthroughIndex,
    scenarioIndex,
    roleId,
  } = parseScenarioId(scenarioId);

  const nextScenarioIndex = scenarioIndex + 1;
  const nextScenario = walkthrough.scenarios[nextScenarioIndex];

  if (!nextScenario) {
    return;
  }

  return createScenarioId(roleId, walkthroughIndex, nextScenarioIndex);
};

export const isMyProject = (
  scenario: WalkthroughScenario,
  project: WalkthroughProject,
) => scenario.myProjects.includes(project);
