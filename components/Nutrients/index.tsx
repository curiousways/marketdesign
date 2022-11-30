import { FC, ReactNode } from 'react';
import { ProductBox } from '../ProductBox';

type NutrientsProps = {
  type: 'positive' | 'negative' | 'grey';
  boxStyle?: 'buyer' | 'seller' | 'outcome';
  children?: ReactNode;
};

export const Nutrients: FC<NutrientsProps> = ({
  type,
  boxStyle,
  children,
}: NutrientsProps) => {
  if (type === 'grey') {
    return (
      <svg
        width="23"
        height="30"
        viewBox="0 0 23 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.7" filter="url(#filter0_ddiiii_1249_24260)">
          <path
            d="M11.5 27C9.24575 27 7.08361 26.2283 5.48959 24.8545C3.89553 23.4807 3 21.6176 3 19.6749C3 16.666 4.61495 14.4108 6.58258 11.6631C8.11304 9.52596 9.85682 7.09082 11.2202 3.77137C11.2998 3.57737 11.4987 3 11.4987 3C11.4987 3 11.4992 3.00126 11.5 3.00366C11.5008 3.00126 11.5013 3 11.5013 3C11.5013 3 11.7002 3.57737 11.7798 3.77137C13.1432 7.09082 14.887 9.52596 16.4174 11.6631C18.385 14.4108 20 16.666 20 19.6749C20 21.6176 19.1045 23.4807 17.5104 24.8545C15.9276 26.2185 13.7385 27 11.5 27Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_ddiiii_1249_24260"
            x="-2"
            y="-2"
            width="27"
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
              result="effect1_dropShadow_1249_24260"
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
              in2="effect1_dropShadow_1249_24260"
              result="effect2_dropShadow_1249_24260"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_1249_24260"
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
              result="effect3_innerShadow_1249_24260"
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
              in2="effect3_innerShadow_1249_24260"
              result="effect4_innerShadow_1249_24260"
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
              in2="effect4_innerShadow_1249_24260"
              result="effect5_innerShadow_1249_24260"
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
              in2="effect5_innerShadow_1249_24260"
              result="effect6_innerShadow_1249_24260"
            />
          </filter>
        </defs>
      </svg>
    );
  }

  return (
    <ProductBox boxStyle={boxStyle}>
      {children}
      <svg
        width="22"
        height="32"
        viewBox="0 0 22 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.7"
          d="M3.55382 28.7654L3.5538 28.7654C1.58991 27.0217 0.5 24.6703 0.5 22.2332C0.5 18.4038 2.4831 15.5249 5.04685 11.8362L5.05338 11.8268C6.98602 9.04625 9.20932 5.84757 10.9755 1.52781L10.9998 1.60143L11.0243 1.52726C12.7905 5.8473 15.0139 9.04614 16.9466 11.8268L16.9531 11.8361C19.5168 15.5249 21.5 18.4038 21.5 22.2332C21.5 24.6703 20.4101 27.0217 18.4462 28.7654C16.4949 30.498 13.7822 31.5 11 31.5C8.19741 31.5 5.51957 30.511 3.55382 28.7654Z"
          fill={type === 'positive' ? '#56CCF2' : undefined}
          stroke="white"
        />
      </svg>
    </ProductBox>
  );
};
