import { ReactNode } from 'react';

import { classNames } from '@/utils/index';

import { Button } from '@/components/Button';

type Props = {
  title?: string;
  button?: boolean;
  buttonLink?: string;
  buttonText?: string;
  titleClass?:string;
  className?: string
  children: ReactNode;
};

export const Column = ({
  title,
  button,
  buttonLink,
  buttonText,
  className,
  titleClass,
  children,
}: Props) => {
  return (
    <div className={classNames('max-w-[616px] space-y-10', className)}>
      <h2 className={classNames('heading-2', titleClass)}>{title && title}</h2>
      {children}

      {button && <Button text={buttonText ?? ''} link={buttonLink ?? ''} />}
    </div>
  );
};
