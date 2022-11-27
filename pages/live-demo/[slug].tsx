import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { DemoData } from '../../types/demo';
import { getDemoFiles } from '../../utils/demo';
import { ProjectsProvider } from '../../context/ProjectsContext';
import { LiveDemo } from '../../components/common/LiveDemo';

interface LiveDemoScenarioParams extends ParsedUrlQuery {
  slug: string;
}

interface LiveDemoScenarioProps {
  data: DemoData;
}

const LiveDemoScenario: NextPage<LiveDemoScenarioProps> = ({ data }) => (
  <ProjectsProvider>
    <LiveDemo data={data} />
  </ProjectsProvider>
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
