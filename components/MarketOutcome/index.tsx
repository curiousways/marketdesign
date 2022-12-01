import { FC } from 'react';
import { classNames } from '@/utils/index';
import { HammerIcon } from '../../icons/HammerIcon';
import { BalanceIcon } from '../../icons/BalanceIcon';
import { CartPlus } from '../../icons/CartPlus';
import { PoundcashTag } from '../../icons/PoundcashTag';
import { OfferIcon } from '../../icons/OfferIcon';
import { PoundIcon } from '../../icons/PoundIcon';
import { Project } from '../../types/project';
import { useProjectsContext } from '../../context/ProjectsContext';
import { Biodiversity } from '../Biodiversity';
import { Nutrients } from '../Nutrients';

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
  const { getAcceptedProjectCost } = useProjectsContext();
  const totalBids = sumProjectCosts(getAcceptedProjectCost, buyerProjects);
  const totalOffers = sumProjectCosts(getAcceptedProjectCost, sellerProjects);

  return (
    <div
      data-testid="market-outcome"
      className={classNames(
        'z-10 items-center flex w-full gap-x-10 justify-between bg-blue-light p-5 rounded-lg select-none',
        className,
      )}
    >
      <div className="flex flex-col text-black text-center whitespace-nowrap flex-[30%] min-w-[75px]">
        <p className="text-black">Market Outcome</p>
      </div>

      <div className="flex gap-x-10 flex-[20%]">
        {/* Biodiversity */}
        <Biodiversity type="positive" boxStyle="outcome">
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
        </Biodiversity>

        {/* Nutrients */}
        <Nutrients type="positive" boxStyle="outcome">
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
        </Nutrients>
      </div>

      <div className="flex gap-x-10 flex-[50%]">
        <div className="space-y-5">
          {/* Total Bids */}
          <div className="bg-brown rounded-lg px-1 pb-1 w-[95px]">
            <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white shadow-custom">
              <HammerIcon />
            </div>

            {/* Offer */}
            <div className="text-center text-sm relative -mt-2">
              <p className="text-white">Total Bids</p>
              <p className="text-white" data-testid="total-bids">
                £{Math.round(totalBids).toLocaleString()}
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
                £{Math.round(totalOffers).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Surplus */}
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg px-1 pb-1 w-[95px]">
            <div className="w-[29px] h-[29px] mx-auto relative bottom-3 flex justify-center items-center rounded-full bg-white shadow-custom">
              <PoundIcon />
            </div>
            <div className="text-center text-sm relative -mt-2">
              <p className="text-light-grey">Surplus</p>
              <p data-testid="surplus">
                £{Math.round(totalBids - totalOffers).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Balance */}
        {isMarketSolved && (
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-lg px-1 pb-1 w-[95px]">
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
          </div>
        )}
      </div>
    </div>
  );
};
