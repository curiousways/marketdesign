import { FC } from 'react';
import { Credit } from '../Credit';

type CreditWithIconProps = {
  count?: number;
  costPerCredit?: number;
  Icon: JSX.Element;
};

export const CreditWithIcon: FC<CreditWithIconProps> = ({
  count,
  costPerCredit,
  Icon,
}: CreditWithIconProps) => {
  if (typeof count !== 'number') {
    return null;
  }

  return (
    <div className="relative flex">
      {Icon}
      <Credit count={count} costPerCredit={costPerCredit} />
    </div>
  );
};
