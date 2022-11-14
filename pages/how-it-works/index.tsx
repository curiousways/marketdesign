import type { NextPage } from "next";
import { walkthroughs } from "data/walkthroughs";
import Link from "next/link";
import Header from "@/components/common/Header";
import HeaderImg from "../../public/assets/images/how-it-works/header.png";
import HeaderThumb from "../../public/assets/images/how-it-works/header-thumb.png";
import { Splodge } from "@/components/common/Splodge";
import { classNames } from "@/utils/index";

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
        <li key={walkthrough.title} className="items-center w-full md:w-1/2 xl:w-1/3 p-5">
          <div className="max-w-[420px] mx-auto">
            <Splodge
              type="heading"
              index={walkthroughIndex}
              color="green"
              height={150}
            >
              <h2 className="text-3xl font-bold text-white">
                Walkthrough {walkthrough.id}
              </h2>
              <p className="text-xl text-white">
                {walkthrough.title}
              </p>
            </Splodge>
            <div className="mt-4">
              <Splodge
                type="content"
                index={walkthroughIndex}
                color="yellow"
                height={200}
              >
                <ul
                  className="text-green-dark text-xl py-5 ml-12"
                >
                  {walkthrough.scenarios.map((scenario, scenarioIndex) => {
                    const isLast = scenarioIndex < walkthrough.scenarios.length -1;

                    return (
                      <li
                        key={scenario.title}
                        className={classNames(isLast ? "mb-5" : '')}
                      >
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
                    )
                  })}
                </ul>
              </Splodge>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </>
);

export default HowItWorks;
