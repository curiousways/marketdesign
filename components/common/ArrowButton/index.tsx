import React, { FC } from 'react';
import { classNames } from '@/utils/index';

type ArrowButtonProps = {
  onClick: () => void;
  hide?: boolean;
  className?: string;
  rotate?: boolean;
  ariaLabel?: string;
};

export const ArrowButton: FC<ArrowButtonProps> = ({
  onClick,
  hide,
  className,
  rotate,
  ariaLabel,
}: ArrowButtonProps) => (
  <button
    type="button"
    aria-label={ariaLabel}
    className={classNames(
      'w-10 h-10 bg-green-dark rounded-full flex justify-center items-center hover:bg-green-extra-dark cursor-pointer',
      hide ? 'invisible' : '',
      className,
    )}
    onClick={onClick}
  >
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 394.941 394.941"
      xmlSpace="preserve"
      className={classNames('w-6 h-6', rotate ? 'mr-1 rotate-180' : 'ml-1')}
    >
      <g>
        <path
          style={{ fill: '#ffffff' }}
          d="M185.492,211.636v109.588l209.449-123.747L185.492,73.718v109.611L0,73.718v247.506L185.492,211.636z"
        />
      </g>
    </svg>
  </button>
);
