import { FC, ReactNode } from 'react';

import { classNames } from '@/utils/index';

import { NavButton } from '@/components/NavButton';
import { InlineTitle } from '@/components/InlineTitle/index';

type ColumnProps = {
  title?: string;
  button?: { link: string; text: string };
  titlebackground?: boolean;
  titleClass?: string;
  className?: string;
  children: ReactNode;
};

export const Column: FC<ColumnProps> = ({
  title,
  button,
  className,
  children,
  titlebackground,
  titleClass,
}: ColumnProps) => {
  return (
    <div className={classNames('max-w-[616px] space-y-10', className)}>
      {title && (
        <InlineTitle
          titleClass={titleClass}
          title={title}
          background={titlebackground}
        />
      )}
      {children}

      {button && <NavButton text={button.text} link={button.link} />}
    </div>
  );
};
