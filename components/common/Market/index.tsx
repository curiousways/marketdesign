import { FC } from 'react';
import { LoadingOverlay } from '../LoadingOverlay';
import { TopProgressBar } from '../TopProgressBar';
import { MarketBackgroundLeft } from '../../walkthroughs/icons/MarketBackgroundLeft';
import { MarketBackgroundRight } from '../../walkthroughs/icons/MarketBackground';
import { MarketScenario } from '../MarketScenario';
import { Project } from '../../../types/project';
import { RoleId } from '../../../types/roles';
import { HighlightedMapRegions } from '../../../types/map';

type MarketProps = {
  myProjects: Project[];
  buyerProjects: Project[];
  sellerProjects: Project[];
  roleId?: RoleId;
  showAllProjects?: boolean;
  showCosts: boolean;
  showWinners: boolean;
  showSurpluses: boolean;
  isMarketSolved: boolean;
  showParticipants: boolean;
  showMap?: boolean;
  highlightedMapRegions?: HighlightedMapRegions;
  onMapRegionClick?: (region: string, index: number) => void;
  link?: {
    href: string;
    text: string;
  };
  loadingOverlayText?: string;
  loadingBar?: {
    progress: number;
    loaderSpeed?: number;
    waitingTime?: number;
  };
};

export const Market: FC<MarketProps> = ({
  myProjects,
  buyerProjects,
  sellerProjects,
  link,
  roleId,
  showAllProjects,
  showCosts,
  showWinners,
  showSurpluses,
  isMarketSolved,
  showParticipants,
  showMap,
  highlightedMapRegions,
  onMapRegionClick,
  loadingOverlayText,
  loadingBar,
}: MarketProps) => (
  <div className="border-l border-green-dark pt-8 w-full relative flex justify-center">
    <div className="z-20">
      {loadingBar && <TopProgressBar {...loadingBar} />}
      <LoadingOverlay text={loadingOverlayText} />
    </div>
    <div className="z-10 mb-8">
      <MarketScenario
        myProjects={myProjects}
        buyerProjects={buyerProjects}
        sellerProjects={sellerProjects}
        showCosts={showCosts}
        showAllProjects={showAllProjects}
        showWinners={showWinners}
        showSurpluses={showSurpluses}
        isMarketSolved={isMarketSolved}
        roleId={roleId}
        link={link}
        showParticipants={showParticipants}
        showMap={showMap}
        highlightedMapRegions={highlightedMapRegions}
        onMapRegionClick={onMapRegionClick}
      />
    </div>

    {/* Background */}
    <div className="absolute right-0 left-0 bottom-0">
      <div className="absolute left-0 bottom-0">
        <MarketBackgroundLeft />
      </div>
      <div className="absolute right-0 bottom-0">
        <MarketBackgroundRight />
      </div>
    </div>
  </div>
);
