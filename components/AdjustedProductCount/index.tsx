import { FC } from 'react';
import { ProductCount } from '../ProductCount';

type AdjustedProductCountProps = {
  count: number;
  accepted: boolean | number;
};

export const AdjustedProductCount: FC<AdjustedProductCountProps> = ({
  count,
  accepted,
}: AdjustedProductCountProps) => {
  const adjustedCount =
    typeof accepted === 'number' ? Math.round((accepted / 100) * count) : count;

  return (
    <div className="absolute -right-3 -top-2">
      <div className="relative">
        <ProductCount className="border z-10">{adjustedCount}</ProductCount>
        {adjustedCount !== count && (
          <ProductCount className="opacity-50 top-[23px] z-0">
            {count}
          </ProductCount>
        )}
      </div>
    </div>
  );
};
