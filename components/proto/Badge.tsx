type Props = {
  winning?: number;
};

const Badge = ({ winning }: Props) => {
  return (
    <>
      {winning === 1 && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          won
        </span>
      )}

      {winning === 0 && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Lost
        </span>
      )}

      {winning === undefined && null}
    </>
  );
};

export default Badge;
