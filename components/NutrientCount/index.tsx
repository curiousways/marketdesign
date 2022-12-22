import { FC } from 'react';
import { AdjustedProductCount } from '../AdjustedProductCount';
import { Nutrients } from '../Nutrients';

type NutrientCountProps = {
  type: 'positive' | 'negative';
  boxStyle: 'buyer' | 'seller' | 'outcome';
  count?: number;
  adjustCount?: boolean;
  accepted: number | boolean;
  showLoserStyles?: boolean;
  projectBid: number;
  costPerCredit?: number;
};

export const NutrientCount: FC<NutrientCountProps> = ({
  type,
  boxStyle,
  count,
  accepted,
  adjustCount,
  showLoserStyles,
  projectBid,
  costPerCredit,
}: NutrientCountProps) => {
  const hasCount = typeof count === 'number';
  const maxCount =
    hasCount && !!costPerCredit
      ? Math.floor((costPerCredit * count) / projectBid)
      : count;

  if (showLoserStyles) {
    return (
      <Nutrients type={type}>
        <div
          data-testid="losing-product-count"
          className="border border-black rounded-full bg-white w-[20px] h-[20px] flex justify-center items-center absolute -right-[8px] -top-[8px]"
        >
          {maxCount}
        </div>
      </Nutrients>
    );
  }

  return (
    <Nutrients type={type} boxStyle={boxStyle} hidden={!hasCount}>
      <AdjustedProductCount
        count={maxCount ?? 0}
        accepted={adjustCount ? accepted : true}
      />
    </Nutrients>
  );
};
