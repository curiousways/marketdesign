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
      'absolute right-0 border-black rounded-full bg-white w-[29px] h-[29px] flex justify-center items-center',
      className,
    )}
  >
    {children}
  </div>
);
