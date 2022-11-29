import { FC } from 'react';
import { classNames } from '@/utils/index';
import HammerIcon from '../../walkthroughs/icons/HammerIcon';
import BalanceIcon from '../../walkthroughs/icons/BalanceIcon';
import CartPlus from '../../walkthroughs/icons/CartPlus';
import PoundcashTag from '../../walkthroughs/icons/PoundcashTag';
import OfferIcon from '../../walkthroughs/icons/OfferIcon';
import PoundIcon from '../../walkthroughs/icons/PoundIcon';
import { Project } from '../../../types/project';
import { useProjectsContext } from '../../../context/ProjectsContext';

type MarketOutcomeProps = {
  className?: string;
  buyerProjects: Project[];
  sellerProjects: Project[];
  isMarketSolved?: boolean;
};

const sumProjectCosts = (
  getProjectCost: (project: Project) => number,
  projects: Project[],
) =>
  projects
    .filter((project) => !!project.accepted(getProjectCost(project)))
    .reduce((acc, project) => acc + getProjectCost(project), 0);

export const MarketOutcome: FC<MarketOutcomeProps> = ({
  className = '',
  buyerProjects,
  sellerProjects,
  isMarketSolved,
}: MarketOutcomeProps) => {
  const { getProjectCost } = useProjectsContext();
  const totalBids = sumProjectCosts(getProjectCost, buyerProjects);
  const totalOffers = sumProjectCosts(getProjectCost, sellerProjects);

  return (
    <div
      data-testid="market-outcome"
      className={classNames(
        'bg-blue-light px-10 py-5 rounded-lg flex items-center gap-x-12 select-none',
        className,
      )}
    >
      <div>
        <p className="text-black">
          Market <br /> Outcome
        </p>
      </div>

      <div className="flex gap-x-10">
        {/* Biodiversity */}
        <div className="h-[66px] w-[66px] neo-shadow-blue rounded-lg flex items-center justify-center relative">
          <div className="absolute -right-3 -top-2 rounded-full bg-white w-[29px] h-[29px] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M416 128L192 384l-96-96"
              />
            </svg>
          </div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.7"
              d="M8.81169 7.68831C8.81169 3.71831 12.03 0.5 16 0.5C19.97 0.5 23.1884 3.71832 23.1884 7.68831C23.1884 8.30864 23.6912 8.81169 24.3116 8.81169C28.2817 8.81169 31.5 12.03 31.5 16C31.5 19.97 28.2817 23.1884 24.3116 23.1884C23.6913 23.1884 23.1884 23.6913 23.1884 24.3116C23.1884 28.2817 19.97 31.5 16 31.5C12.03 31.5 8.81169 28.2817 8.81169 24.3116C8.81169 23.6912 8.30864 23.1884 7.68831 23.1884C3.71832 23.1884 0.5 19.97 0.5 16C0.5 12.03 3.71831 8.81169 7.68831 8.81169C8.30873 8.81169 8.81169 8.30873 8.81169 7.68831Z"
              fill="#6FCF97"
              stroke="white"
            />
          </svg>
        </div>

        {/* Nutrients */}
        <div className="h-[66px] w-[66px] neo-shadow-blue rounded-lg flex items-center justify-center relative">
          <div className="absolute -right-3 -top-2 rounded-full bg-white w-[29px] h-[29px] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M416 128L192 384l-96-96"
              />
            </svg>
          </div>

          <svg
            width="22"
            height="32"
            viewBox="0 0 22 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.7"
              d="M3.55382 28.7654L3.5538 28.7654C1.58991 27.0217 0.5 24.6703 0.5 22.2332C0.5 18.4038 2.4831 15.5249 5.04685 11.8362L5.05338 11.8268C6.98602 9.04625 9.20932 5.84757 10.9755 1.52781L10.9998 1.60143L11.0243 1.52726C12.7905 5.8473 15.0139 9.04614 16.9466 11.8268L16.9531 11.8361C19.5168 15.5249 21.5 18.4038 21.5 22.2332C21.5 24.6703 20.4101 27.0217 18.4462 28.7654C16.4949 30.498 13.7822 31.5 11 31.5C8.19741 31.5 5.51957 30.511 3.55382 28.7654Z"
              fill="#56CCF2"
              stroke="white"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-x-10">
        <div className="space-y-4">
          {/* Total Bids */}
          <div className="bg-brown rounded-lg px-1 w-[95px]">
            <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white shadow-custom">
              <HammerIcon />
            </div>

            {/* Offer */}
            <div className="text-center text-sm relative -mt-2">
              <p className="text-white">Total Bids</p>
              <p className="text-white" data-testid="total-bids">
                £{totalBids.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Total Offers */}
          <div className="bg-green-light rounded-lg px-1 pb-1 w-[95px]">
            <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white shadow-custom">
              <OfferIcon />
            </div>

            <div className="text-center text-sm relative -mt-2">
              <p className="text-white">Total Offers</p>
              <p className="text-white" data-testid="total-offers">
                £{totalOffers.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Surplus */}
        <div className="bg-white rounded-lg px-1 w-[95px]">
          <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white shadow-custom">
            <PoundIcon />
          </div>

          <div className="text-center text-sm relative -mt-2">
            <p className="text-light-grey">Surplus</p>
            <p data-testid="surplus">
              £{(totalBids - totalOffers).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Balance */}
        {isMarketSolved && (
          <div className="bg-white rounded-lg px-1 w-[95px]">
            <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white shadow-custom">
              <BalanceIcon />
            </div>

            <div className="text-center text-sm relative -mt-2">
              <p className="text-light-grey">Balance</p>
              <div
                className="flex justify-center items-center gap-x-1"
                data-testid="balance"
              >
                <CartPlus />
                <span>=</span>
                <PoundcashTag />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
