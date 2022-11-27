import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { getDemoFiles } from '../../utils/demo';
import { DemoFile } from '../../types/demo';

type LiveDemoIndexProps = {
  demoFiles: DemoFile[];
};

const groupByCategories = (demoFiles: DemoFile[]) => {
  const initialData: { [key in string]: DemoFile[] } = {};

  return demoFiles.reduce((acc, demoFile) => {
    const categoryDescription = demoFile.data.categories.join(', ');

    return {
      ...acc,
      [categoryDescription]: [...(acc[categoryDescription] ?? []), demoFile],
    };
  }, initialData);
};

const LiveDemoIndex: NextPage<LiveDemoIndexProps> = ({
  demoFiles,
}: LiveDemoIndexProps) => (
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
            </li>
          ),
        )}
      </ul>
    </section>
  </div>
);

export const getServerSideProps: GetServerSideProps<
  LiveDemoIndexProps
> = async () => {
  const demoFiles = await getDemoFiles();

  return {
    props: {
      demoFiles,
    },
  };
};

export default LiveDemoIndex;
