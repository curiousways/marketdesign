import { FunctionComponent } from 'react';
import { HighlightedMapRegions } from '@/types/map';
import { MAP_REGION_PATHS, MapRegion } from '../MapRegion';
import { RoleId } from '../../../types/roles';
import {
  MAP_INDICES,
  MAP_VIEWBOX,
  MAP_VIEWBOX_HEIGHT,
  MAP_VIEWBOX_WIDTH,
} from '../../../constants/map';

type Props = {
  highlightedMapRegions?: HighlightedMapRegions;
  onMapRegionClick?: (region: string, index: number) => void;
};

export const Map: FunctionComponent<Props> = ({
  highlightedMapRegions,
  onMapRegionClick,
}: Props) => {
  return (
    <svg
      width={MAP_VIEWBOX_WIDTH}
      height={MAP_VIEWBOX_HEIGHT}
      viewBox={MAP_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="map"
    >
      <rect width="1014" height="868" transform="translate(1)" fill="#92C6F5" />
      <rect x="1" width="1014" height="497" fill="#7DBB67" />
      {MAP_REGION_PATHS.map((path, index) => {
        const highlightedRegion = Object.entries(
          highlightedMapRegions ?? {},
        ).find(([, regions = []]) =>
          regions.some((region) => MAP_INDICES[region] === index),
        );

        return (
          <MapRegion
            pathOnly
            key={path}
            index={index}
            roleId={highlightedRegion?.[0] as RoleId}
            onClick={onMapRegionClick}
          />
        );
      })}
    </svg>
  );
};
