import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { getDemoFiles } from '../../utils/demo';
import { DemoFile } from '../../types/demo';

type LiveDemoProps = {
  demoFiles: DemoFile[];
};

const HowItWorks: NextPage<LiveDemoProps> = ({ demoFiles }: LiveDemoProps) => (
  <div className="relative">
    <section className="mt-16" id="scenarios">
      <h2 className="heading-2 mx-6'">Scenarios</h2>
      <ul className="flex flex-wrap">
        {demoFiles.map((demoFile) => (
          <li
            key={demoFile.slug}
            className="items-center w-full md:w-1/2 xl:w-1/3 p-5"
          >
            <Link
              className="max-w-[420px] mx-auto"
              href={{
                pathname: '/live-demo/[slug]',
                query: {
                  slug: demoFile.slug,
                },
              }}
            >
              {demoFile.data.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export const getServerSideProps: GetServerSideProps<
  LiveDemoProps
> = async () => {
  const demoFiles = await getDemoFiles();

  return {
    props: {
      demoFiles,
    },
  };
};

export default HowItWorks;
