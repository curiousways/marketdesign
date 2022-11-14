import type { NextPage } from "next";
import { walkthroughs } from "data/walkthroughs";
import Link from "next/link";
import Header from "@/components/common/Header";
import HeaderImg from "../../public/assets/images/how-it-works/header.png";
import HeaderThumb from "../../public/assets/images/how-it-works/header-thumb.png";
import { Splodge } from "@/components/common/Splodge";

const HowItWorks: NextPage = () => (
  <>
    <Header
      title="How it works"
      description="A series of walkthroughs designed to introduce you to the Exeter-Lindsay model and all of it's features."
      mainImageSrc={HeaderImg}
      secondaryImageSrc={HeaderThumb}
    />
    <ul className="flex flex-wrap justify-around mt-16">
      {walkthroughs.map((walkthrough, walkthroughIndex) => (
        <li key={walkthrough.title} className="items-center lg:w-1/2 xl:w-1/3 p-5">
          <div className="max-w-[400px]">
            <Splodge index={walkthroughIndex} color="green">
              <h2 className="text-3xl font-bold text-white">
                Walkthrough {walkthrough.id}
              </h2>
              <p className="text-xl text-white">
                {walkthrough.title}
              </p>
            </Splodge>
          </div>
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
