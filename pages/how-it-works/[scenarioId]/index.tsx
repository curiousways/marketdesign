import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getAllScenarioIds, isValidScenarioId } from "@/utils/walkthroughs";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { roles } from "data/roles";

interface HowItWorksScenarioParams extends ParsedUrlQuery {
  scenarioId: string;
};

interface HowItWorksScenarioProps {
  scenarioId: string;
}

const HowItWorksScenario: NextPage<HowItWorksScenarioProps> = ({
  scenarioId,
}) => (
  <ul>
    {Object.entries(roles).map(([roleId, roleData]) => (
      <li key={roleId}>
        <Link
          href={{
            pathname: '/how-it-works/[scenarioId]/[roleId]',
            query: {
              scenarioId,
              roleId,
            },
          }}
        >
          <a>{roleData.label}</a>
        </Link>
      </li>
    ))}
  </ul>
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
