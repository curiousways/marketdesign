import { ReactNode } from 'react';

import { classNames } from '@/utils/index';

import { Button } from '@/components/Button';
import { InlineTitle } from "@/components/InlineTitle/index"

type Props = {
  title?: string;
  button?: boolean;
  buttonLink?: string;
  buttonText?: string;
  titlebackground?: boolean;
  titleClass?: string;
  className?: string;
  children: ReactNode;
};

export const Column = ({
  title,
  button,
  buttonLink,
  buttonText,
  className,
  children,
  titlebackground,
  titleClass,
}: Props) => {
  return (
    <div className={classNames('max-w-[616px] space-y-10', className)}>
      <InlineTitle
        titleClass={titleClass ?? ""}
        title={title ?? ''}
        background={titlebackground}
      />
      {children}

      {button && <Button text={buttonText ?? ''} link={buttonLink ?? ''} />}
    </div>
  );
};
