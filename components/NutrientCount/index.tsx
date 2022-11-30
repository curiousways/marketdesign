import { FC } from 'react';
import { AdjustedProductCount } from '../AdjustedProductCount';
import { Nutrients } from '../Nutrients';

type NutrientCountProps = {
  type: 'positive' | 'negative';
  count?: number;
  adjustCount?: boolean;
  accepted: number | boolean;
  shadowColor: string;
  showLoserStyles?: boolean;
};

export const NutrientCount: FC<NutrientCountProps> = ({
  type,
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
        <Nutrients type={type} />
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
      className={`h-[66px] w-[66px] ${shadowColor} rounded-lg flex items-center justify-center relative`}
    >
      <AdjustedProductCount
        count={count}
        accepted={adjustCount ? accepted : true}
      />
      <Nutrients type={type} />
    </div>
  );
};
