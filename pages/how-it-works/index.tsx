import type { NextPage } from "next";
import { walkthroughs } from "data/walkthroughs";
import Link from "next/link";

const HowItWorks: NextPage = () => (
  <ul>
    {walkthroughs.map((walkthrough) => (
      <li key={walkthrough.title}>
        <h2>Walkthrough {walkthrough.id}</h2>
        <p>{walkthrough.title}</p>
        <ul>
          {walkthrough.scenarios.map((scenario) => (
            <li key={scenario.title}>
              <Link
                href={{
                  pathname: '/how-it-works/[scenarioId]',
                  query: {
                    scenarioId: scenario.id,
                  },
                }}
              >
                <a>{scenario.id} {scenario.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

export default HowItWorks;
