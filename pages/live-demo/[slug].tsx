import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { ParsedUrlQuery } from 'querystring';
import { DemoData } from '../../types/demo';
import { getDemoFiles } from '../../utils/demo';
import { SideBar } from '../../components/common/Sidebar';

interface LiveDemoScenarioParams extends ParsedUrlQuery {
  slug: string;
}

interface LiveDemoScenarioProps {
  data: DemoData;
}

const LiveDemoScenario: NextPage<LiveDemoScenarioProps> = ({ data }) => (
  <main>
    <div className="flex items-stretch font-poppins relative border-t border-green-dark min-h-screen">
      <SideBar
        showDetailsWidget
        title={data.title}
        sidebarContent={data.description}
        // TODO: Fill in these properties!
        projects={[]}
        onSolveMarketClick={() => {}}
        getProjectCost={() => 1}
        setProjectCost={() => {}}
        onFormSubmit={() => {}}
        roleId="buyer"
      />
    </div>
  </main>
);

export const getStaticPaths: GetStaticPaths<
  LiveDemoScenarioParams
> = async () => {
  const demoFiles = await getDemoFiles();

  return {
    fallback: false,
    paths: demoFiles.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps<
  LiveDemoScenarioProps,
  LiveDemoScenarioParams
> = async ({ params }) => {
  const demoFiles = await getDemoFiles();
  const demoFile = demoFiles.find(({ slug }) => slug === params?.slug);

  // 404 if the scenario ID is invalid.
  if (!demoFile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: demoFile.data,
    },
  };
};

export default LiveDemoScenario;
