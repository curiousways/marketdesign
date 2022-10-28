import Image from "next/image";

import HeaderImg from "../../public/assets/images/home/header.png";
import HeaderThumb from "../../public/assets/images/home/header-thumb.png";

const Header = () => {
  return (
    <header className="min-h-fit max-h-[1440px]">
      <div className="relative">
        <div>
          <Image src={HeaderImg} priority />
        </div>
        <div className="absolute max-w-500 -bottom-10 3xl:bottom-4 right-20">
          <Image
            src={HeaderThumb}
            width={HeaderThumb.width / 2}
            height={HeaderThumb.height / 2}
            priority
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center pl-20 2xl:pl-40">
          <div className="max-w-[526px] text-white space-y-3">
            <h1 className="text-[64px] leading-[62px]">
              The Lindsay Nature Market Model
            </h1>
            <p>
              Designed to facilitate trade in environmental goods and services
              at the local level.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
