import { useWalkthroughContext } from '@/context/WalkthroughContext';
import type { WalkthroughProject } from '@/types/walkthrough';
import { classNames } from '@/utils/index';
import { isMyProject } from '@/utils/walkthroughs';
import { FunctionComponent } from 'react';

type Props = {
  project: WalkthroughProject;
  showAcceptedPercentage?: boolean;
}

export const ProjectTitle: FunctionComponent<Props> = ({
  project,
  showAcceptedPercentage,
}: Props) => {
  const { scenario } = useWalkthroughContext();
  const { title, subtitle, accepted } = project;
  const acceptedPercentage = showAcceptedPercentage && Number.isFinite(accepted)
    ? accepted
    : null;

  return (
    <div className="flex flex-col text-black text-center flex-[30%]">
      <p
        className={classNames(isMyProject(scenario, project) ? 'font-bold' : '')}
      >
        {title}
      </p>
      {acceptedPercentage ? (
        <span className="bg-white rounded-full px-3 py-1 mt-1">
          Accepted: {acceptedPercentage}%
        </span>
      ): subtitle && <p>{subtitle}</p>}
    </div>
  );
};
