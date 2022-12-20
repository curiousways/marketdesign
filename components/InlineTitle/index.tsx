import { classNames } from '@/utils/index';

type Props = {
  title: string;
  background?: boolean;
  titleClass?: string;
};

export const InlineTitle = ({
  title,
  titleClass,
  background = false,
}: Props) => {
  return (
    <div className="relative">
      {background && (
        <svg
          width="753"
          height="317"
          viewBox="0 0 753 317"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-24 -left-6 -z-[1] max-w-[783px]"
        >
          <path
            d="M0 96.6406L64.5562 0L571.45 38.0493L753 228.063L636.473 317L33.0938 264.945L0 96.6406Z"
            fill="#FFFCEF"
          />
        </svg>
      )}
      <h2 className={classNames('heading-2', titleClass)}>{title}</h2>
    </div>
  );
};
