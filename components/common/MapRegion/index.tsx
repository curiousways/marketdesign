import { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
  MAP_REGION_KEYS,
  MAP_VIEWBOX,
  MAP_VIEWBOX_HEIGHT,
  MAP_VIEWBOX_WIDTH,
} from '../../../constants/map';
import { RoleId } from '../../../types/roles';
import { classNames } from '../../../utils';

type MapProps = {
  index: number;
  size?: number;
  roleId?: RoleId;
  onClick?: (region: string, index: number) => void;
  pathOnly?: boolean;
};

export const MAP_REGION_PATHS = [
  'M42.5 594L142 572L206.5 590.5L248 567L260.5 594L264 611.5L263.5 612L220.5 647.5L96 665.5L42.5 624V594Z',
  'M118.5 413L209 351.5L241 421L246 432L267.5 444V481.5L213 519H180L118.5 413Z',
  'M185.5 833L179.5 868H114.5L78 823L36.5 738L21 685L80 688L109 747.5L185.5 833Z',
  'M544.5 301.5L498.5 272.5L498 273L507.5 369L519.5 502.5L533 610.5C551.167 632.5 588.1 677.1 590.5 679.5C590 678 595.5 673 600 670C604.5 667 619.5 669 624.5 670C629.125 670.925 640.5 679 649.5 681.5C658.5 684 670 678.5 672.5 676C675 673.5 683 665 683.5 654.5C684 644 685.5 639 689 628.5C691.8 620.1 698.833 618 702 618V607L721 571L620.5 484.5L569.5 479.5L558.5 413L572.5 315L544.5 301.5Z',
  'M567.5 741C569.5 729 583.667 694.667 590.5 679H590L533 610.5L465.5 698L435 711L356 719.5L349 770.5L365.5 771L377 845.5H419L415.5 868H458.5C456.667 855.667 455 827.9 463 815.5C471 803.1 485.667 795.667 492 793.5C500.167 788 519 776.7 529 775.5C541.5 774 565 756 567.5 741Z',
  'M500 186.5L599 137.5L615.5 282L551 292.5L544.5 301.5L498.5 272.5L500 186.5Z',
  'M431.5 369H507.5L519.5 502.5L482 519L457 489L411 407.5L409 378.5L431.5 369Z',
  'M702 618C722 616 730.333 623.833 732 628L763 545H763.5L706 420.5L712 361.5L735 249V248.5V248V247.5L615.5 282L551 292.5L544.5 301.5L572.5 315L558.5 413L569.5 479.5L620.5 484.5L721 571L702 607V618Z',
  'M706 420.5L712 361.5L855 368.687V404L873 466L864 493.5L826.5 542L763.5 545L706 420.5Z',
  'M463 107.5L459.5 137.5L501 186L599 137.5L640.5 70.5L607 0.5H580L506.5 40L463 107.5Z',
  'M689.5 0.5L640.5 70.5L654 163.5L722 153.5L901 215.5L948 194L923.5 81L893.5 70.5L828.5 107.5L800 88L802.5 46L787.5 18L751.5 28L719.5 0.5H689.5Z',
  'M423 224.5L350 101.5L297 167.5L269.5 216L314.5 279.5L423 224.5Z',
  'M350 35.5V101L424 224.5L500.5 186.5L459 138L438.5 149L407.5 61L359 29.5L350 35.5Z',
  'M63 362.5L43.5 391.5L56.5 414L60.5 428.5L74 443L185.5 367.5L147 292.5L94.5 303V354.5L63 362.5Z',
  'M43.5 392L1 377V458L29 443H73.5L60.5 428.5L56.5 414.5L43.5 392Z',
  'M185.5 367L147.5 292L179.5 258L269.5 216.5L314 280.5L185.5 367Z',
  'M923 80.5L893.5 70.5L860 89L873 37V1H980.5L985.5 26L955 75L923 80.5Z',
  'M986 25.5L1008 0.5H1014.5V205.5L999.5 210L984.5 195L948 193.5L924 80.5L956 74.5L986 25.5Z',
  'M999.5 210L1014.5 205.5V302L992 297.5L999.5 210Z',
  'M984.5 195L999.5 210L992 297L873 296L762.5 247.5H735L615.5 282L599 137.5L640.5 70.5L654 163.5L722 153.5L901 215.5L948 194L984.5 195Z',
  'M992 297.5L1014.5 302C1014.67 376.833 1015 527.9 1015 533.5C1011 531.1 984.333 545.167 971.5 552.5L966.5 526.5L978.5 465L966.5 387L992 297.5Z',
  'M966.5 387L992 297.5V297L873 296L855 368.5V404L873 466L864 493.5L827 541.5L909 527H966.5L978.5 465L966.5 387Z',
  'M762.5 247.5L873 296L855 368.5L712 361.5L735.23 247.5H762.5Z',
  'M966.5 527L971.5 552.5C970 554.5 957.5 558 955.5 558C953.5 558 934.5 566 932.5 567C930.9 567.8 905.5 574 893 577C884.167 579.5 864.1 585.2 854.5 588C829 594.5 809.5 603.5 804.5 606C801.5 606.5 788.5 621.5 777 636.5C769.8 648.5 759.667 649.833 755.5 649L759 624L777 580.5L803.5 575L826.5 542L909 527H966.5Z',
  'M759 624L755.5 649C744.3 649.8 735.167 635.333 732 628L763 545L826.5 542L803.5 575L777 580.5L759 624Z',
  'M29 443L1 458V479.5L12.5 513H40L64.5 544.5L92.5 566.5L147.5 554.5L180 519L118.5 413L74 443H29Z',
  'M498 273L382 351L391 386L431.5 369H507.5L498 273Z',
  'M335 606L264 611.5L220.5 647.5L199.5 679L185.5 833H205.5L277 779.5L349 770.5L356 720L335 606Z',
  'M18 732L6 743.5L12.5 834.5L18 868H114.5L78 823L36.5 738L18 732Z',
  'M431 549L435 711L465.5 698L533 610.5L519.5 502.5L482 519L431 549Z',
  'M323.5 845L325.5 867.5V868H415.5L419 845.5L323.5 845Z',
  'M185.5 833L179.5 868H325.5V867.5L323.5 845H377L376.5 843.5L365.5 771L349 770.5L277 779.5L205.5 833H185.5Z',
  'M435 711L431 549L335 606L356 719.5L435 711Z',
  'M96 665.5L80.5 688V688.5L109.5 748L185.5 832L199.5 678.5L220.5 647.5L96 665.5Z',
  'M457 489L481.5 518.5L482 519L384.5 576L296.5 420.5L391 386L409 378.5L411 407.5L457 489Z',
  'M498.5 272.5L500 187H499.5L424 224.5H423.5L357.5 258L382 351L498.5 272.5Z',
  'M314.5 280L357 258.5H357.5L391 386L297 420H241L209 351.5L314.5 280Z',
  'M1 868H18L12.5 834L6 743.5L1 737V868Z',
  'M21 685L1 684.5V737L6 743.5L18 732L36.5 738L21 685Z',
  'M384 575.5L296.5 420.5L296 420H241V421L246 432L267.5 444V481.5L212.955 519H180L147.5 554.5L147 555L142 572L206.5 590.5L248 567L260.5 594L264 611.5L335 606L384 575.5Z',
  'M40 513H12.5L6 532L42.5 594L142 572L147 555H145.5L92 566.5L64.5 544.5L40 513Z',
];

