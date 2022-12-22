import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { ReactNode } from 'react';
import nock from 'nock';
import cloneDeep from 'clone-deep';
import router from 'next/router';
import mockRouter from 'next-router-mock';
import { MAP_INDICES } from '../../constants/map';
import { ProjectsProvider } from '../../context/ProjectsContext';
import { getMarketParticipants } from '../../test-utils/market';
import { DemoBid, DemoBidder, DemoData, DemoState } from '../../types/demo';
import { MAP_REGION_PATHS } from '../MapRegion';
import { MarketSandbox } from './index';
import { Bid } from '../../types/result';

type WrapperProps = { children: ReactNode };

const wrapper = ({ children }: WrapperProps) => {
  return <ProjectsProvider>{children}</ProjectsProvider>;
};

nock.disableNetConnect();

const mockApiResponse = (reply: any) =>
  nock('https://marketdesign.herokuapp.com')
    .post('/solve/lindsay2018')
    .reply(200, reply);

const singleBidScenario: DemoData = {
  categories: ['Single bids only'],
  title: 'Market-WlkThruB1',
  description: 'Lorem ipsum dolor sit amet',
  playable_traders: [
    {
      name: 'seller 1',
      role: 'seller',
      locations: ['s1'],
      enable_divisibility_element: false,
    },
    {
      name: 'buyer 1',
      role: 'buyer',
      locations: ['b1'],
      enable_divisibility_element: false,
    },
  ],
  states: [
    {
      free_disposal: true,
      bidders: [
        {
          name: 'seller 1',
          bids: [
            {
              v: -12000,
              q: {
                biodiversity: 3,
                nutrients: 1,
              },
              divisibility: 0,
            },
          ],
        },
        {
          name: 'seller 2',
          bids: [
            {
              v: -8000,
              q: {
                biodiversity: 2,
                nutrients: 1,
              },
              divisibility: 0,
            },
          ],
        },
        {
          name: 'seller 3',
          bids: [
            {
              v: -10000,
              q: {
                biodiversity: 1,
                nutrients: 4,
              },
              divisibility: 0,
            },
          ],
        },
        {
          name: 'buyer 1',
          bids: [
            {
              v: 25000,
              q: {
                biodiversity: -1,
                nutrients: -3,
              },
              divisibility: 0,
            },
          ],
        },
        {
          name: 'buyer 2',
          bids: [
            {
              v: 10000,
              q: {
                biodiversity: -2,
                nutrients: -2,
              },
              divisibility: 0,
            },
          ],
        },
        {
          name: 'buyer 3',
          bids: [
            {
              v: 11000,
              q: {
                biodiversity: -3,
                nutrients: 0,
              },
              divisibility: 0,
            },
          ],
        },
      ],
    },
  ],
};

const multipleBidsScenario: DemoData = {
  categories: ['Multiple bids', 'XOR bids'],
  title: 'Market-WlkThruS5.2',
  description: 'Lorem ipsum dolor sit amet',
  playable_traders: [
    {
      name: 'seller 1',
      role: 'seller',
      locations: ['s1', 's2'],
      enable_divisibility_element: false,
    },
    {
      name: 'buyer 1',
      role: 'buyer',
      locations: ['b1'],
      enable_divisibility_element: false,
    },
  ],
  states: [
    {
      free_disposal: true,
      bidders: [
        {
          name: 'seller 1',
          bids: [
            {
              v: -14000,
              q: {
                biodiversity: 4,
                nutrients: 1,
              },
              xor_group: '1',
              label: 'field 1#s1',
              divisibility: 0,
            },
            {
              v: -7000,
              q: {
                biodiversity: 1,
                nutrients: 2,
              },
              xor_group: '1',
              label: 'field 2#s2',
              divisibility: 0,
            },
            {
              v: -17000,
              q: {
                biodiversity: 5,
                nutrients: 3,
              },
              xor_group: '1',
              label: 'both#s1+s2',
              divisibility: 0,
            },
          ],
        },
        {
          name: 'seller 2',
          bids: [
            {
              v: -9000,
              q: {
                biodiversity: 1,
                nutrients: 2,
              },
              divisibility: 0,
            },
          ],
        },
        {
          name: 'buyer 1',
          bids: [
            {
              v: 27000,
              q: {
                biodiversity: -2,
                nutrients: -4,
              },
              divisibility: 0,
            },
          ],
        },
        {
          name: 'buyer 2',
          bids: [
            {
              v: 12000,
              q: {
                biodiversity: -3,
                nutrients: 0,
              },
              divisibility: 0,
            },
          ],
        },
      ],
    },
  ],
};

