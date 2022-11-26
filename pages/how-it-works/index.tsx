import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/common/Header';
import { Splodge } from '@/components/common/Splodge';
import { createScenarioId } from '@/utils/walkthroughs';
import { walkthroughsByRole } from 'data/walkthroughs';
import FieldsImg from '../../public/assets/images/how-it-works/fields.png';
import HeaderThumb from '../../public/assets/images/how-it-works/header-thumb.png';
import HeaderImg from '../../public/assets/images/how-it-works/header.png';
import { RoleId } from '../../types/roles';

const getSectionTitle = (roleId: RoleId) => {
  if (roleId === 'seller') {
    return 'Landholder';
  }

  if (roleId === 'buyer') {
    return 'Developer or Investor';
  }

  return null;
};

const HowItWorks: NextPage = () => (
  <>
    <Header
      title="How it works"
      description="A series of walkthroughs designed to introduce you to the Exeter-Lindsay model and all of it's features."
      mainImageSrc={HeaderImg}
      secondaryImageSrc={HeaderThumb}
    />
    <div className="relative">
      {walkthroughsByRole.map(({ roleId, walkthroughs }) => {
        const sectionTitle = getSectionTitle(roleId);

        return (
          <section key={roleId} className="mt-16" id={roleId}>
            {sectionTitle && <h2 className="heading-2 mx-6">{sectionTitle}</h2>}
            <ul className="flex flex-wrap">
              {walkthroughs.map((walkthrough, walkthroughIndex) => (
                <li
                  key={walkthrough.title}
                  className="items-center w-full md:w-1/2 xl:w-1/3 p-5"
                >
                  <Link
                    className="max-w-[420px] mx-auto"
                    href={{
                      pathname: '/how-it-works/[scenarioId]',
                      query: {
                        scenarioId: createScenarioId(roleId, walkthroughIndex),
                      },
                    }}
                  >
                    <Splodge
                      type="heading"
                      index={walkthroughIndex}
                      color="green"
                      height={150}
                    >
                      <p className="text-3xl font-bold text-white">
                        Walkthrough {walkthroughIndex + 1}
                      </p>
                      <p className="text-xl text-white">{walkthrough.title}</p>
                    </Splodge>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <div className="absolute bottom-0 right-0 -z-10 flex">
        <Image
          src={FieldsImg}
          alt=""
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
    </div>
  </>
);

export default HowItWorks;
