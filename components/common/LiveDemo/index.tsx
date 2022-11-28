import type { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { capitalCase } from 'change-case';
import fetch from 'isomorphic-unfetch';
import cloneDeep from 'clone-deep';
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
import { useProjectsContext } from '../../../context/ProjectsContext';

interface LiveDemoProps {
  data: DemoData;
}

const API_URL = 'https://marketdesign.herokuapp.com/solve/lindsay2018';

const isProjectAccepted = (
  bidder: DemoBidder,
  bid: DemoBid,
  result?: Result,
) => {
  // Assume a project is accepted by default (i.e. before we call the API to
  // solve the market).
  if (!result) {
    return true;
  }

  const { winning = 0 } =
    result.problem.bidders
      .find(({ name }) => name === bidder.name)
      ?.bids.find(({ label }) => label === bid.label) ?? {};

  // Convert the `winning` property from the API data to a percentage.
  const acceptedPercentage = Math.abs(winning * 100);

  if ([100, 0].includes(acceptedPercentage)) {
    return !!acceptedPercentage;
  }

  return acceptedPercentage;
};

const convertBidToProject = (
  bidder: DemoBidder,
  bid: DemoBid,
  result?: Result,
  mapRegion?: string,
): Project => {
  const { name: title } = bidder;
  const { q: products, v: cost, label } = bid;
  const { biodiversity = 0, nutrients = 0 } = products;

  const accepted = isProjectAccepted(bidder, bid, result);
  const discountOrBonus = accepted ? result?.surplus_shares[title] ?? 0 : 0;

  // Each `bid` contains an optional `label` with a very odd data structure, in
  // that it is used to indicate both the subtitle of the project and the
  // associated map region(s). It has the following possible formats:
  // field 1
  // field 1#s1
  // field 1#s1+s2
  // field 1#s1-woodland
  const [subtitle = '', region = ''] = (label ?? '').split('#');
  const regions = region.split('+').filter((x): x is string => !!x);

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
    discountOrBonus: Math.round(Math.abs(discountOrBonus)),
    accepted: () => isProjectAccepted(bidder, bid, result),
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

const findBidForProject = (
  bidders: DemoBidder[],
  project: Project,
): DemoBid => {
  let matchingBid: DemoBid | undefined;

  bidders.some((bidder) =>
    bidder.bids.some((bid) => {
      const convertedProject = convertBidToProject(bidder, bid);

      if (isProjectEqual(convertedProject, project)) {
        matchingBid = bid;

        return true;
      }

      return false;
    }),
  );

  if (!matchingBid) {
    throw new Error('No matching project found in the given bidders');
  }

  return matchingBid;
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

export const LiveDemo: NextPage<LiveDemoProps> = ({ data }: LiveDemoProps) => {
  const [marketState, setMarketState] = useState<MarketState>(0);
  const [result, setResult] = useState<Result>();

  // TODO: Swap states based on shuffle button etc. at the end of a scenario
  // eslint-disable-next-line
  const [demoState, setDemoState] = useState<DemoState>(data.states[0]);
  const [selectedMapRegion, setSelectedMapRegion] = useState<string>();
  const [playableTrader, setPlayableTrader] = useState<DemoTrader>();
  const { getProjectCost } = useProjectsContext();

  const myProjects = getProjectsForTrader(
    demoState.bidders,
    playableTrader,
    result,
    selectedMapRegion,
  );

  const hasMyProjects = !!myProjects.length;
  const roleId = playableTrader?.role;

  const onSolveMarketClick = useCallback(async () => {
    if (!demoState) {
      throw new Error(
        'A demo state must be selected before the market is solved.',
      );
    }

    // Clone of the demo state so as not to interfere with the original object.
    const clonedDemoState = cloneDeep(demoState);

    // Find the bid associated with each of "my projects" and modify its value.
    myProjects.forEach((project) => {
      const bid = findBidForProject(clonedDemoState.bidders, project);

      bid.v = getProjectCost(project);

      if (roleId === 'seller') {
        bid.v *= -1;
      }
    });

    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(clonedDemoState),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setResult(await res.json());
    setMarketState(MarketState.solved);
  }, [demoState, myProjects, roleId, getProjectCost]);

  const onFormSubmit = useCallback(() => {
    setMarketState(MarketState.solvable);
  }, []);

  const onFormRevise = useCallback(() => {
    setMarketState(MarketState.pending);
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

  return (
    <MainContainer>
      <SideBar
        isFormEnabled={marketState === MarketState.pending}
        isFormReviseEnabled={marketState > MarketState.pending}
        showDetailsWidget={hasMyProjects}
        title={data.title}
        sidebarContent={data.description}
        projects={myProjects}
        onSolveMarketClick={onSolveMarketClick}
        onFormSubmit={onFormSubmit}
        onFormRevise={onFormRevise}
        roleId={roleId}
        isMarketSolvable={marketState >= MarketState.solvable}
        showSolveMarketBtn={marketState === MarketState.solvable}
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
