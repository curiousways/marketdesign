import type { NextPage } from 'next';
import { ChangeEvent, useCallback, useState } from 'react';
import { capitalCase } from 'change-case';
import fetch from 'isomorphic-unfetch';
import cloneDeep from 'clone-deep';
import objectHash from 'object-hash';
import { useRouter } from 'next/router';
import { DemoBid, DemoBidder, DemoData, DemoTrader } from '../../types/demo';
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
import { OutlineButton } from '../OutlineButton';
import { Checkbox } from '../Checkbox';

interface MarketSandboxProps {
  data: DemoData;
  stateIndex?: number;
}

type MarketSandboxCheatOptions = {
  revealPlayers: boolean;
  revealBids: boolean;
  revealProducts: boolean;
};

const API_URL = 'https://marketdesign.herokuapp.com/solve/lindsay2018';
const MARKET_SOLVING_TIMEOUT = 1000;
const MARKET_SOLVING_STAGES = 5;

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
  const { v, label } = bid;
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
    cost: Math.abs(cost),
    costPerCredit,
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
  marketState: MarketState,
  cheatOptions: MarketSandboxCheatOptions,
  myProjects?: Project[],
  result?: Result,
): Project[] => {
  const projects = getFilteredProjects(
    isSellerBidder,
    playableTraders,
    bidders,
    myProjects,
    result,
  );

  if (marketState <= MarketState.solvable && !cheatOptions.revealPlayers) {
    return [];
  }

  return projects;
};

const getBuyerProjects = (
  playableTraders: DemoTrader[],
  bidders: DemoBidder[],
  marketState: MarketState,
  cheatOptions: MarketSandboxCheatOptions,
  myProjects?: Project[],
  result?: Result,
): Project[] => {
  const projects = getFilteredProjects(
    isBuyerBidder,
    playableTraders,
    bidders,
    myProjects,
    result,
  );

  if (marketState <= MarketState.solvable && !cheatOptions.revealPlayers) {
    return [];
  }

  return projects;
};

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
    if (trader.role === 'buyer') {
      regions.buyer.push(...trader.locations);
    }

    if (trader.role === 'seller') {
      regions.seller.push(...trader.locations);
    }
  }, regions);

  return regions;
};

const getInvestorRegions = (traders: DemoTrader[]): string[] => {
  const regions: string[] = [];

  traders.forEach((trader) => {
    if (trader.role === 'investor') {
      regions.push(...trader.locations);
    }
  }, regions);

  return regions;
};

