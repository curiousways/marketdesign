import type { NextPage } from "next";
import { walkthroughs } from "data/walkthroughs";
import Link from "next/link";
import Header from "@/components/common/Header";
import HeaderImg from "../../public/assets/images/how-it-works/header.png";
import HeaderThumb from "../../public/assets/images/how-it-works/header-thumb.png";

const HowItWorks: NextPage = () => (
  <>
    <Header
      title="How it works"
      description="A series of walkthroughs designed to introduce you to the Exeter-Lindsay model and all of it's features."
      mainImageSrc={HeaderImg}
      secondaryImageSrc={HeaderThumb}
    />
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
  </>
);

export default HowItWorks;
