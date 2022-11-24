import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import { getAllMarkets } from '@/utils/demo';

import Header from '@/components/common/Header';
import { Splodge } from '@/components/common/Splodge';

import HeaderThumb from '../../public/assets/images/how-it-works/header-thumb.png';
import HeaderImg from '../../public/assets/images/how-it-works/header.png';

const Market: NextPage<{ marketList: string[] }> = ({ marketList }) => {
  return (
    <>
      <Header
        title="Live Demo"
        description="A series of walkthroughs designed to introduce you to the Exeter-Lindsay model and all of it's features."
        mainImageSrc={HeaderImg}
        secondaryImageSrc={HeaderThumb}
      />

      <ul className="flex flex-wrap mt-20">
        {marketList.map((market, index) => (
          <li
            key={market}
            className="items-center w-full md:w-1/2 xl:w-1/3 p-5"
          >
            <Link href={`live-demo/${market}`}>
              <a className="max-w-[420px] mx-auto">
                <Splodge
                  type="heading"
                  index={index}
                  color="green"
                  height={150}
                >
                  <p className="text-3xl font-bold text-white">{market}</p>
                </Splodge>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const marketList = getAllMarkets('data/demo');

  return {
    props: { marketList },
    revalidate: 3600, // revalidate every hour
  };
};

export default Market;
