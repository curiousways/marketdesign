import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { ParsedUrlQuery } from 'querystring';
import { useCallback, useState } from 'react';
import { DemoBidder, DemoData, DemoState, DemoTrader } from '../../types/demo';
import { getDemoFiles } from '../../utils/demo';
import { SideBar } from '../../components/common/Sidebar';
import { ProjectsProvider } from '../../context/ProjectsContext';
import { Market } from '../../components/common/Market';
import { Result } from '../../types/result';
import { MarketState } from '../../types/market';
import { Project } from '../../types/project';
import { isProjectEqual } from '../../utils/walkthroughs';

const API_URL = 'https://marketdesign.herokuapp.com/solve/lindsay2018';

interface LiveDemoScenarioParams extends ParsedUrlQuery {
  slug: string;
}

interface LiveDemoScenarioProps {
  data: DemoData;
}

const convertBidderToProject = (
  bidder: DemoBidder,
  result?: Result,
): Project => {
  const { name: title } = bidder;
  const { q: products, v: cost } = bidder.bids[0];
  const { biodiversity, nutrients } = products;

  const discountOrBonus = result?.surplus_shares[title] ?? 0;
  const { winning = 0 } =
    result?.problem.bidders.find(({ name }) => name === title)?.bids[0] ?? {};

  return {
    title,
    cost: Math.abs(cost),
    products: {
      biodiversity: Math.abs(biodiversity),
      nutrients: Math.abs(nutrients),
    },
    accepted: () => {
      const acceptedPercentage = Math.abs(winning * 100);

      if ([100, 0].includes(acceptedPercentage)) {
        return !!acceptedPercentage;
      }

      return acceptedPercentage;
    },
    discountOrBonus: Math.round(Math.abs(discountOrBonus)),
  };
};

const isSellerBidder = (bidder: DemoBidder) => bidder.bids[0].v < 0;

const isBuyerBidder = (bidder: DemoBidder) => bidder.bids[0].v > 0;

const getSellerProjects = (
  bidders: DemoBidder[],
  myProject: Project,
  result?: Result,
): Project[] =>
  bidders
    .filter(isSellerBidder)
    .map((bidder) => convertBidderToProject(bidder, result))
    .filter((project) => !isProjectEqual(project, myProject));

const getBuyerProjects = (
  bidders: DemoBidder[],
  myProject: Project,
  result?: Result,
): Project[] =>
  bidders
    .filter(isBuyerBidder)
    .map((bidder) => convertBidderToProject(bidder, result))
    .filter((project) => !isProjectEqual(project, myProject));

const getProjectForTrader = (
  bidders: DemoBidder[],
  trader: DemoTrader,
  result?: Result,
): Project => {
  const projects = bidders.map((bidder) =>
    convertBidderToProject(bidder, result),
  );

  const project = projects.find(({ title }) => title === trader.name);

  if (!project) {
    throw new Error(`No bidder found with for name "${trader.name}"`);
  }

  return project;
};

const LiveDemoScenario: NextPage<LiveDemoScenarioProps> = ({ data }) => {
  const [marketState, setMarketState] = useState<MarketState>(0);
  const [result, setResult] = useState<Result>();

  // TODO: Swap states based on shuffle button etc. at the end of a scenario
  // eslint-disable-next-line
  const [demoState, setDemoState] = useState<DemoState>(data.states[0]);

  // TODO: Pick the playable trader from the map
  // eslint-disable-next-line
  const [playableTrader, setPlayableTrader] = useState<DemoTrader>(data.playable_traders[0]);

  const onSolveMarketClick = useCallback(async () => {
    if (!demoState) {
      throw new Error(
        'A demo state must be selected before the market is solved.',
      );
    }

    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(demoState),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setResult(await res.json());
    setMarketState(MarketState.solved);
  }, [demoState]);

  const onFormSubmit = useCallback(() => {
    setMarketState(MarketState.solvable);
  }, []);

  const myProject = getProjectForTrader(
    demoState.bidders,
    data.playable_traders[0],
    result,
  );

  const myProjects = myProject ? [myProject] : [];
  const roleId = playableTrader.role;
  const isMarketSolvable = marketState === MarketState.solvable;

  return (
    <ProjectsProvider>
      <main>
        <div className="flex items-stretch font-poppins relative border-t border-green-dark min-h-screen">
          <SideBar
            isFormEnabled={!!myProject && marketState === MarketState.pending}
            showDetailsWidget={!!myProject}
            title={data.title}
            sidebarContent={data.description}
            // TODO: Fill in these properties!
            projects={myProjects}
            onSolveMarketClick={onSolveMarketClick}
            onFormSubmit={onFormSubmit}
            roleId={roleId}
            showSolveMarketBtn={isMarketSolvable}
          />
          <Market
            showMap
            myProjects={myProjects}
            buyerProjects={getBuyerProjects(
              demoState.bidders,
              myProject,
              result,
            )}
            sellerProjects={getSellerProjects(
              demoState.bidders,
              myProject,
              result,
            )}
            showCosts={marketState > MarketState.solvable}
            showAllProjects={marketState < MarketState.solvable}
            showWinners={marketState >= MarketState.showing_winners}
            showSurpluses={marketState >= MarketState.showing_surpluses}
            isMarketSolved={marketState === MarketState.solved}
            roleId={roleId}
            showParticipants={!!myProject}
            // highlightedMapRegions={scenario.options.highlightedMapRegions}
          />
        </div>
      </main>
    </ProjectsProvider>
  );
};

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
