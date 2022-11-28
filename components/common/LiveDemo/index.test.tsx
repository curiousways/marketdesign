import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { ReactNode } from 'react';
import nock from 'nock';
import cloneDeep from 'clone-deep';
import { MAP_INDICES } from '../../../constants/map';
import { ProjectsContext } from '../../../context/ProjectsContext';
import {
  getMarketParticipants,
  getMarketSummary,
} from '../../../test-utils/market';
import { DemoBid, DemoBidder, DemoData } from '../../../types/demo';
import { MAP_REGION_PATHS } from '../MapRegion';
import { LiveDemo } from './index';
import { Bid, Result } from '../../../types/result';

type WrapperProps = { children: ReactNode };

const wrapper = ({ children }: WrapperProps) => (
  <ProjectsContext.Provider
    value={{
      setProjectCost: jest.fn(),
      getProjectCost: jest.fn(({ cost }) =>
        Array.isArray(cost) ? cost[0] : cost,
      ),
    }}
  >
    {children}
  </ProjectsContext.Provider>
);

nock.disableNetConnect();

const mockApiResponse = (result: Result) => {
  nock('https://marketdesign.herokuapp.com')
    .post('/solve/lindsay2018')
    .reply(200, result);
};

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
              v: 8000,
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

const findBid = (bidders: DemoBidder[], name: string, label?: string): Bid => {
  let foundBid: DemoBid | undefined;

  bidders.some((bidder) =>
    bidder.bids.some((bid) => {
      if (bidder.name === name && bid.label === label) {
        foundBid = bid;

        return true;
      }

      return false;
    }),
  );

  if (!foundBid) {
    throw new Error('No bid found for the given name and label');
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

describe('LiveDemo', () => {
  it('highlights the expected map regions', () => {
    render(<LiveDemo data={multipleBidsScenario} />, { wrapper });

    const highlightedMapPaths = getHighlightedMapRegions();

    expect(highlightedMapPaths).toHaveLength(3);
    expect(highlightedMapPaths.map((el) => el.getAttribute('d'))).toEqual([
      MAP_REGION_PATHS[MAP_INDICES.s1],
      MAP_REGION_PATHS[MAP_INDICES.s2],
      MAP_REGION_PATHS[MAP_INDICES.b1],
    ]);
  });

  it('selects a single map region', async () => {
    render(<LiveDemo data={multipleBidsScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('b1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const mapPaths = getMapPaths(projectDetails);

    expect(mapPaths).toHaveLength(1);
    expect(mapPaths[0]).toEqual(MAP_REGION_PATHS[MAP_INDICES.b1]);

    const { allParticipants } = getMarketParticipants();

    expect(allParticipants).toHaveLength(5);
    expect(allParticipants[0].title).toHaveTextContent('Buyer 2');
    expect(allParticipants[1].title).toHaveTextContent('Seller 1Field 1');
    expect(allParticipants[2].title).toHaveTextContent('Seller 1Field 2');
    expect(allParticipants[3].title).toHaveTextContent('Seller 1Both');
    expect(allParticipants[4].title).toHaveTextContent('Seller 2');
  });

  it('selects multiple map regions', async () => {
    render(<LiveDemo data={multipleBidsScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('s1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const mapPaths = getMapPaths(projectDetails);

    expect(mapPaths).toHaveLength(4);
    expect(mapPaths).toEqual([
      MAP_REGION_PATHS[MAP_INDICES.s1],
      MAP_REGION_PATHS[MAP_INDICES.s2],
      MAP_REGION_PATHS[MAP_INDICES.s1],
      MAP_REGION_PATHS[MAP_INDICES.s2],
    ]);

    const { allParticipants } = getMarketParticipants();

    expect(allParticipants).toHaveLength(3);
    expect(allParticipants[0].title).toHaveTextContent('Buyer 1');
    expect(allParticipants[1].title).toHaveTextContent('Buyer 2');
    expect(allParticipants[2].title).toHaveTextContent('Seller 2');
  });

  it('submits and revises a value for the selected project', async () => {
    render(<LiveDemo data={singleBidScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('b1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const textInput = within(projectDetails).getByRole('textbox');
    const submitButton = within(projectDetails).getByRole('button');

    fireEvent.change(textInput, { target: { value: '8000' } });

    expect(getMarketParticipants().buyers).toHaveLength(2);
    expect(submitButton).toHaveTextContent('Submit');

    fireEvent.click(submitButton);

    expect(getMarketParticipants().buyers).toHaveLength(3);
    expect(textInput).toHaveValue('8000');
    expect(submitButton).toHaveTextContent('Revise');

    fireEvent.click(submitButton);

    expect(getMarketParticipants().buyers).toHaveLength(2);
    expect(textInput).toHaveValue('');
  });

  it('gives the expected outcome for a single bid project with multiple winning projects', async () => {
    const biddersResult = cloneDeep(singleBidScenario.states[0].bidders);

    findBid(biddersResult, 'seller 1').winning = 1;
    findBid(biddersResult, 'seller 2').winning = 1;
    findBid(biddersResult, 'buyer 2').winning = 1;
    findBid(biddersResult, 'buyer 3').winning = 1;

    mockApiResponse({
      rule: 'lindsay2018',
      surplus: 1000.0,
      surplus_shares: {
        'seller 1': 250.0,
        'seller 2': 250.0,
        'buyer 2': 250.0,
        'buyer 3': 250.0,
      },
      payments: {
        'seller 1': -12250.0,
        'seller 2': -8250.0,
        'buyer 2': 9750.0,
      },
      problem: {
        free_disposal: true,
        goods: [],
        bidders: biddersResult,
      },
    });

    render(<LiveDemo data={singleBidScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('b1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const textInput = within(projectDetails).getByRole('textbox');

    fireEvent.change(textInput, { target: { value: '8000' } });

    expect(textInput).toBeValid();

    fireEvent.click(within(projectDetails).getByText('Submit'));
    fireEvent.click(await screen.findByText('Solve Market'));

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
});
