import { fireEvent, render, screen, within } from '@testing-library/react';
import { ReactNode } from 'react';
import { MAP_REGION_KEYS } from '../../../constants/map';
import { ProjectsContext } from '../../../context/ProjectsContext';
import { DemoData } from '../../../types/demo';
import { MAP_REGION_PATHS } from '../MapRegion';
import { LiveDemo } from './index';

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

const multipleBidsScenario: DemoData = {
  categories: ['Multiple bids', 'XOR bids'],
  title: 'Market-WlkThruS5.2',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus tempor massa, vel sagittis eros lobortis eu. Suspendisse condimentum enim id justo consectetur vestibulum. Maecenas eu lacus accumsan, tincidunt nulla vitae, dapibus sem. Cras in tincidunt nunc, in viverra eros. Donec ullamcorper magna turpis, in feugiat dolor eleifend in. Duis pulvinar sem quis urna fermentum tincidunt. Quisque facilisis faucibus nibh, vitae semper purus volutpat ac. ',
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
  const [index] =
    Object.entries(MAP_REGION_KEYS).find(([, region]) => region === key) ?? [];

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
      MAP_REGION_PATHS[3],
      MAP_REGION_PATHS[4],
      MAP_REGION_PATHS[21],
    ]);
  });

  it('selects a single map region', async () => {
    render(<LiveDemo data={multipleBidsScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('b1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const mapPaths = getMapPaths(projectDetails);

    expect(mapPaths).toHaveLength(1);
    expect(mapPaths[0]).toEqual(MAP_REGION_PATHS[21]);
  });

  it('selects multiple map regions', async () => {
    render(<LiveDemo data={multipleBidsScenario} />, { wrapper });

    const region = getHighlightedMapRegionByKey('s1');

    fireEvent.click(region);

    const projectDetails = await screen.findByTestId('project-details');
    const mapPaths = getMapPaths(projectDetails);

    expect(mapPaths).toHaveLength(4);
    expect(mapPaths).toEqual([
      MAP_REGION_PATHS[3],
      MAP_REGION_PATHS[4],
      MAP_REGION_PATHS[3],
      MAP_REGION_PATHS[4],
    ]);
  });
});
