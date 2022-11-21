import Image, { ImageProps } from 'next/image';
import { FunctionComponent } from 'react';
import HeaderOverlayImage from '../../public/assets/images/header-overlay.png';

type HeaderProps = {
  title: string;
  description: string;
  mainImageSrc: ImageProps['src'];
  secondaryImageSrc: ImageProps['src'];
};

const Header: FunctionComponent<HeaderProps> = ({
  title,
  description,
  mainImageSrc,
  secondaryImageSrc,
}) => {
  return (
    <header>
      <div className="relative">
        <div className="absolute z-20 w-full h-full">
          <Image src={HeaderOverlayImage} layout="fill" alt="" sizes="100vw" />
        </div>
        <div>
          <Image
            priority
            src={mainImageSrc}
            alt=""
            layout="responsive"
            sizes="100vw"
          />
        </div>
        <div className="absolute hidden xl:block w-[500px] -bottom-10 3xl:bottom-4 right-20 z-30">
          <Image
            priority
            src={secondaryImageSrc}
            alt=""
            sizes="(min-width: 500px) 500px, 100vw"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center pl-10 lg:pl-20 2xl:pl-40 z-30">
          <div className="max-w-[526px] text-white space-y-3">
            <h1 className="heading-1 text-4xl lg:text-6xl">{title}</h1>
            <p className="lg:text-xl">{description}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
