import { useWalkthroughContext } from '@/context/WalkthroughContext';
import type { WalkthroughProject } from '@/types/walkthrough';
import { classNames } from '@/utils/index';
import { isMyProject } from '@/utils/walkthroughs';
import { FunctionComponent } from 'react';

type Props = {
  project: WalkthroughProject;
  projectCost: number,
  acceptedCost: number | boolean;
  hideMainTitle: boolean;
  showLoserStyles: boolean;
  showAcceptedCosts?: boolean;
}

export const ProjectTitle: FunctionComponent<Props> = ({
  project,
  projectCost,
  acceptedCost,
  hideMainTitle,
  showAcceptedCosts,
  showLoserStyles,
}: Props) => {
  const { scenario } = useWalkthroughContext();
  const { title, subtitle } = project;
  const acceptedPercentage = showAcceptedCosts && Number.isFinite(acceptedCost)
    ? acceptedCost
    : null;

  return (
    <div className={classNames(
      'flex flex-col text-black text-center whitespace-nowrap',
      showLoserStyles ? '' : 'flex-[30%] min-w-[125px]',
    )}>
      {!hideMainTitle && (
        <div className="flex flex-col">
          <p
            className={classNames(isMyProject(scenario, project) ? 'font-bold' : '')}
          >
            {title}
          </p>
          {showLoserStyles && (
            <p>£{projectCost.toLocaleString()}</p>
          )}
        </div>
      )}
      {acceptedPercentage ? (
        <span className="bg-white rounded-full px-3 py-1 mt-1">
          Accepted: {acceptedPercentage}%
        </span>
      ): subtitle && <p>{subtitle}</p>}
    </div>
  );
};
