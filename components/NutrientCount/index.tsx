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
};

export const NutrientCount: FC<NutrientCountProps> = ({
  type,
  boxStyle,
  count,
  accepted,
  adjustCount,
  showLoserStyles,
}: NutrientCountProps) => {
  if (typeof count !== 'number') {
    return null;
  }

  if (showLoserStyles) {
    return (
      <Nutrients type={type}>
        <div
          data-testid="losing-product-count"
          className="border border-black rounded-full bg-white w-[20px] h-[20px] flex justify-center items-center absolute -right-[8px] -top-[8px]"
        >
          {count}
        </div>
      </Nutrients>
    );
  }

  return (
    <Nutrients type={type} boxStyle={boxStyle}>
      <AdjustedProductCount
        count={count}
        accepted={adjustCount ? accepted : true}
      />
    </Nutrients>
  );
};
