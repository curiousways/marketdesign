import { FC } from 'react';
import LoadingBar from 'react-top-loading-bar';

type TopProgressBarProps = {
  progress: number;
  loaderSpeed?: number;
  waitingTime?: number;
};

export const TopProgressBar: FC<TopProgressBarProps> = ({
  progress,
  loaderSpeed,
  waitingTime,
}: TopProgressBarProps) => (
  <LoadingBar
    color="#7DBB67"
    height={3}
    progress={progress}
    loaderSpeed={loaderSpeed}
    waitingTime={waitingTime}
    shadow={false}
  />
);
