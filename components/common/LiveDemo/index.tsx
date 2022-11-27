import type { NextPage } from 'next';
import { useCallback, useState } from 'react';
import {
  DemoBidder,
  DemoData,
  DemoState,
  DemoTrader,
} from '../../../types/demo';
import { useProjectsContext } from '../../../context/ProjectsContext';
import { MainContainer } from '../MainContainer';
import { SideBar } from '../Sidebar';
import { Market } from '../Market';
import { Result } from '../../../types/result';
import { Project } from '../../../types/project';
import { MarketState } from '../../../types/market';
import { HighlightedMapRegions } from '../../../types/map';
import { isProjectEqual } from '../../../utils/walkthroughs';

interface LiveDemoProps {
  data: DemoData;
}

const API_URL = 'https://marketdesign.herokuapp.com/solve/lindsay2018';

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

const getFilteredProjects = (
  filter: (bidder: DemoBidder) => boolean,
  bidders: DemoBidder[],
  myProject?: Project,
  result?: Result,
): Project[] =>
  bidders
    .filter(filter)
    .map((bidder) => convertBidderToProject(bidder, result))
    .filter((project) => !myProject || !isProjectEqual(project, myProject));

const getSellerProjects = (
  bidders: DemoBidder[],
  myProject?: Project,
  result?: Result,
): Project[] => getFilteredProjects(isSellerBidder, bidders, myProject, result);

const getBuyerProjects = (
  bidders: DemoBidder[],
  myProject?: Project,
  result?: Result,
): Project[] => getFilteredProjects(isBuyerBidder, bidders, myProject, result);

const getProjectForTrader = (
  bidders: DemoBidder[],
  trader?: DemoTrader,
  result?: Result,
): Project | undefined => {
  if (!trader) {
    return undefined;
  }

  const projects = bidders.map((bidder) =>
    convertBidderToProject(bidder, result),
  );

  const project = projects.find(({ title }) => title === trader.name);

  if (!project) {
    throw new Error(`No bidder found with for name "${trader.name}"`);
  }

  return project;
};

const getHighlightedMapRegions = (
  traders: DemoTrader[],
): HighlightedMapRegions => {
  const regions: { buyer: string[]; seller: string[] } = {
    buyer: [],
    seller: [],
  };

  traders.forEach((trader) => {
    if (trader.role === 'buyer') {
      regions.buyer.push(...trader.locations);
    }

    if (trader.role === 'seller') {
      regions.seller.push(...trader.locations);
    }
  }, regions);

  return regions;
};

export const LiveDemo: NextPage<LiveDemoProps> = ({ data }: LiveDemoProps) => {
  const { setProjectMapIndex } = useProjectsContext();
  const [marketState, setMarketState] = useState<MarketState>(0);
  const [result, setResult] = useState<Result>();

  // TODO: Swap states based on shuffle button etc. at the end of a scenario
  // eslint-disable-next-line
  const [demoState, setDemoState] = useState<DemoState>(data.states[0]);

  // TODO: Pick the playable trader from the map
  // eslint-disable-next-line
  const [playableTrader, setPlayableTrader] = useState<DemoTrader>();

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

  const onMapRegionClick = useCallback(
    (region: string, mapIndex: number) => {
      const selectedTrader = data.playable_traders.find((trader) =>
        trader.locations.includes(region),
      );

      const project = getProjectForTrader(
        demoState.bidders,
        selectedTrader,
        result,
      );

      if (!project) {
        throw new Error('Failed to find a project for the given region');
      }

      setPlayableTrader(selectedTrader);
      setProjectMapIndex(project, mapIndex);
    },
    [data.playable_traders, demoState, result, setProjectMapIndex],
  );

  const myProject = getProjectForTrader(
    demoState.bidders,
    playableTrader,
    result,
  );

  const myProjects = myProject ? [myProject] : [];
  const roleId = playableTrader?.role;
  const isMarketSolvable = marketState === MarketState.solvable;

  return (
    <MainContainer>
      <SideBar
        isFormEnabled={!!myProject && marketState === MarketState.pending}
        showDetailsWidget={!!myProject}
        title={data.title}
        sidebarContent={data.description}
        projects={myProjects}
        onSolveMarketClick={onSolveMarketClick}
        onFormSubmit={onFormSubmit}
        roleId={roleId}
        showSolveMarketBtn={isMarketSolvable}
      />
      <Market
        showMap
        myProjects={myProjects}
        buyerProjects={getBuyerProjects(demoState.bidders, myProject, result)}
        sellerProjects={getSellerProjects(demoState.bidders, myProject, result)}
        showCosts={marketState > MarketState.solvable}
        showAllProjects={marketState < MarketState.solvable}
        showWinners={marketState >= MarketState.showing_winners}
        showSurpluses={marketState >= MarketState.showing_surpluses}
        isMarketSolved={marketState === MarketState.solved}
        roleId={roleId}
        showParticipants={!!myProject}
        highlightedMapRegions={getHighlightedMapRegions(data.playable_traders)}
        onMapRegionClick={onMapRegionClick}
      />
    </MainContainer>
  );
};
