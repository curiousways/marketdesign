import { RoleId } from "@/types/roles";
import { roles } from "data/roles";
import { walkthroughs } from "data/walkthroughs";
import { Scenario, Walkthrough, WalkthroughData } from "../types/walkthrough";

const getAllScenarios = (): Scenario[] => {
  const scenarios: Scenario[] = [];

  walkthroughs.forEach((walkthrough) => {
    walkthrough.scenarios.forEach((scenario) => {
      scenarios.push(scenario);
    });
  });

  return scenarios;
};

export const getAllScenarioIds = (): string[] => (
  getAllScenarios().map(({ id }) => id)
);

export const getScenario = (scenarioId: string): Scenario => {
  const scenario = getAllScenarios().find(({ id }) => id === scenarioId);

  if (!scenario) {
    throw new Error(`No scenario found with ID: ${scenarioId}`);
  }

  return scenario;
};

export const getScenarioByRole = (
  scenarioId: string,
  roleId: RoleId,
): WalkthroughData => {
  const scenario = getScenario(scenarioId);
  const scenarioByRole = scenario.roles[roleId];

  if (!scenarioByRole) {
    throw new Error(`No scenario found ID ${scenarioId} and role: ${roleId}`);
  }

  return scenarioByRole;
};

export const getWalkthroughForScenario = (scenarioId: string): Walkthrough => {
  const walkthrough = walkthroughs.find((walkthrough) => (
    walkthrough.scenarios.some((scenario) => scenario.id === scenarioId)
  ));

  if (!walkthrough) {
    throw new Error(`No walkthrough found for scenario with ID: ${scenarioId}`);
  }

  return walkthrough;
};

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
