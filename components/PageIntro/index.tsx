type Props = {
  intro: string;
  summary: string;
};

export const PageIntro = ({ intro, summary }: Props) => {
  return (
    <div className="xl:max-w-[1130px] pl-20 2xl:pl-40 space-y-5 relative">
      <p className="text-green-dark text-4xl">{intro}</p>
      <p>{summary}</p>
    </div>
  );
};
