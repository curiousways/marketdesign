import { fireEvent, render, screen } from '@testing-library/react';
import { MAP_REGION_PATHS } from '../MapRegion';
import { Map } from './index';

const getFilledPaths = () => {
  const paths = screen.getAllByTestId('map-region');

  return paths.filter((path) => path.getAttribute('fill') !== 'white');
};

describe('Map', () => {
  it('does not highlight any regions by default', () => {
    render(<Map />);

    expect(getFilledPaths()).toHaveLength(0);
  });

  it('highlights a buyer region by index', () => {
    const mapIndex = 1;

    render(<Map highlightedMapRegions={{ buyer: mapIndex }} />);

    const filledPaths = getFilledPaths();

    expect(filledPaths).toHaveLength(1);
    expect(filledPaths[0].getAttribute('fill')).toBe('#9D7F69');
    expect(filledPaths[0].getAttribute('d')).toBe(MAP_REGION_PATHS[mapIndex]);
  });

  it('highlights a seller region by index', () => {
    const mapIndex = 10;

    render(<Map highlightedMapRegions={{ seller: mapIndex }} />);

    const filledPaths = getFilledPaths();

    expect(filledPaths).toHaveLength(1);
    expect(filledPaths[0].getAttribute('fill')).toBe('#BFDDB3');
    expect(filledPaths[0].getAttribute('d')).toBe(MAP_REGION_PATHS[mapIndex]);
  });

  it('highlights a some regions by mapped region key', () => {
    render(
      <Map highlightedMapRegions={{ seller: ['s1'], buyer: ['b1', 'b2'] }} />,
    );

    const filledPaths = getFilledPaths();

    expect(filledPaths).toHaveLength(3);
    expect(filledPaths[0].getAttribute('fill')).toBe('#BFDDB3');
    expect(filledPaths.map((p) => p.getAttribute('d'))).toEqual([
      MAP_REGION_PATHS[3],
      MAP_REGION_PATHS[21],
      MAP_REGION_PATHS[22],
    ]);
  });

  it('calls the onClick callback', () => {
    const onClick = jest.fn();

    render(
      <Map
        highlightedMapRegions={{ seller: ['s1'] }}
        onMapRegionClick={onClick}
      />,
    );

    const path = getFilledPaths()[0];

    fireEvent.click(path);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('s1', 3);
  });
});
