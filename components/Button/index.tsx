import Link from 'next/link';
import { FC } from 'react';

type ButtonProps = {
  link: string;
  text: string;
};

export const Button: FC<ButtonProps> = ({ link, text }: ButtonProps) => {
  return (
    <Link
      href={link}
      className="border border-red text-red text-lg font-medium inline-flex items-center gap-x-2 py-1 px-2"
    >
      <span>{text}</span>

      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z"
          className="fill-current"
        />
      </svg>
    </Link>
  );
};
