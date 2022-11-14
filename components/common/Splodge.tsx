import React, { FunctionComponent, ReactNode } from 'react';

const COLORS = {
  green: '#A3C995',
} as const;

type SplodgeProps = {
  children: ReactNode;
  color: keyof typeof COLORS;
  index: number;
};

const SPLODGES = [
  (
    <svg
      key="0"
      width="100%"
      viewBox="0 0 354 108"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6139 98.5222L79.4999 107.503H213L286.203 98.5222L323.073 93.7286L354 41.5415C354 41.5415 347.08 17.4299 346.5 15.5023C344.859 10.0252 328.646 -0.253789 327.326 0.00478749C326.005 0.263364 251.66 0.00478749 251.66 0.00478749L148.757 20.83L41.3556 0.00478749L-6.10352e-05 41.5415L16.6139 78.0025V98.5222Z"
        fill="currentColor"
      />
    </svg>
  ),
  (
    <svg
      key="1"
      width="100%"
      viewBox="0 0 378 101"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M52.5397 83.5129L95.7981 101L308.737 81.4339L378 34.3353C378 34.3353 377.796 20.093 377.203 18.4998C375.526 13.9726 352.098 -0.211342 350.749 0.00238954C349.4 0.216121 289.532 8.03409 289.532 8.03409L159.112 0.604718H78.7021L0 19.5685L1.69678 54.698L52.5397 83.5129Z"
        fill="currentColor"
      />
    </svg>
  ),
  (
    <svg
      key="2"
      width="100%"
      viewBox="0 0 329 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29 90.385L84.5 100L202.5 85.9872L268.716 90.385L301.5 85.9872L329 38.1091C329 38.1091 310.016 26.6087 309.5 24.8403C308.041 19.8155 306.456 -0.235138 305.281 0.00208752C304.107 0.239313 238 0.00208752 238 0.00208752L146 6.5L51 0.00208752L0 21.719L1.47683 60.7102L29 90.385Z"
        fill="currentColor"
      />
    </svg>
  ),
  (
    <svg
      key="3"
      width="100%"
      viewBox="0 0 329 101"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.729 97.5695L91.5 100.5H270L329 40.1146C329 40.1146 328.822 23.475 328.306 21.6136C326.847 16.3244 306.456 -0.246914 305.281 0.00279174C304.107 0.252497 251.901 16.5969 251.901 16.5969L138.486 0.706502L0 22.8622L1.47683 63.9046L45.729 97.5695Z"
        fill="currentColor"
      />
    </svg>
  ),
  (
    <svg
      key="4"
      width="100%"
      viewBox="0 0 380 116"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.4954 105.52L97.5988 116L233.891 100.726L310.371 105.52L348.237 100.726L380 48.539C380 48.539 358.073 36.0035 357.477 34.076C355.792 28.5989 353.961 6.7437 352.605 7.00228C351.248 7.26085 302 0 302 0L197 4.5L61 0L0 30.6738L1.70576 73.1742L33.4954 105.52Z"
        fill="currentColor"
      />
    </svg>
  ),
  (
    <svg
      key="5"
      width="100%"
      viewBox="0 0 329 111"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29 100.16L84.5 110.71H140.5L268.716 100.16L301.5 95.3346L329 42.8024C329 42.8024 310.016 30.184 309.5 28.2437C308.041 22.7304 306.456 0.730652 305.281 0.990938C304.107 1.25122 238 0.990938 238 0.990938H155.5H51L0 24.819L18 61.7898L29 100.16Z"
        fill="currentColor"
      />
    </svg>
  ),
]

export const Splodge: FunctionComponent<SplodgeProps> = ({
  children,
  color,
  index,
}) => {
  const splodgeIndex = index % SPLODGES.length;

  return (
    <div className="relative flex flex-col justify-center">
      <div style={{ color: COLORS[color] }}>
        {SPLODGES[splodgeIndex]}
      </div>
      <div className="absolute text-center left-0 mx-auto right-0 pt-1.5">
        {children}
      </div>
    </div>
  );
};
