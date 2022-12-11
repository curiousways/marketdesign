import { FC } from 'react';
import { classNames } from '@/utils/index';

type CreditProps = {
  count?: number;
  costPerCredit?: number;
};

export const Credit: FC<CreditProps> = ({
  count,
  costPerCredit,
}: CreditProps) => {
  if (typeof count !== 'number') {
    return null;
  }

  return (
    <span
      data-testid="credit"
      className={classNames(
        'top-0 text-black border border-black rounded-full bg-white h-[14px] flex justify-center items-center',
        costPerCredit
          ? 'p-1 text-[12px]'
          : 'absolute font-bold w-[14px] -right-1 text-[10px]',
      )}
    >
      {costPerCredit ? `£${(costPerCredit * count).toLocaleString()}` : count}
    </span>
  );
};
