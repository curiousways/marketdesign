import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getAllScenarioIds, isValidScenarioId } from "@/utils/walkthroughs";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { roles } from "data/roles";
import { Splodge } from "@/components/common/Splodge";
import { RoleId } from "@/types/roles";
import { classNames } from "@/utils/index";

interface HowItWorksScenarioParams extends ParsedUrlQuery {
  scenarioId: string;
};

interface HowItWorksScenarioProps {
  scenarioId: string;
}

type HowItWorksScenarioHeading = {
  roleId: RoleId;
  splogeIndex: number;
  splodgeColor: 'green' | 'brown',
}

const HEADINGS: HowItWorksScenarioHeading[] = [
  {
    roleId: 'seller',
    splogeIndex: 3,
    splodgeColor: 'green',
  },
  {
    roleId: 'buyer',
    splogeIndex: 1,
    splodgeColor: 'brown',
  }
];

const HowItWorksScenario: NextPage<HowItWorksScenarioProps> = ({
  scenarioId,
}) => (
  <main>
    <section className="flex flex-col items-center">
      <h1 className="text-6xl text-green-dark">Are you a...</h1>
      <ul className="w-full">
        {HEADINGS.map(({
          roleId,
          splogeIndex,
          splodgeColor,
        }, headingIndex) => (
          <li key={roleId} className="my-20">
            <Link
              href={{
                pathname: '/how-it-works/[scenarioId]/[roleId]',
                query: {
                  scenarioId,
                  roleId,
                },
              }}
            >
              <a>
                <div
                  className={classNames(
                    'xl:w-1/2 mx-10',
                    !!(headingIndex % 2) ? 'ml-auto' : '',
                  )}
                >
                  <Splodge
                    type="heading"
                    index={splogeIndex}
                    color={splodgeColor}
                    height={220}
                  >
                    <p className="text-4xl lg:text-6xl font-bold text-white">
                      {roles[roleId].label} ?
                    </p>
                  </Splodge>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </main>
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
