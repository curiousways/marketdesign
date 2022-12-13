import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { getDemoFiles } from '../../utils/demo';
import { DemoFile } from '../../types/demo';

type MarketSandboxIndexProps = {
  demoFiles: DemoFile[];
};

const groupByCategories = (demoFiles: DemoFile[]) => {
  const initialData: { [key in string]: DemoFile[] } = {};

  return demoFiles.reduce((acc, demoFile) => {
    demoFile.data.categories.forEach((category) => {
      acc[category] = [...(acc[category] ?? []), demoFile];
    });

    return acc;
  }, initialData);
};

const MarketSandboxIndex: NextPage<MarketSandboxIndexProps> = ({
  demoFiles,
}: MarketSandboxIndexProps) => (
  <div className="relative">
    <section className="mt-6 mx-10" id="scenarios">
      <h2 className="heading-2">List of Markets</h2>
      <ul>
        {Object.entries(groupByCategories(demoFiles)).map(
          ([categoryDescription, groupedDemoFiles]) => (
            <li key={categoryDescription}>
              <section className="mt-2 mb-8 ml-1">
                <h3 className="text-green-dark text-xl font-bold">
                  {categoryDescription}
                </h3>
                <ul className="flex flex-wrap">
                  {groupedDemoFiles.map((demoFile) => (
                    <li
                      key={demoFile.slug}
                      className="items-center w-full pt-3"
                    >
                      <Link
                        className="underline-offset-8 text-lg hover:underline"
                        href={{
                          pathname: '/market-sandbox/[slug]',
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
            </li>
          ),
        )}
      </ul>
    </section>
  </div>
);

export const getServerSideProps: GetServerSideProps<
  MarketSandboxIndexProps
> = async () => {
  const demoFiles = await getDemoFiles();

  return {
    props: {
      demoFiles,
    },
  };
};

export default MarketSandboxIndex;
