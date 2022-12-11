import { FunctionComponent } from 'react';
import { HighlightedMapRegions } from '@/types/map';
import { MAP_REGION_PATHS, MapRegion } from '../MapRegion';
import {
  MAP_INDICES,
  MAP_VIEWBOX,
  MAP_VIEWBOX_HEIGHT,
  MAP_VIEWBOX_WIDTH,
} from '../../constants/map';

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
      <rect
        width="200"
        height="868"
        transform="translate(1)"
        fill="#EAEFE9"
        stroke="black"
      />
      <rect
        x="200"
        width="814"
        height="868"
        transform="translate(1)"
        fill="#EAEFE9"
        stroke="black"
      />
      <rect
        x="1"
        y="1"
        width="1014"
        height="497"
        fill="#EAEFE9"
        stroke="black"
      />
      <g transform="translate(383,358) scale(0.63)">
        <path
          d="m110.65315,564.41669c-236.25706,286.99035 33.15529,259.54733 33.40525,258.17647c0.24996,-1.37086 -7.34841,-41.83373 19.13459,-75.76204c26.483,-33.92832 94.38423,-33.14152 132.05275,-63.36541c37.66851,-30.22388 36.29465,-37.38976 40.50409,-48.90669c4.20945,-11.51694 6.05828,-75.27527 42.5316,-76.94219c36.47331,-1.66692 62.60219,22.73763 93.73544,11.48244c31.13325,-11.2552 40.2284,-15.8818 40.05976,-36.58095c-0.16863,-20.69916 1.98122,-44.84298 21.50519,-46.32918c19.52397,-1.4862 56.13474,46.7326 105.73844,19.449c49.60371,-27.2836 26.47538,-64.75821 144.7804,-70.8419c118.30502,-6.08369 264.59192,-20.00718 285.55507,-110.80875c20.96315,-90.80157 132.21235,-196.30257 -539.00433,-89.43794"
          stroke-width="1.5"
          stroke="#000"
          fill="#D6EEFA"
        />
      </g>
      <line
        y1="868"
        y2="868"
        x1="0"
        x2="1016"
        stroke-width="1"
        stroke="#000"
        fill="none"
      />
      <line
        y1="0"
        y2="0"
        x1="0"
        x2="1016"
        stroke-width="1"
        stroke="#000"
        fill="none"
      />
      <line
        y1="0"
        y2="868"
        x1="0"
        x2="0"
        stroke-width="1"
        stroke="#000"
        fill="none"
      />
      <line
        y1="0"
        y2="868"
        x1="1016"
        x2="1016"
        stroke-width="1"
        stroke="#000"
        fill="none"
      />

      {MAP_REGION_PATHS.map((path, index) => {
        let matchedRoleId;
        let matchedRegion;

        Object.entries(highlightedMapRegions ?? {}).find(
          ([roleId, regions = []]) =>
            regions.some((region) => {
              if (MAP_INDICES[region.split('-')[0]] !== index) {
                return false;
              }

              matchedRegion = region;
              matchedRoleId = roleId;

              return true;
            }),
        );

        return (
          <MapRegion
            pathOnly
            key={path}
            index={index}
            region={matchedRegion}
            roleId={matchedRoleId}
            onClick={onMapRegionClick}
          />
        );
      })}
    </svg>
  );
};
