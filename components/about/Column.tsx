import {ReactNode} from "react"

import { classNames } from '@/utils/index';

import { Button } from '@/components/Button';

type Props = {
  title?: string;
  button?: boolean;
  buttonLink?: string;
  buttonText?: string;
  children: ReactNode;
};


const Column = ({title, button, buttonLink, buttonText, children}: Props) => {
  return (
    <div className={classNames('max-w-[616px] space-y-10')}>
      <h2 className="heading-2">{title && title}</h2>

      {children}

      {button && (
        <Button
          text={buttonText ? buttonText : ''}
          link={buttonLink ? buttonLink : ''}
        />
      )}
    </div>
  );
}

export default Column
