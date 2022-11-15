import { classNames } from "@/utils/index";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const ProductCount = ({
  children,
  className,
}: Props) => (
  <div
    className={classNames(
      'absolute right-0 border-black rounded-full bg-white w-[29px] h-[29px] flex justify-center items-center',
      className,
    )}
  >
    {children}
  </div>
);

export default ProductCount;
