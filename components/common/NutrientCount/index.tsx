import { FC } from 'react';
import { AdjustedProductCount } from '../AdjustedProductCount';

type NutrientCountProps = {
  count?: number;
  adjustCount: boolean;
  accepted: number | boolean;
  shadowColor: string;
  showLoserStyles: boolean;
};

export const NutrientCount: FC<NutrientCountProps> = ({
  count,
  accepted,
  adjustCount,
  shadowColor,
  showLoserStyles,
}: NutrientCountProps) => {
  if (typeof count !== 'number') {
    return null;
  }

  if (showLoserStyles) {
    return (
      <div className="flex gap-x-1 relative">
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
        <div className="border border-black rounded-full bg-white w-[20px] h-[20px] flex justify-center items-center absolute -right-[8px] -top-[8px]">
          {count}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-[66px] w-[66px] ${shadowColor} rounded-lg flex items-center justify-center relative`}
    >
      <AdjustedProductCount
        count={count}
        accepted={adjustCount ? accepted : true}
      />
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
          stroke="white"
        />
      </svg>
    </div>
  );
};
