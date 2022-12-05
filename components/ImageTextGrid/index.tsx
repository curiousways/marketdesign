import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';

import { classNames } from '@/utils/index';

type Props = {
  img: StaticImageData;
  alt?: string;
  text_title: string;
  reverse?: boolean
  children: ReactNode;
};

export const ImageTextGrid = ({ img, alt, text_title, reverse = false, children }: Props) => {
  return (
    <div
      className={classNames('lg:flex lg:gap-x-10 xl:gap-x-20 xl:space-y-16',
      reverse ?'lg:flex-row-reverse items-center': 'lg:flex-row')}
    >
      <div className="max-w-[833px] relative z-10">
        <Image
          src={img}
          alt={alt ?? ''}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>

      <div className="max-w-[461px] space-y-5">
        <h2 className="heading-2 max-w-[343px]">{text_title}</h2>
        {children}
      </div>
    </div>
  );
};
