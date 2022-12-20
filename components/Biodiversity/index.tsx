import { FC, ReactNode } from 'react';
import { ProductBox } from '../ProductBox';

type BiodiversityProps = {
  type: 'positive' | 'negative' | 'grey';
  boxStyle?: 'buyer' | 'seller' | 'outcome';
  children?: ReactNode;
  hidden?: boolean;
  size?: number;
};

export const Biodiversity: FC<BiodiversityProps> = ({
  type,
  boxStyle,
  children,
  hidden,
  size = 32,
}: BiodiversityProps) => {
  if (type === 'grey') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.7" filter="url(#filter0_ddiiii_1249_24261)">
          <path
            d="M15 3C11.8154 3 9.23377 5.58163 9.23377 8.76623C9.23377 9.02444 9.02444 9.23377 8.76623 9.23377C5.58163 9.23377 3 11.8154 3 15C3 18.1846 5.58163 20.7663 8.76623 20.7663C9.02444 20.7663 9.23377 20.9756 9.23377 21.2337C9.23377 24.4184 11.8154 27 15 27C18.1846 27 20.7663 24.4184 20.7663 21.2337C20.7663 20.9756 20.9756 20.7663 21.2337 20.7663C24.4183 20.7663 27 18.1846 27 15C27 11.8154 24.4183 9.23377 21.2337 9.23377C20.9756 9.23377 20.7663 9.02444 20.7663 8.76623C20.7663 5.58163 18.1846 3 15 3Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_ddiiii_1249_24261"
            x="-2"
            y="-2"
            width="34"
            height="34"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-1" dy="-1" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0.5 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1249_24261"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_1249_24261"
              result="effect2_dropShadow_1249_24261"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_1249_24261"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="5" dy="5" />
            <feGaussianBlur stdDeviation="6.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0.9 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect3_innerShadow_1249_24261"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-5" dy="-5" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0"
            />
            <feBlend
              mode="normal"
              in2="effect3_innerShadow_1249_24261"
              result="effect4_innerShadow_1249_24261"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="5" dy="-5" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="effect4_innerShadow_1249_24261"
              result="effect5_innerShadow_1249_24261"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-5" dy="5" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0 0.788235 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="effect5_innerShadow_1249_24261"
              result="effect6_innerShadow_1249_24261"
            />
          </filter>
        </defs>
      </svg>
    );
  }

  return (
    <ProductBox boxStyle={boxStyle} hidden={hidden}>
      {children}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.7"
          d="M8.81169 7.68831C8.81169 3.71831 12.03 0.5 16 0.5C19.97 0.5 23.1884 3.71832 23.1884 7.68831C23.1884 8.30864 23.6912 8.81169 24.3116 8.81169C28.2817 8.81169 31.5 12.03 31.5 16C31.5 19.97 28.2817 23.1884 24.3116 23.1884C23.6913 23.1884 23.1884 23.6913 23.1884 24.3116C23.1884 28.2817 19.97 31.5 16 31.5C12.03 31.5 8.81169 28.2817 8.81169 24.3116C8.81169 23.6912 8.30864 23.1884 7.68831 23.1884C3.71832 23.1884 0.5 19.97 0.5 16C0.5 12.03 3.71831 8.81169 7.68831 8.81169C8.30873 8.81169 8.81169 8.30873 8.81169 7.68831Z"
          fill={type === 'positive' ? '#6FCF97' : undefined}
          stroke="white"
        />
      </svg>
    </ProductBox>
  );
};
