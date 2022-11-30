import { FC } from 'react';
import { AdjustedProductCount } from '../AdjustedProductCount';
import { Biodiversity } from '../Biodiversity';

type BiodiversityCountProps = {
  type: 'positive' | 'negative';
  boxStyle: 'buyer' | 'seller' | 'outcome';
  count?: number;
  adjustCount?: boolean;
  accepted: number | boolean;
  showLoserStyles?: boolean;
};

export const BiodiversityCount: FC<BiodiversityCountProps> = ({
  type,
  boxStyle,
  count,
  accepted,
  adjustCount,
  showLoserStyles,
}: BiodiversityCountProps) => {
  const hasCount = typeof count === 'number';

  if (showLoserStyles) {
    return (
      <Biodiversity type={type}>
        <div
          data-testid="losing-product-count"
          className="border border-black rounded-full bg-white w-[20px] h-[20px] flex justify-center items-center absolute -right-[8px] -top-[8px]"
        >
          {count}
        </div>
      </Biodiversity>
    );
  }

  return (
    <Biodiversity type={type} boxStyle={boxStyle} hidden={!hasCount}>
      <AdjustedProductCount
        count={count ?? 0}
        accepted={adjustCount ? accepted : true}
      />
    </Biodiversity>
  );
};
