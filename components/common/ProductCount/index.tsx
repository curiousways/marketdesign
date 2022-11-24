import React, { FC } from 'react';
import { classNames } from '@/utils/index';

type ProductCountProps = {
  productCount?: number;
  costPerCredit?: number;
  Icon: JSX.Element;
};

export const ProductCount: FC<ProductCountProps> = ({
  productCount,
  costPerCredit,
  Icon,
}: ProductCountProps) => {
  if (typeof productCount !== 'number') {
    return null;
  }

  return (
    <div className="relative flex">
      {Icon}
      <span
        data-testid="product-count"
        className={classNames(
          'top-0 text-[10px] text-black border border-black rounded-full bg-white h-[14px] flex justify-center items-center',
          costPerCredit ? 'p-1' : 'absolute font-bold w-[14px] -right-1',
        )}
      >
        {costPerCredit ? `£${costPerCredit * productCount}` : productCount}
      </span>
    </div>
  );
};
