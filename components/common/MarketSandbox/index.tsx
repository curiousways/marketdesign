import type { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { capitalCase } from 'change-case';
import {
  DemoBid,
  DemoBidder,
  DemoData,
  DemoState,
  DemoTrader,
} from '../../../types/demo';
import { MainContainer } from '../MainContainer';
import { SideBar } from '../Sidebar';
import { Market } from '../Market';
import { Result } from '../../../types/result';
import { Project } from '../../../types/project';
import { MarketState } from '../../../types/market';
import { HighlightedMapRegions } from '../../../types/map';
import { isProjectEqual } from '../../../utils/walkthroughs';

interface MarketSandboxProps {
  data: DemoData;
}

const API_URL = 'https://marketdesign.herokuapp.com/solve/lindsay2018';

const convertBidToProject = (
  bidder: DemoBidder,
  bid: DemoBid,
  result?: Result,
  mapRegion?: string,
): Project => {
  const { name: title } = bidder;
  const { q: products, v: cost, label } = bid;
  const { biodiversity = 0, nutrients = 0 } = products;

  const discountOrBonus = result?.surplus_shares[title] ?? 0;
  const { winning = 0 } =
    result?.problem.bidders.find(({ name }) => name === title)?.bids[0] ?? {};

  // Each `bid` contains an optional `label` with a very odd data structure, in
  // that it is used to indicate both the subtitle of the project and the
  // associated map region(s). It has the following possible formats:
  // field 1
  // field 1#s1
  // field 1#s1+s2
  // field 1#s1-woodland
  const [subtitle = '', region = ''] = (label ?? '').split('#');
  const regions = region
    .split('+')
    .map((item) => item.split('-')[0])
    .filter((x): x is string => !!x);

  return {
    title: capitalCase(title),
    subtitle: subtitle ? capitalCase(subtitle) : undefined,
    mapRegions: regions.length
      ? regions
      : [mapRegion].filter((x): x is string => !!x),
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

const convertBidderToProjects = (
  bidder: DemoBidder,
  result?: Result,
  mapRegion?: string,
): Project[] =>
  bidder.bids.map((bid) => convertBidToProject(bidder, bid, result, mapRegion));

const isSellerBidder = (bidder: DemoBidder) => bidder.bids[0].v < 0;

const isBuyerBidder = (bidder: DemoBidder) => bidder.bids[0].v > 0;

const getFilteredProjects = (
  filter: (bidder: DemoBidder) => boolean,
  bidders: DemoBidder[],
  myProjects?: Project[],
  result?: Result,
): Project[] => {
  const projects: Project[] = [];

  return bidders
    .filter(filter)
    .reduce(
      (acc, bidder) => [...acc, ...convertBidderToProjects(bidder, result)],
      projects,
    )
    .filter(
      (project) =>
        !myProjects?.some((myProject) => isProjectEqual(project, myProject)),
    );
};

const getSellerProjects = (
  bidders: DemoBidder[],
  myProjects?: Project[],
  result?: Result,
): Project[] =>
  getFilteredProjects(isSellerBidder, bidders, myProjects, result);

const getBuyerProjects = (
  bidders: DemoBidder[],
  myProjects?: Project[],
  result?: Result,
): Project[] => getFilteredProjects(isBuyerBidder, bidders, myProjects, result);

const getProjectsForTrader = (
  bidders: DemoBidder[],
  trader?: DemoTrader,
  result?: Result,
  mapRegion?: string,
): Project[] => {
  if (!trader) {
    return [];
  }

  const projects: Project[] = [];

  bidders.forEach((bidder) => {
    projects.push(...convertBidderToProjects(bidder, result, mapRegion));
  });

  const project = projects.filter(
    ({ title }) => capitalCase(title) === capitalCase(trader.name),
  );

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

export const MarketSandbox: NextPage<MarketSandboxProps> = ({
  data,
}: MarketSandboxProps) => {
  const [marketState, setMarketState] = useState<MarketState>(0);
  const [result, setResult] = useState<Result>();

  // TODO: Swap states based on shuffle button etc. at the end of a scenario
  // eslint-disable-next-line
  const [demoState, setDemoState] = useState<DemoState>(data.states[0]);
  const [selectedMapRegion, setSelectedMapRegion] = useState<string>();
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
    (region: string) => {
      const selectedTrader = data.playable_traders.find((trader) =>
        trader.locations.includes(region),
      );

      setPlayableTrader(selectedTrader);
      setSelectedMapRegion(region);
    },
    [data.playable_traders],
  );

  const myProjects = getProjectsForTrader(
    demoState.bidders,
    playableTrader,
    result,
    selectedMapRegion,
  );

  const hasMyProjects = !!myProjects.length;
  const roleId = playableTrader?.role;
  const isMarketSolvable = marketState === MarketState.solvable;

  return (
    <MainContainer>
      <SideBar
        isFormEnabled={hasMyProjects && marketState === MarketState.pending}
        showDetailsWidget={hasMyProjects}
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
        buyerProjects={getBuyerProjects(demoState.bidders, myProjects, result)}
        sellerProjects={getSellerProjects(
          demoState.bidders,
          myProjects,
          result,
        )}
        showCosts={marketState > MarketState.solvable}
        showAllProjects={marketState < MarketState.solvable}
        showWinners={marketState >= MarketState.showing_winners}
        showSurpluses={marketState >= MarketState.showing_surpluses}
        isMarketSolved={marketState === MarketState.solved}
        roleId={roleId}
        showParticipants={hasMyProjects}
        highlightedMapRegions={getHighlightedMapRegions(data.playable_traders)}
        onMapRegionClick={onMapRegionClick}
      />
    </MainContainer>
  );
};