const investorBidScenario: DemoData = {
  categories: ['Multiple bids', 'Divisible bids', 'Investor bids'],
  title: 'Market-WlkThruI1',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  playable_traders: [
    {
      name: 'seller 1',
      role: 'seller',
      locations: ['s1'],
      enable_divisibility_element: false,
    },
    {
      name: 'investor',
      role: 'investor',
      locations: ['i1'],
      enable_divisibility_element: false,
    },
  ],
  states: [
    {
      free_disposal: true,
      bidders: [
        {
          name: 'seller 1',
          bids: [
            {
              v: -5000,
              q: {
                biodiversity: 3,
                nutrients: 0,
              },
              divisibility: 0,
            },
          ],
        },
        {
          name: 'seller 2',
          bids: [
            {
              v: -14000,
              q: {
                biodiversity: 4,
                nutrients: 4,
              },
              divisibility: 0,
            },
          ],
        },
        {
          name: 'seller 3',
          bids: [
            {
              v: -6000,
              q: {
                biodiversity: 1,
                nutrients: 4,
              },
              divisibility: 0,
            },
          ],
        },
        {
          name: 'investor',
          bids: [
            {
              v: 8000,
              q: {
                biodiversity: -4,
                nutrients: 0,
              },
              divisibility: 1,
            },
            {
              v: 3000,
              q: {
                biodiversity: 0,
                nutrients: -2,
              },
              divisibility: 1,
            },
          ],
        },
        {
          name: 'buyer 2',
          bids: [
            {
              v: 14000,
              q: {
                biodiversity: -1,
                nutrients: -3,
              },
              divisibility: 0,
            },
          ],
        },
      ],
    },
  ],
};

const findBid = (
  bidders: DemoBidder[],
  name: string,
  opts: { label?: string; bidIndex?: number } = {},
): Bid => {
  const { label, bidIndex } = opts;
  let foundBid: DemoBid | undefined;

  bidders.some((bidder) =>
    bidder.bids.some((bid, i) => {
      let matches = false;

      if (bidder.name === name) {
        matches = true;
      }

      if (label && bid.label !== label) {
        matches = false;
      }

      if (typeof bidIndex === 'number' && i !== bidIndex) {
        matches = false;
      }

      if (matches) {
        foundBid = bid;
      }

      return matches;
    }),
  );

  if (!foundBid) {
    throw new Error(
      `No bid found for name "${name}" and options ${JSON.stringify(opts)}`,
    );
  }

  return foundBid;
};

const getMapPaths = (element: HTMLElement) =>
  within(element)
    .getAllByTestId('map-region')
    .map((el) => el.getAttribute('d'));

const getHighlightedMapRegions = () => {
  const map = screen.getByTestId('map');

  return within(map)
    .getAllByTestId('map-region')
    .filter((el) => el.getAttribute('fill') !== 'white');
};

const getHighlightedMapRegionByKey = (key: string) => {
  const highlightedRegions = getHighlightedMapRegions();
  const index = MAP_INDICES[key];

  const region = highlightedRegions.find(
    (r) => r.getAttribute('d') === MAP_REGION_PATHS[Number(index)],
  );

  if (!region) {
    throw new Error(`Region with key ${key} is not highlighted`);
  }

  return region;
};

const getInvestorRegionByKey = (key: string) => {
  const map = screen.getByTestId('map');
  const list = within(map).getByRole('list');
  const listItems = within(list).getAllByRole('listitem');

  const region = listItems.find(({ textContent }) => textContent === key);

  if (!region) {
    throw new Error(`Region with key ${key} is not in the investor list`);
  }

  return within(region).getByRole('button');
};

