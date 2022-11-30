import { fireEvent, render, screen } from '@testing-library/react';
import { MAP_INDICES } from '../../constants/map';
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
    const mapRegion = 'b1';

    render(<Map highlightedMapRegions={{ buyer: [mapRegion] }} />);

    const filledPaths = getFilledPaths();

    expect(filledPaths).toHaveLength(1);
    expect(filledPaths[0].getAttribute('fill')).toBe('#9D7F69');
    expect(filledPaths[0].getAttribute('d')).toBe(
      MAP_REGION_PATHS[MAP_INDICES[mapRegion]],
    );
  });

  it('highlights a seller region by index', () => {
    const mapRegion = 's1';

    render(<Map highlightedMapRegions={{ seller: [mapRegion] }} />);

    const filledPaths = getFilledPaths();

    expect(filledPaths).toHaveLength(1);
    expect(filledPaths[0].getAttribute('fill')).toBe('#BFDDB3');
    expect(filledPaths[0].getAttribute('d')).toBe(
      MAP_REGION_PATHS[MAP_INDICES[mapRegion]],
    );
  });

  it('highlights a some regions by mapped region key', () => {
    render(
      <Map highlightedMapRegions={{ seller: ['s1'], buyer: ['b1', 'b2'] }} />,
    );

    const filledPaths = getFilledPaths();

    expect(filledPaths).toHaveLength(3);
    expect(filledPaths[0].getAttribute('fill')).toBe('#BFDDB3');
    expect(filledPaths.map((p) => p.getAttribute('d')).sort()).toEqual(
      [
        MAP_REGION_PATHS[MAP_INDICES.s1],
        MAP_REGION_PATHS[MAP_INDICES.b1],
        MAP_REGION_PATHS[MAP_INDICES.b2],
      ].sort(),
    );
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
    expect(onClick).toHaveBeenCalledWith('s1', MAP_INDICES.s1);
    expect(path).toHaveClass('cursor-pointer');
  });

  it('does not call the onClick callback for a non-clickable region', () => {
    const onClick = jest.fn();

    render(<Map onMapRegionClick={onClick} />);

    const paths = screen.getAllByTestId('map-region');

    fireEvent.click(paths[0]);

    expect(onClick).not.toHaveBeenCalled();
    expect(paths[0]).not.toHaveClass('cursor-pointer');
  });
});
