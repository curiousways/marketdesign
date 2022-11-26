import { FC } from 'react';
import { AdjustedProductCount } from '../AdjustedProductCount';

type BiodiversityCountProps = {
  count?: number;
  adjustCount: boolean;
  accepted: number | boolean;
  shadowColor: string;
  showLoserStyles: boolean;
};

export const BiodiversityCount: FC<BiodiversityCountProps> = ({
  count,
  accepted,
  adjustCount,
  shadowColor,
  showLoserStyles,
}: BiodiversityCountProps) => {
  if (typeof count !== 'number') {
    return null;
  }

  if (showLoserStyles) {
    return (
      <div className="flex gap-x-1 relative">
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
        <div className="border border-black rounded-full bg-white w-[20px] h-[20px] flex justify-center items-center absolute -right-[8px] -top-[8px]">
          {count}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-[66px] w-[66px] rounded-lg flex items-center justify-center relative ${shadowColor}`}
    >
      <AdjustedProductCount
        count={count}
        accepted={adjustCount ? accepted : true}
      />
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
          stroke="white"
        />
      </svg>
    </div>
  );
};