describe('MarketSandbox', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('highlights the expected map regions', () => {
    render(<MarketSandbox data={multipleBidsScenario} />, { wrapper });

    const highlightedMapPaths = getHighlightedMapRegions();

    expect(highlightedMapPaths).toHaveLength(3);
    expect(highlightedMapPaths.map((el) => el.getAttribute('d'))).toEqual([
      MAP_REGION_PATHS[MAP_INDICES.s1],
      MAP_REGION_PATHS[MAP_INDICES.s2],
      MAP_REGION_PATHS[MAP_INDICES.b1],
    ]);
  });

  it('selects a single map region', async () => {
    render(<MarketSandbox data={multipleBidsScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('b1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const mapPaths = getMapPaths(projectDetails);
    const textInputs = within(projectDetails).getAllByRole('textbox');

    expect(textInputs).toHaveLength(1);
    expect(mapPaths).toHaveLength(1);
    expect(mapPaths[0]).toEqual(MAP_REGION_PATHS[MAP_INDICES.b1]);
  });

  it('selects multiple map regions', async () => {
    render(<MarketSandbox data={multipleBidsScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('s1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const mapPaths = getMapPaths(projectDetails);
    const textInputs = within(projectDetails).getAllByRole('textbox');

    expect(textInputs).toHaveLength(3);

    expect(mapPaths).toHaveLength(4);
    expect(mapPaths).toEqual([
      MAP_REGION_PATHS[MAP_INDICES.s1],
      MAP_REGION_PATHS[MAP_INDICES.s2],

      // This duplication is because of the either or case, which is inserted
      // as a third option.
      MAP_REGION_PATHS[MAP_INDICES.s1],
      MAP_REGION_PATHS[MAP_INDICES.s2],
    ]);
  });

  it('submits and revises a value for the selected project', async () => {
    render(<MarketSandbox data={singleBidScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('b1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const textInput = within(projectDetails).getByRole('textbox');
    const submitButton = within(projectDetails).getByRole('button');

    fireEvent.change(textInput, { target: { value: '8000' } });

    expect(submitButton).toHaveTextContent('Submit');

    fireEvent.click(submitButton);

    expect(getMarketParticipants().buyers).toHaveLength(1);
    expect(textInput).toHaveValue('8000');
    expect(submitButton).toHaveTextContent('Revise');

    fireEvent.click(submitButton);

    expect(getMarketParticipants().buyers).toHaveLength(0);
    expect(textInput).toHaveValue('');
  });

  it('shows the other market participants once the solve market button is pressed', async () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    mockApiResponse(() => ({
      rule: 'lindsay2018',
      surplus_shares: {},
      problem: {
        free_disposal: true,
        goods: [],
        bidders: cloneDeep(singleBidScenario.states[0].bidders),
      },
    }));

    render(<MarketSandbox data={singleBidScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('b1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');

    fireEvent.change(within(projectDetails).getByRole('textbox'), {
      target: { value: '8000' },
    });

    // No participants before submit clicked
    expect(getMarketParticipants().allParticipants).toHaveLength(0);

    fireEvent.click(within(projectDetails).getByRole('button'));

    // Only the user's participant before solve market clicked
    expect(getMarketParticipants().allParticipants).toHaveLength(1);

    fireEvent.click(await screen.findByText('Solve Market'));

    await waitFor(() => expect(setIntervalSpy).toHaveBeenCalled());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getMarketParticipants().allParticipants).toHaveLength(6);
  });

  it('gives the expected outcome for a single bid project with multiple winning projects', async () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const biddersResult = cloneDeep(singleBidScenario.states[0].bidders);

    findBid(biddersResult, 'seller 1').winning = 1;
    findBid(biddersResult, 'seller 2').winning = 1;
    findBid(biddersResult, 'buyer 2').winning = 1;
    findBid(biddersResult, 'buyer 3').winning = 1;

    mockApiResponse({
      rule: 'lindsay2018',
      surplus_shares: {
        'seller 1': 250.0,
        'seller 2': 250.0,
        'buyer 2': 250.0,
        'buyer 3': 250.0,
      },
      problem: {
        free_disposal: true,
        goods: [],
        bidders: biddersResult,
      },
    });

    render(<MarketSandbox data={singleBidScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('b1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const textInput = within(projectDetails).getByRole('textbox');

    fireEvent.change(textInput, { target: { value: '8000' } });

    expect(textInput).toBeValid();

    fireEvent.click(within(projectDetails).getByText('Submit'));
    fireEvent.click(await screen.findByText('Solve Market'));

    await waitFor(() => expect(setIntervalSpy).toHaveBeenCalled());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const marketOutcome = await screen.findByTestId('market-outcome');
    const { buyers, sellers } = getMarketParticipants();

    expect(sellers).toHaveLength(2);
    expect(buyers).toHaveLength(2);

    expect(sellers[0].title).toHaveTextContent('Seller 1');
    expect(sellers[0].bidOrOffer).toHaveTextContent('£12,000');
    expect(sellers[0].discountOrBonus).toHaveTextContent('£250');
    expect(sellers[0].paysOrReceived).toHaveTextContent('£12,250');

    expect(sellers[1].title).toHaveTextContent('Seller 2');
    expect(sellers[1].bidOrOffer).toHaveTextContent('£8,000');
    expect(sellers[1].discountOrBonus).toHaveTextContent('£250');
    expect(sellers[1].paysOrReceived).toHaveTextContent('£8,250');

    expect(buyers[0].title).toHaveTextContent('Buyer 2');
    expect(buyers[0].bidOrOffer).toHaveTextContent('£10,000');
    expect(buyers[0].discountOrBonus).toHaveTextContent('£250');
    expect(buyers[0].paysOrReceived).toHaveTextContent('£9,750');

    expect(buyers[1].title).toHaveTextContent('Buyer 3');
    expect(buyers[1].bidOrOffer).toHaveTextContent('£11,000');
    expect(buyers[1].discountOrBonus).toHaveTextContent('£250');
    expect(buyers[1].paysOrReceived).toHaveTextContent('£10,750');

    expect(within(marketOutcome).getByTestId('total-bids')).toHaveTextContent(
      '£21,000',
    );

    expect(within(marketOutcome).getByTestId('total-offers')).toHaveTextContent(
      '£20,000',
    );

    expect(within(marketOutcome).getByTestId('surplus')).toHaveTextContent(
      '£1,000',
    );
  });

  it('gives the expected outcome for a partially accepted project when bidding above cost', async () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const biddersResult = cloneDeep(singleBidScenario.states[0].bidders);
    let requestState: DemoState | undefined;

    findBid(biddersResult, 'seller 1').winning = 1;
    findBid(biddersResult, 'buyer 1').winning = 0.5;

    mockApiResponse((_req: any, body: any) => {
      requestState = body;

      return {
        rule: 'lindsay2018',
        surplus_shares: {
          'seller 1': 1500,
          'buyer 1': 2500,
        },
        problem: {
          free_disposal: true,
          goods: [],
          bidders: biddersResult,
        },
      };
    });

    render(<MarketSandbox data={singleBidScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('b1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const textInput = within(projectDetails).getByRole('textbox');

    fireEvent.change(textInput, { target: { value: '30000' } });

    expect(textInput).toBeValid();

    fireEvent.click(within(projectDetails).getByText('Submit'));
    fireEvent.click(await screen.findByText('Solve Market'));

    await waitFor(() => expect(setIntervalSpy).toHaveBeenCalled());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const marketOutcome = await screen.findByTestId('market-outcome');
    const { buyers, sellers } = getMarketParticipants();

    expect(findBid(requestState!.bidders, 'buyer 1').v).toBe(30000);

    expect(sellers).toHaveLength(1);
    expect(buyers).toHaveLength(1);

    expect(sellers[0].title).toHaveTextContent('Seller 1');
    expect(sellers[0].bidOrOffer).toHaveTextContent('£12,000');
    expect(sellers[0].discountOrBonus).toHaveTextContent('£1,500');
    expect(sellers[0].paysOrReceived).toHaveTextContent('£13,500');

    expect(buyers[0].title).toHaveTextContent('Buyer 1Accepted: 50%');
    expect(buyers[0].bidOrOffer).toHaveTextContent('£15,000£30,000');
    expect(buyers[0].discountOrBonus).toHaveTextContent('£2,500');
    expect(buyers[0].paysOrReceived).toHaveTextContent('£12,500');

    expect(within(marketOutcome).getByTestId('total-bids')).toHaveTextContent(
      '£15,000',
    );

    expect(within(marketOutcome).getByTestId('total-offers')).toHaveTextContent(
      '£12,000',
    );

    expect(within(marketOutcome).getByTestId('surplus')).toHaveTextContent(
      '£3,000',
    );
  });

  it('makes a request with a seller offer below cost', async () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const biddersResult = cloneDeep(singleBidScenario.states[0].bidders);
    let requestState: DemoState | undefined;

    findBid(biddersResult, 'seller 2').winning = 1;
    findBid(biddersResult, 'buyer 1').winning = 1;

    mockApiResponse((_req: any, body: any) => {
      requestState = body;

      return {
        rule: 'lindsay2018',
        surplus_shares: {
          'seller 1': 1500,
          'buyer 1': 2500,
        },
        problem: {
          free_disposal: true,
          goods: [],
          bidders: biddersResult,
        },
      };
    });

    render(<MarketSandbox data={singleBidScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('s1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const textInput = within(projectDetails).getByRole('textbox');

    fireEvent.change(textInput, { target: { value: '1000' } });

    expect(textInput).toBeValid();

    fireEvent.click(within(projectDetails).getByText('Submit'));
    fireEvent.click(await screen.findByText('Solve Market'));

    await waitFor(() => expect(setIntervalSpy).toHaveBeenCalled());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await screen.findByTestId('market-outcome');

    expect(findBid(requestState!.bidders, 'seller 1').v).toBe(-1000);
  });

  it('gives the expected outcome for an XOR scenario where one option is accepted', async () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const biddersResult = cloneDeep(multipleBidsScenario.states[0].bidders);
    let requestState: DemoState | undefined;

    findBid(biddersResult, 'seller 1', { label: 'both#s1+s2' }).winning = 1;
    findBid(biddersResult, 'buyer 1').winning = 1;

    mockApiResponse((_req: any, body: any) => {
      requestState = body;

      return {
        rule: 'lindsay2018',
        surplus_shares: {
          'seller 1': 7500,
          'buyer 1': 2500,
        },
        problem: {
          free_disposal: true,
          goods: [],
          bidders: biddersResult,
        },
      };
    });

    render(<MarketSandbox data={multipleBidsScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('s1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const textInputs = within(projectDetails).getAllByRole('textbox');

    textInputs.forEach((textInput) => {
      fireEvent.change(textInput, { target: { value: '10000' } });
    });

    fireEvent.click(within(projectDetails).getByText('Submit'));
    fireEvent.click(await screen.findByText('Solve Market'));

    await waitFor(() => expect(setIntervalSpy).toHaveBeenCalled());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const marketOutcome = await screen.findByTestId('market-outcome');
    const { buyers, sellers } = getMarketParticipants();

    expect(
      findBid(requestState!.bidders, 'seller 1', { label: 'field 1#s1' }).v,
    ).toBe(-10000);

    expect(
      findBid(requestState!.bidders, 'seller 1', { label: 'field 2#s2' }).v,
    ).toBe(-10000);

    expect(
      findBid(requestState!.bidders, 'seller 1', { label: 'both#s1+s2' }).v,
    ).toBe(-10000);

    expect(sellers).toHaveLength(3);
    expect(buyers).toHaveLength(1);

    expect(sellers[0].title).toHaveTextContent('Field 1');
    expect(sellers[0].bidOrOffer).toHaveTextContent('£10,000');
    expect(sellers[0].discountOrBonus).toHaveTextContent('£0');
    expect(sellers[0].paysOrReceived).toHaveTextContent('£10,000');

    expect(sellers[1].title).toHaveTextContent('Field 2');
    expect(sellers[1].bidOrOffer).toHaveTextContent('£10,000');
    expect(sellers[1].discountOrBonus).toHaveTextContent('£0');
    expect(sellers[1].paysOrReceived).toHaveTextContent('£10,000');

    expect(sellers[2].title).toHaveTextContent('Both');
    expect(sellers[2].bidOrOffer).toHaveTextContent('£10,000');
    expect(sellers[2].discountOrBonus).toHaveTextContent('£7,500');
    expect(sellers[2].paysOrReceived).toHaveTextContent('£17,500');

    expect(buyers[0].title).toHaveTextContent('Buyer 1');
    expect(buyers[0].bidOrOffer).toHaveTextContent('£27,000');
    expect(buyers[0].discountOrBonus).toHaveTextContent('£2,500');
    expect(buyers[0].paysOrReceived).toHaveTextContent('£24,500');

    expect(within(marketOutcome).getByTestId('total-bids')).toHaveTextContent(
      '£27,000',
    );

    expect(within(marketOutcome).getByTestId('total-offers')).toHaveTextContent(
      '£10,000',
    );

    expect(within(marketOutcome).getByTestId('surplus')).toHaveTextContent(
      '£17,000',
    );
  });

  it('gives the expected outcome for an investor bidding scenario', async () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const biddersResult = cloneDeep(investorBidScenario.states[0].bidders);

    findBid(biddersResult, 'investor', { bidIndex: 0 }).winning = 0.75;
    findBid(biddersResult, 'investor', { bidIndex: 1 }).winning = 0.5;
    findBid(biddersResult, 'seller 1').winning = 1;
    findBid(biddersResult, 'seller 3').winning = 1;
    findBid(biddersResult, 'buyer 2').winning = 1;

    mockApiResponse({
      rule: 'lindsay2018',
      surplus_shares: {
        'seller 1': 416.6666666666667,
        'seller 3': 2250.0,
        investor: 2166.6666666666665,
        'buyer 2': 5666.666666666667,
      },
      problem: {
        free_disposal: true,
        goods: [],
        bidders: biddersResult,
      },
    });

    render(<MarketSandbox data={investorBidScenario} />, { wrapper });

    const region = getInvestorRegionByKey('i1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const textInputs = within(projectDetails).getAllByRole('textbox');

    fireEvent.change(textInputs[0], { target: { value: '8000' } });
    fireEvent.change(textInputs[1], { target: { value: '3000' } });

    expect(textInputs[0]).toBeValid();
    expect(textInputs[1]).toBeValid();

    fireEvent.click(within(projectDetails).getByText('Submit'));
    fireEvent.click(await screen.findByText('Solve Market'));

    await waitFor(() => expect(setIntervalSpy).toHaveBeenCalled());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const marketOutcome = await screen.findByTestId('market-outcome');
    const { buyers, sellers } = getMarketParticipants();

    expect(sellers).toHaveLength(2);
    expect(buyers).toHaveLength(3);

    expect(sellers[0].title).toHaveTextContent(/^Seller 1$/);
    expect(sellers[0].bidOrOffer).toHaveTextContent('£5,000');
    expect(sellers[0].discountOrBonus).toHaveTextContent('£417');
    expect(sellers[0].paysOrReceived).toHaveTextContent('£5,417');

    expect(sellers[1].title).toHaveTextContent(/^Seller 3$/);
    expect(sellers[1].bidOrOffer).toHaveTextContent('£6,000');
    expect(sellers[1].discountOrBonus).toHaveTextContent('£2,250');
    expect(sellers[1].paysOrReceived).toHaveTextContent('£8,250');

    expect(buyers[0].title).toHaveTextContent(/^InvestorAccepted: 75%$/);
    expect(buyers[0].bidOrOffer).toHaveTextContent('£24,000£32,000');
    expect(buyers[0].discountOrBonus).toHaveTextContent('£2,167');
    expect(buyers[0].paysOrReceived).toHaveTextContent('£5,333');

    expect(buyers[1].title).toHaveTextContent(/^Accepted: 50%$/);
    expect(buyers[1].bidOrOffer).toHaveTextContent('£3,000£6,000');
    expect(buyers[0].discountOrBonus).toHaveTextContent('£2,167');
    expect(buyers[0].paysOrReceived).toHaveTextContent('£5,333');

    expect(within(marketOutcome).getByTestId('total-bids')).toHaveTextContent(
      '£21,500',
    );

    expect(within(marketOutcome).getByTestId('total-offers')).toHaveTextContent(
      '£11,000',
    );

    expect(within(marketOutcome).getByTestId('surplus')).toHaveTextContent(
      '£10,500',
    );
  });

  describe.each([
    '/market-sandbox/example-walkthrough',
    '/market-sandbox/example-walkthrough?state=0',
  ])('with URL path %s', (pathname) => {
    beforeEach(() => {
      mockRouter.setCurrentUrl(pathname);
    });

    it.each`
      buttonText                   | routerState
      ${'Return to Market Choice'} | ${{ pathname: '/market-sandbox' }}
      ${'Shuffle Market'}          | ${{ pathname: '/market-sandbox/example-walkthrough' }}
      ${'Replay Market'}           | ${{ pathname: '/market-sandbox/example-walkthrough', query: { state: expect.stringMatching(/0|1/) } }}
    `(
      'shows the "$buttonText" button and updates the route when clicked',
      async ({ buttonText, routerState }) => {
        const setIntervalSpy = jest.spyOn(global, 'setInterval');
        const biddersResult = cloneDeep(singleBidScenario.states[0].bidders);

        mockApiResponse({
          rule: 'lindsay2018',
          surplus_shares: {},
          problem: {
            free_disposal: true,
            goods: [],
            bidders: biddersResult,
          },
        });

        render(
          <MarketSandbox
            data={{
              ...singleBidScenario,
              states: [
                ...singleBidScenario.states,
                ...singleBidScenario.states,
              ],
            }}
          />,
          { wrapper },
        );

        const region = getHighlightedMapRegionByKey('b1');

        fireEvent.click(region);

        const projectDetails = await screen.findByTestId('project-details');
        const textInput = within(projectDetails).getByRole('textbox');

        fireEvent.change(textInput, { target: { value: '8000' } });

        expect(textInput).toBeValid();

        fireEvent.click(within(projectDetails).getByText('Submit'));

        // The buttons are hidden until the market is solved
        expect(screen.queryByText(buttonText)).toBeNull();

        fireEvent.click(await screen.findByText('Solve Market'));

        await waitFor(() => expect(setIntervalSpy).toHaveBeenCalled());

        // Run through all stages
        act(() => {
          jest.advanceTimersByTime(1000);
          jest.advanceTimersByTime(1000);
          jest.advanceTimersByTime(1000);
          jest.advanceTimersByTime(1000);
        });

        fireEvent.click(await screen.findByText(buttonText));

        expect(router).toMatchObject(routerState);
      },
    );

    it('does not show the "Shuffle Market" button when only one state', async () => {
      const setIntervalSpy = jest.spyOn(global, 'setInterval');
      const biddersResult = cloneDeep(singleBidScenario.states[0].bidders);

      mockApiResponse({
        rule: 'lindsay2018',
        surplus_shares: {},
        problem: {
          free_disposal: true,
          goods: [],
          bidders: biddersResult,
        },
      });

      render(<MarketSandbox data={singleBidScenario} />, { wrapper });

      const region = getHighlightedMapRegionByKey('b1');

      fireEvent.click(region);

      const projectDetails = await screen.findByTestId('project-details');
      const textInput = within(projectDetails).getByRole('textbox');

      fireEvent.change(textInput, { target: { value: '8000' } });

      expect(textInput).toBeValid();

      fireEvent.click(within(projectDetails).getByText('Submit'));
      fireEvent.click(await screen.findByText('Solve Market'));

      await waitFor(() => expect(setIntervalSpy).toHaveBeenCalled());

      // Run through all stages
      act(() => {
        jest.advanceTimersByTime(1000);
        jest.advanceTimersByTime(1000);
        jest.advanceTimersByTime(1000);
        jest.advanceTimersByTime(1000);
      });

      expect(await screen.findByText('Replay Market')).not.toBeNull();
      expect(screen.getByText('Return to Market Choice')).not.toBeNull();
      expect(screen.queryByText('Shuffle Market')).toBeNull();
    });
  });

  it('modifies the max number of investor credits being bidded for', async () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const biddersResult = cloneDeep(investorBidScenario.states[0].bidders);
    let requestState: DemoState | undefined;

    mockApiResponse((_req: any, body: any) => {
      requestState = body;

      return {
        rule: 'lindsay2018',
        surplus_shares: {},
        problem: {
          free_disposal: true,
          goods: [],
          bidders: biddersResult,
        },
      };
    });

    render(<MarketSandbox data={investorBidScenario} />, { wrapper });

    const region = getInvestorRegionByKey('i1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const textInputs = within(projectDetails).getAllByRole('textbox');

    fireEvent.change(textInputs[0], { target: { value: '10000' } });
    fireEvent.change(textInputs[1], { target: { value: '2000' } });

    expect(textInputs[0]).toBeValid();
    expect(textInputs[1]).toBeValid();

    fireEvent.click(within(projectDetails).getByText('Submit'));
    fireEvent.click(await screen.findByText('Solve Market'));

    await waitFor(() => expect(setIntervalSpy).toHaveBeenCalled());

    const modifiedBidder = requestState?.bidders.find(
      ({ name }) => name === 'investor',
    );

    expect(modifiedBidder).toEqual({
      bids: [
        {
          divisibility: 1,
          q: {
            biodiversity: 3,
            nutrients: 0,
          },
          v: 10000,
        },
        {
          divisibility: 1,
          q: {
            biodiversity: 0,
            nutrients: 3,
          },
          v: 2000,
        },
      ],
      name: 'investor',
    });
  });
});
