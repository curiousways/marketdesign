import { FC } from 'react';
import { AdjustedProductCount } from '../AdjustedProductCount';
import { Biodiversity } from '../Biodiversity';

type BiodiversityCountProps = {
  type: 'positive' | 'negative';
  count?: number;
  adjustCount?: boolean;
  accepted: number | boolean;
  shadowColor: string;
  showLoserStyles?: boolean;
};

export const BiodiversityCount: FC<BiodiversityCountProps> = ({
  type,
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
        <Biodiversity type={type} />
        <div
          data-testid="losing-product-count"
          className="border border-black rounded-full bg-white w-[20px] h-[20px] flex justify-center items-center absolute -right-[8px] -top-[8px]"
        >
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
      <Biodiversity type={type} />
    </div>
  );
};
