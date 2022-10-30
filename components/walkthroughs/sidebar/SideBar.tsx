import React, { Dispatch, SetStateAction } from "react";

import { Data } from "@/types/index";

import Navigation from "./Navigation";
import Details from "./Details";

type Props = {
  walkthrough: number;
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  setWalkthrough: Dispatch<SetStateAction<number>>;
  data: Data | undefined;
  html: string;
};

const SideBar = ({
  walkthrough,
  stage,
  setStage,
  setWalkthrough,
  data,
  html,
}: Props) => {
  const maxStage = data?.options?.stages;

  const previous = () => {
    if (stage > 1) setStage((prev) => prev - 1);
  };

  const next = () => {
    if (stage < maxStage) setStage((prev) => prev + 1);
  };

  const nextWalkthrough = () => {
    setWalkthrough(data?.options?.next_walkthrough);
  };

  const onButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <div className="max-w-[434px] pt-12">
      {/* Top */}
      <Details onButtonClick={onButtonClick} data={data} stage={stage} />

      {/* Bottom */}
      <Navigation
        html={html}
        walkthrough={walkthrough}
        stage={stage}
        data={data}
        nextStage={next}
        prevStage={previous}
        nextWalkthrough={nextWalkthrough}
      />
    </div>
  );
};

export default SideBar;
