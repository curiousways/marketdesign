import { RoleId } from "@/types/roles";
import { roles } from "data/roles";
import { walkthroughs } from "data/walkthroughs";
import { Scenario } from "../types/walkthrough";

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
