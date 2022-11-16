import type { NextPage } from "next";
import Link from "next/link";
import Header from "@/components/common/Header";
import HeaderImg from "../../public/assets/images/how-it-works/header.png";
import HeaderThumb from "../../public/assets/images/how-it-works/header-thumb.png";
import { Splodge } from "@/components/common/Splodge";
import { createScenarioId } from "@/utils/walkthroughs";
import { walkthroughsByRole } from "data/walkthroughs";
import { roles } from "data/roles";

const HowItWorks: NextPage = () => (
  <>
    <Header
      title="How it works"
      description="A series of walkthroughs designed to introduce you to the Exeter-Lindsay model and all of it's features."
      mainImageSrc={HeaderImg}
      secondaryImageSrc={HeaderThumb}
    />
    {walkthroughsByRole.map(({ roleId, walkthroughs }) => (
      <section key={roleId} className="mt-16">
        <h2 className="heading-2 mx-6">{roles[roleId].label}</h2>
        <ul className="flex flex-wrap">
          {walkthroughs.map((walkthrough, walkthroughIndex) => (
            <li key={walkthrough.title} className="items-center w-full md:w-1/2 xl:w-1/3 p-5">
              <Link
                href={{
                  pathname: '/how-it-works/[scenarioId]',
                  query: {
                    scenarioId: createScenarioId(roleId, walkthroughIndex),
                  },
                }}
              >
                <a className="max-w-[420px] mx-auto">
                  <Splodge
                    type="heading"
                    index={walkthroughIndex}
                    color="green"
                    height={150}
                  >
                    <p className="text-3xl font-bold text-white">
                      Walkthrough {walkthroughIndex + 1}
                    </p>
                    <p className="text-xl text-white">
                      {walkthrough.title}
                    </p>
                  </Splodge>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </>
);

export default HowItWorks;