export const MarketSandbox: NextPage<MarketSandboxProps> = ({
  data,
  stateIndex,
}: MarketSandboxProps) => {
  const [marketState, setMarketState] = useState<MarketState>(0);
  const [result, setResult] = useState<Result>();
  const [cheatOptions, setCheatOptions] = useState<MarketSandboxCheatOptions>({
    revealPlayers: false,
    revealBids: false,
    revealProducts: false,
  });

  const router = useRouter();

  // If a valid state index is passed in use that, otherwise pick a random state.
  const randomStateIndex = Math.floor(Math.random() * data.states.length);
  const finalStateIndex =
    typeof stateIndex === 'number' && data.states[stateIndex]
      ? stateIndex
      : randomStateIndex;

  const demoState = data.states[finalStateIndex];
  const [loadingBarProgress, setLoadingBarProgress] = useState<number>(0);

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

  const updateLoadingBarProgress = (state: MarketState) => {
    setLoadingBarProgress((100 / MARKET_SOLVING_STAGES) * (state - 1));
  };

  const getNewMarketState = useCallback((previousMarketState: MarketState) => {
    const newMarketState = previousMarketState + 1;

    updateLoadingBarProgress(newMarketState);

    return newMarketState;
  }, []);

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
    setMarketState(getNewMarketState);

    // Run through the remaining solve market stages with an artificial delay
    // between each.
    const timer: ReturnType<typeof setInterval> = setInterval(() => {
      setMarketState((previousMarketState) => {
        const newMarketState = getNewMarketState(previousMarketState);

        if (newMarketState === MarketState.solved) {
          clearInterval(timer);
        }

        return newMarketState;
      });
    }, MARKET_SOLVING_TIMEOUT);
  }, [
    demoState,
    myProjects,
    roleId,
    getProjectCost,
    playableTraders,
    getNewMarketState,
  ]);

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

  const [pathname] = router.asPath.split('?');

  const onReplay = useCallback(() => {
    void router.push(`${pathname}?state=${finalStateIndex}`);
  }, [router, finalStateIndex, pathname]);

  const onShuffle = useCallback(() => {
    void router.push(pathname);
  }, [router, pathname]);

  const onReturnToIndex = useCallback(() => {
    void router.push(pathname.replace(/\/[^/]+$/, ''));
  }, [router, pathname]);

  const updateCheatOption = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = evt.target;

      setCheatOptions({
        ...cheatOptions,
        [name]: checked,
      });
    },
    [cheatOptions],
  );

  return (
    <MainContainer>
      <SideBar
        isFormEnabled={marketState === MarketState.pending}
        isFormReviseEnabled={marketState > MarketState.pending}
        isFormSubmitHidden={marketState === MarketState.solved}
        showDetailsWidget={hasMyProjects}
        title={data.title}
        sidebarContent={data.description}
        projects={myProjects}
        onSolveMarketClick={onSolveMarketClick}
        onFormSubmit={onFormSubmit}
        onFormRevise={onFormRevise}
        roleId={roleId}
        showSolveMarketBtn={marketState === MarketState.solvable}
      >
        {marketState === MarketState.solved && (
          <div className="flex flex-col mt-5">
            <div className="flex justify-between w-full space-x-3">
              <OutlineButton className="flex-1" onClick={onReplay}>
                Replay Market
              </OutlineButton>
              {data.states.length > 1 && (
                <OutlineButton className="flex-1" onClick={onShuffle}>
                  Shuffle Market
                </OutlineButton>
              )}
            </div>
            <OutlineButton className="flex-1 mt-3" onClick={onReturnToIndex}>
              Return to Market Choice
            </OutlineButton>
          </div>
        )}
        {marketState === MarketState.solvable && (
          <div className="flex flex-col mt-5 items-center">
            <div className="space-y-1">
              <Checkbox name="revealPlayers" onChange={updateCheatOption}>
                Reveal players
              </Checkbox>
              <Checkbox
                name="revealProducts"
                onChange={updateCheatOption}
                disabled={!cheatOptions.revealPlayers}
              >
                Reveal credits
              </Checkbox>
              <Checkbox
                name="revealBids"
                onChange={updateCheatOption}
                disabled={!cheatOptions.revealPlayers}
              >
                Reveal bids/offers
              </Checkbox>
            </div>
          </div>
        )}
      </SideBar>
      <Market
        showMap
        myProjects={myProjects}
        buyerProjects={getBuyerProjects(
          playableTraders,
          demoState.bidders,
          marketState,
          cheatOptions,
          myProjects,
          result,
        )}
        sellerProjects={getSellerProjects(
          playableTraders,
          demoState.bidders,
          marketState,
          cheatOptions,
          myProjects,
          result,
        )}
        showCosts={
          marketState > MarketState.solvable || cheatOptions.revealBids
        }
        showAllProjects={marketState < MarketState.solvable}
        showWinners={marketState >= MarketState.showing_winners}
        showSurpluses={marketState >= MarketState.showing_surpluses}
        isMarketSolved={marketState === MarketState.solved}
        roleId={roleId}
        showParticipants={hasMyProjects}
        highlightedMapRegions={getHighlightedMapRegions(data.playable_traders)}
        investorRegions={getInvestorRegions(data.playable_traders)}
        onMapRegionClick={onMapRegionClick}
        hideProducts={
          marketState <= MarketState.solvable && !cheatOptions.revealProducts
        }
        loadingBar={{
          progress: loadingBarProgress,
          loaderSpeed: MARKET_SOLVING_TIMEOUT + 1000,
          waitingTime: MARKET_SOLVING_TIMEOUT,
        }}
      />
    </MainContainer>
  );
};
