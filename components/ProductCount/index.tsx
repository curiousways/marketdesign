import { FC, ReactNode } from 'react';
import { classNames } from '@/utils/index';

type ProductCountProps = {
  children: ReactNode;
  className?: string;
};

export const ProductCount: FC<ProductCountProps> = ({
  children,
  className,
}: ProductCountProps) => (
  <div
    data-testid="product-count"
    className={classNames(
      'absolute right-0 border-black rounded-full bg-white min-w-[29px] min-h-[29px] leading-[.5rem] p-[.5rem] flex justify-center items-center',
      className,
    )}
  >
    {children}
  </div>
);