const getFillColour = (roleId?: RoleId) => {
  if (!roleId) {
    return 'white';
  }

  if (roleId === 'seller') {
    return '#BFDDB3';
  }

  return '#9D7F69';
};

const getTranslatedDimension = (
  scale: number,
  axis: 'x' | 'y',
  dimension: 'width' | 'height',
  availableSpace: number,
  boundingBox?: DOMRect,
) => {
  if (!boundingBox) {
    return 0;
  }

  // Start with a translation that will place the path at the top left of the
  // container (depending on which dimension we are translating).
  const translate = boundingBox ? boundingBox[axis] * scale : 0;

  // Calculate the remaining space now not filled by the SVG path once scaled
  // and modify the translation to center the path within the container.
  const remainingSpace = (availableSpace - scale * boundingBox[dimension]) / 2;

  return translate - remainingSpace;
};

const getScale = (boundingBox?: DOMRect) => {
  if (!boundingBox) {
    return 1;
  }

  const widthScale = MAP_VIEWBOX_WIDTH / boundingBox.width;
  const heightScale = MAP_VIEWBOX_HEIGHT / boundingBox.height;

  // Scale the SVG path to fit within the smallest of the width or height.
  return Math.min(widthScale, heightScale);
};

export const MapRegion: FunctionComponent<MapProps> = ({
  index,
  roleId,
  size,
  onClick,
  pathOnly,
}: MapProps) => {
  const ref = useRef<SVGPathElement>(null);
  const [boundingBox, setBoundingBox] = useState<DOMRect>();

  useEffect(() => {
    if (!ref.current || pathOnly) {
      return;
    }

    setBoundingBox(ref.current.getBBox());
  }, [pathOnly]);

  const region = (
    <path
      data-testid="map-region"
      d={MAP_REGION_PATHS[index]}
      ref={ref}
      fill={getFillColour(roleId)}
      vectorEffect="non-scaling-stroke"
      stroke="black"
      className={classNames(onClick ? 'cursor-pointer' : '')}
      onClick={() => {
        if (MAP_REGION_KEYS[index]) {
          onClick?.(MAP_REGION_KEYS[index], index);
        }
      }}
    />
  );

  if (pathOnly) {
    return region;
  }

  const scale = getScale(boundingBox);

  const translateX = getTranslatedDimension(
    scale,
    'x',
    'width',
    MAP_VIEWBOX_WIDTH,
    boundingBox,
  );

  const translateY = getTranslatedDimension(
    scale,
    'y',
    'height',
    MAP_VIEWBOX_HEIGHT,
    boundingBox,
  );

  return (
    <svg width={size} height={size}>
      <svg viewBox={MAP_VIEWBOX}>
        <g
          transform={`translate(-${translateX}, -${translateY}) scale(${scale}, ${scale})`}
        >
          <g>{region}</g>
        </g>
      </svg>
    </svg>
  );
};
