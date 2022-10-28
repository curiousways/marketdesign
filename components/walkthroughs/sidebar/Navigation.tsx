import NextButton from "./NextButton";
import PrevButton from "./PrevButton";

import { Data } from "@/types/types";

type Props = {
  walkthrough: number;
  stage: number;
  data: Data | undefined;
  nextStage: () => void;
  prevStage: () => void;
  nextWalkthrough: () => void;
  html: string;
};

const Navigation = ({
  walkthrough,
  stage,
  data,
  nextStage,
  prevStage,
  nextWalkthrough,
  html,
}: Props) => {
  const maxStage = data?.options?.stages;

  return (
    <div className="border-4 border-[#707070] rounded-t-lg mt-8 p-3 relative z-20">
      <div>
        {/* Top Nav */}
        <div className="bg-[#707070] rounded-t-lg py-4 px-6 text-white flex items-center">
          {/* Rewind button */}
          {!data?.options?.hide_prev_button.includes(stage) && (
            <PrevButton onClick={prevStage} />
          )}

          <div className="max-w-[231px] mx-auto text-center">
            <p>WALKTHROUGH {walkthrough}</p>
            <p className="font-light">"{data?.title}"</p>
          </div>

          {/* Fast Foward button */}
          {!data?.options.hide_next_button.includes(stage) && (
            <NextButton onClick={nextStage} />
          )}
        </div>

        {/* The content of this div changes */}
        <div className="bg-[#D9D9D9] text-black p-8 min-h-[471px] flex flex-col justify-center items-center">
          <div
            className="space-y-5"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </div>

        {/* Bottom Nav */}
        {stage === maxStage && (
          <div className="bg-[#707070] rounded-b-lg py-4 px-6 text-white flex items-center">
            <div className="max-w-[231px] mx-auto text-center">
              <p>WALKTHROUGH {data?.options?.next_walkthrough}</p>
              <p className="font-light">
                "{data?.options?.next_walkthrough_title}"
              </p>
            </div>

            {/* Fast Foward button */}
            <NextButton onClick={nextWalkthrough} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
