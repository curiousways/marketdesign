import { FC } from 'react';
import { classNames } from '@/utils/index';

export type MarketParticipantTitleProps = {
  title: string;
  subtitle?: string;
  isMyProject: boolean;
  projectCost: number;
  accepted: number | boolean;
  hideMainTitle: boolean;
  showLoserStyles: boolean;
  showAcceptedCosts?: boolean;
};

export const MarketParticipantTitle: FC<MarketParticipantTitleProps> = ({
  title,
  subtitle,
  isMyProject,
  projectCost,
  accepted,
  hideMainTitle,
  showAcceptedCosts,
  showLoserStyles,
}: MarketParticipantTitleProps) => {
  const acceptedPercentage =
    showAcceptedCosts && Number.isFinite(accepted) ? accepted : null;

  const commonTextClassNames = 'overflow-hidden text-left text-ellipsis';

  return (
    <div
      className={classNames(
        'flex flex-col text-black text-center whitespace-nowrap',
        showLoserStyles ? 'w-[100px]' : 'flex-[30%] min-w-[75px]',
      )}
    >
      {!hideMainTitle && (
        <div className="flex flex-col">
          <p
            className={classNames(
              isMyProject ? 'font-bold' : '',
              commonTextClassNames,
            )}
          >
            {title}
          </p>
          {showLoserStyles && (
            <p className={commonTextClassNames}>
              £{projectCost.toLocaleString()}
            </p>
          )}
        </div>
      )}
      {!showLoserStyles &&
        (acceptedPercentage ? (
          <span className="bg-white rounded-full px-3 py-1 mt-1">
            Accepted: {acceptedPercentage}%
          </span>
        ) : (
          subtitle && <p className={commonTextClassNames}>{subtitle}</p>
        ))}
    </div>
  );
};
