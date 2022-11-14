import Image, { ImageProps } from "next/image";
import { FunctionComponent } from "react";

type HeaderProps = {
  title: string;
  description: string;
  mainImageSrc: ImageProps['src'];
  secondaryImageSrc: ImageProps['src'];
}

const Header: FunctionComponent<HeaderProps> = ({
  title,
  description,
  mainImageSrc,
  secondaryImageSrc,
}) => {
  return (
    <header className="min-h-fit max-h-[1440px]">
      <div className="relative">
        <div>
          <Image priority src={mainImageSrc} />
        </div>
        <div className="absolute w-[500px] -bottom-10 3xl:bottom-4 right-20">
          <Image
            src={secondaryImageSrc}
            priority
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center pl-20 2xl:pl-40">
          <div className="max-w-[526px] text-white space-y-3">
            <h1 className="text-[64px] leading-[62px]">
              {title}
            </h1>
            <p>
              {description}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
