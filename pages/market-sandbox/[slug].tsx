import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { DemoData } from '../../types/demo';
import { getDemoFiles } from '../../utils/demo';
import { ProjectsProvider } from '../../context/ProjectsContext';
import { MarketSandbox } from '../../components/MarketSandbox';

interface MarketSandboxScenarioParams extends ParsedUrlQuery {
  slug: string;
}

interface MarketSandboxScenarioProps {
  data: DemoData;
}

const MarketSandboxScenario: NextPage<MarketSandboxScenarioProps> = ({
  data,
}) => (
  <ProjectsProvider>
    <MarketSandbox data={data} />
  </ProjectsProvider>
);

export const getStaticPaths: GetStaticPaths<
  MarketSandboxScenarioParams
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
  MarketSandboxScenarioProps,
  MarketSandboxScenarioParams
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

export default MarketSandboxScenario;
