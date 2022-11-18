import { classNames } from "@/utils/index";

type Props = {
  productCount?: number;
  costPerCredit?: number;
  Icon: JSX.Element;
};

const ProductCount = ({
  productCount,
  costPerCredit,
  Icon,
}: Props) => {
  if (typeof productCount !== 'number') {
    return null;
  }

  return (
    <div className="relative flex">
      {Icon}
      <span
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

export default ProductCount;
