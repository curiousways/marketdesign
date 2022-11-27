import { fireEvent, render, screen } from '@testing-library/react';
import { MAP_REGION_PATHS, MapRegion } from './index';

describe('MapRegion', () => {
  it('returns the transformed path', () => {
    const mapIndex = 12;
    const { container } = render(<MapRegion index={mapIndex} />);

    const path = screen.getByTestId('map-region');

    expect(path.getAttribute('d')).toBe(MAP_REGION_PATHS[mapIndex]);
    expect(container).toMatchSnapshot();
  });

  it('returns the selected path only', () => {
    const mapIndex = 12;

    render(
      <svg>
        <MapRegion pathOnly index={mapIndex} />
      </svg>,
    );

    const path = screen.getByTestId('map-region');

    expect(path.getAttribute('d')).toBe(MAP_REGION_PATHS[mapIndex]);
  });

  it('calls the onClick callback', () => {
    const onClick = jest.fn();

    render(<MapRegion index={21} onClick={onClick} />);

    const path = screen.getByTestId('map-region');

    fireEvent.click(path);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('b1', 21);
    expect(path).toHaveClass('cursor-pointer');
  });

  it.each`
    roleId       | expectedColour
    ${'buyer'}   | ${'#9D7F69'}
    ${'seller'}  | ${'#BFDDB3'}
    ${undefined} | ${'white'}
  `(
    'uses $expectedColour as the fill colour for the $roleId role',
    ({ roleId, expectedColour }) => {
      render(<MapRegion index={21} roleId={roleId} />);

      const path = screen.getByTestId('map-region');

      expect(path.getAttribute('fill')).toBe(expectedColour);
    },
  );
});
