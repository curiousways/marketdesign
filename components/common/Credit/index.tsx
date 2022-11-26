import { FC } from 'react';
import { classNames } from '@/utils/index';

type CreditProps = {
  count?: number;
  costPerCredit?: number;
  Icon: JSX.Element;
};

export const Credit: FC<CreditProps> = ({
  count,
  costPerCredit,
  Icon,
}: CreditProps) => {
  if (typeof count !== 'number') {
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
        {costPerCredit ? `£${costPerCredit * count}` : count}
      </span>
    </div>
  );
};
