import type { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { capitalCase } from 'change-case';
import fetch from 'isomorphic-unfetch';
import cloneDeep from 'clone-deep';
import objectHash from 'object-hash';
import {
  DemoBid,
  DemoBidder,
  DemoData,
  DemoState,
  DemoTrader,
} from '../../types/demo';
import { MainContainer } from '../MainContainer';
import { SideBar } from '../Sidebar';
import { Market } from '../Market';
import { Bid, Result } from '../../types/result';
import { Project } from '../../types/project';
import { MarketState } from '../../types/market';
import { HighlightedMapRegions } from '../../types/map';
import { isProjectEqual } from '../../utils/project';
import { useProjectsContext } from '../../context/ProjectsContext';
import { RoleId } from '../../types/roles';

interface MarketSandboxProps {
  data: DemoData;
}

const API_URL = 'https://marketdesign.herokuapp.com/solve/lindsay2018';

const getProductsForBid = (bid: DemoBid | Bid, isInvestor?: boolean) => {
  const { q } = bid;

  return Object.entries(q).reduce((acc, [key, value]) => {
    const absValue = Math.abs(value);

    if (isInvestor && !absValue) {
      return acc;
    }

    return {
      ...acc,
      [key]: absValue,
    };
  }, {});
};

const getSubtitle = (bid: DemoBid | Bid, isInvestor: boolean) => {
  const products = getProductsForBid(bid, isInvestor);
  const [firstProductKey] = Object.keys(products);
  const [subtitle] = (bid.label ?? '').split('#');

  // We have a scenario where an "investor" has two bids but no identifiable
  // subtitle to distinguish between them, so we add one here based on the
  // product they are bidding for (i.e. biodiversity or nutrients).e
  if (!subtitle && isInvestor) {
    return capitalCase(firstProductKey);
  }

  return subtitle ? capitalCase(subtitle) : undefined;
};

const findPlayableTraderForBidder = (
  playableTraders: DemoTrader[],
  bidder: DemoBidder,
) => playableTraders.find(({ name }) => name === bidder.name);

const isProjectAccepted = (
  playableTraders: DemoTrader[],
  bidder: DemoBidder,
  bid: DemoBid,
  result?: Result,
) => {
  // Assume a project is accepted by default (i.e. before we call the API to
  // solve the market).
  if (!result) {
    return true;
  }

  const matchingBidder = result.problem.bidders.find(
    ({ name }) => name === bidder.name,
  );

  const isInvestor =
    findPlayableTraderForBidder(playableTraders, bidder)?.role === 'investor';

  const matchingBid = matchingBidder?.bids.find(
    (resultBid) =>
      getSubtitle(resultBid, isInvestor) === getSubtitle(bid, isInvestor),
  );

  const { winning = 0 } = matchingBid ?? {};

  // Convert the `winning` property from the API data to a percentage.
  const acceptedPercentage = Math.abs(winning * 100);

  if ([100, 0].includes(acceptedPercentage)) {
    return !!acceptedPercentage;
  }

  return acceptedPercentage;
};

const convertBidToProject = (
  playableTraders: DemoTrader[],
  bidder: DemoBidder,
  bid: DemoBid,
  result?: Result,
  mapRegion?: string,
): Project => {
  const { name: title } = bidder;
  const { v, label, xor_group, divisibility } = bid;
  const isInvestor =
    findPlayableTraderForBidder(playableTraders, bidder)?.role === 'investor';

  const accepted = isProjectAccepted(playableTraders, bidder, bid, result);
  const discountOrBonus = accepted ? result?.surplus_shares[title] ?? 0 : 0;

  // Each `bid` contains an optional `label` with a very odd data structure, in
  // that it is used to indicate both the subtitle of the project and the
  // associated map region(s). It has the following possible formats:
  // field 1
  // field 1#s1
  // field 1#s1+s2
  // field 1#s1-woodland
  const [, region = ''] = (label ?? '').split('#');
  const regions = region.split('+').filter((x): x is string => !!x);
  const cost = Math.abs(v);
  const costPerCredit = isInvestor ? cost : undefined;

  return {
    title: capitalCase(title),
    subtitle: getSubtitle(bid, isInvestor),
    mapRegions: regions.length
      ? regions
      : [mapRegion].filter((x): x is string => !!x),
    cost,
    costPerCredit,
    sharedCost: xor_group && divisibility ? cost : undefined,
    products: getProductsForBid(bid, isInvestor),
    discountOrBonus: Math.round(Math.abs(discountOrBonus)),
    accepted: () => isProjectAccepted(playableTraders, bidder, bid, result),
    groupId: objectHash(bidder),
  };
};

const convertBidderToProjects = (
  playableTraders: DemoTrader[],
  bidder: DemoBidder,
  result?: Result,
  mapRegion?: string,
): Project[] =>
  bidder.bids.map((bid) =>
    convertBidToProject(playableTraders, bidder, bid, result, mapRegion),
  );

const isSellerBidder = (bidder: DemoBidder) => bidder.bids[0].v < 0;

const isBuyerBidder = (bidder: DemoBidder) => bidder.bids[0].v > 0;

const getFilteredProjects = (
  filter: (bidder: DemoBidder) => boolean,
  playableTraders: DemoTrader[],
  bidders: DemoBidder[],
  myProjects?: Project[],
  result?: Result,
): Project[] => {
  const projects: Project[] = [];

  return bidders
    .filter(filter)
    .reduce(
      (acc, bidder) => [
        ...acc,
        ...convertBidderToProjects(playableTraders, bidder, result),
      ],
      projects,
    )
    .filter(
      (project) =>
        !myProjects?.some((myProject) => isProjectEqual(project, myProject)),
    );
};

const findBidForProject = (
  playableTraders: DemoTrader[],
  bidders: DemoBidder[],
  project: Project,
): DemoBid => {
  let matchingBid: DemoBid | undefined;

  bidders.some((bidder) =>
    bidder.bids.some((bid) => {
      const convertedProject = convertBidToProject(
        playableTraders,
        bidder,
        bid,
      );

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
  playableTraders: DemoTrader[],
  bidders: DemoBidder[],
  myProjects?: Project[],
  result?: Result,
): Project[] =>
  getFilteredProjects(
    isSellerBidder,
    playableTraders,
    bidders,
    myProjects,
    result,
  );

const getBuyerProjects = (
  playableTraders: DemoTrader[],
  bidders: DemoBidder[],
  myProjects?: Project[],
  result?: Result,
): Project[] =>
  getFilteredProjects(
    isBuyerBidder,
    playableTraders,
    bidders,
    myProjects,
    result,
  );

const getProjectsForTrader = (
  playableTraders: DemoTrader[],
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
    projects.push(
      ...convertBidderToProjects(playableTraders, bidder, result, mapRegion),
    );
  });

  const project = projects.filter(
    ({ title }) => capitalCase(title) === capitalCase(trader.name),
  );

  if (!project) {
    throw new Error(`No bidder found with for name "${trader.name}"`);
  }

  return project;
};

const getRoleId = (trader: DemoTrader): RoleId => {
  const { role } = trader;

  if (['buyer', 'investor'].includes(trader.role)) {
    return 'buyer';
  }

  if (trader.role === 'seller') {
    return 'seller';
  }

  throw new Error(`Trader has an invalid role: ${role}`);
};

const getHighlightedMapRegions = (
  traders: DemoTrader[],
): HighlightedMapRegions => {
  const regions: { buyer: string[]; seller: string[] } = {
    buyer: [],
    seller: [],
  };

  traders.forEach((trader) => {
    if (getRoleId(trader) === 'buyer') {
      regions.buyer.push(...trader.locations);
    }

    if (getRoleId(trader) === 'seller') {
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
  const { getProjectCost } = useProjectsContext();
  const { playable_traders: playableTraders } = data;

  const myProjects = getProjectsForTrader(
    playableTraders,
    demoState.bidders,
    playableTrader,
    result,
    selectedMapRegion,
  );

  const hasMyProjects = !!myProjects.length;
  const roleId = playableTrader ? getRoleId(playableTrader) : undefined;

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
      const bid = findBidForProject(
        playableTraders,
        clonedDemoState.bidders,
        project,
      );

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
  }, [demoState, myProjects, roleId, getProjectCost, playableTraders]);

  const onFormSubmit = useCallback(() => {
    setMarketState(MarketState.solvable);
  }, []);

  const onFormRevise = useCallback(() => {
    setMarketState(MarketState.pending);
  }, []);

  const onMapRegionClick = useCallback(
    (region: string) => {
      const selectedTrader = playableTraders.find((trader) =>
        trader.locations.includes(region),
      );

      setPlayableTrader(selectedTrader);
      setSelectedMapRegion(region);
    },
    [playableTraders],
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
        showSolveMarketBtn={marketState === MarketState.solvable}
      />
      <Market
        showMap
        myProjects={myProjects}
        buyerProjects={getBuyerProjects(
          playableTraders,
          demoState.bidders,
          myProjects,
          result,
        )}
        sellerProjects={getSellerProjects(
          playableTraders,
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
