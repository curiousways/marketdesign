import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

import { Data } from "@/types/index";

import Avatar from "./Avatar";
import { classNames } from "@/utils/index";

type Props = {
  onButtonClick: (e: React.FormEvent) => void;
  stage: number;
  data: Data | undefined;
};

const Details = ({ data, stage, onButtonClick }: Props) => {
  const [price, setPrice] = useState("");

  const myPrice: string = data?.sellers.find(
    (seller) => seller.title === "My Project"
  )?.offer!;

  useEffect(() => {
    if (stage >= data?.options?.set_my_price) {
      setPrice(myPrice);
    }
  }, [stage, data?.options]);

  const projectCost = data?.project_cost;

  return (
    <div className="bg-gray-200 max-w-[256px] rounded-lg mx-auto relative z-20 shadow-lg">
      {/* Avatar */}
      <div className="shadow-xl h-[90px] w-[90px] mx-auto flex justify-center items-center rounded-full border-2 border-green-dark bg-white relative bottom-10">
        <Avatar />
      </div>

      <div className="px-5 pb-5 space-y-4 text-black">
        <p className="max-w-[108px] text-xl leading-5">
          <span className="text-black font-bold">My Project</span> <span className="text-gray-500">landowner</span>
        </p>
        {/* Credits */}
        <div className="flex gap-x-2 items-center">
          <p className="font-light">Credits:</p>
          {/* Biodiversity */}
          <div className="relative">
            <span className="absolute -right-1 top-0 text-[10px] text-black border border-black rounded-full bg-white w-[14px] h-[14px] flex justify-center items-center">
              2
            </span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M8.81169 7.68831C8.81169 3.71831 12.03 0.5 16 0.5C19.97 0.5 23.1884 3.71832 23.1884 7.68831C23.1884 8.30864 23.6912 8.81169 24.3116 8.81169C28.2817 8.81169 31.5 12.03 31.5 16C31.5 19.97 28.2817 23.1884 24.3116 23.1884C23.6913 23.1884 23.1884 23.6913 23.1884 24.3116C23.1884 28.2817 19.97 31.5 16 31.5C12.03 31.5 8.81169 28.2817 8.81169 24.3116C8.81169 23.6912 8.30864 23.1884 7.68831 23.1884C3.71832 23.1884 0.5 19.97 0.5 16C0.5 12.03 3.71831 8.81169 7.68831 8.81169C8.30873 8.81169 8.81169 8.30873 8.81169 7.68831Z"
                fill="#6FCF97"
                stroke="white"
              />
            </svg>
          </div>
          {/* Nutrients */}
          <div className="relative">
            <span className="absolute -right-1 top-0 text-[10px] text-black border border-black rounded-full bg-white w-[14px] h-[14px] flex justify-center items-center">
              2
            </span>
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
                fill="#56CCF2"
                stroke="white"
              />
            </svg>
          </div>
        </div>
        <p className="font-light">Project Cost: £{projectCost}</p>

        <form
          className="space-y-4 flex flex-col items-end"
          onSubmit={onButtonClick}
        >
          <input
            type="text"
            placeholder="Enter offer..."
            className="inline-block w-full rounded-md px-2 py-2"
            value={price}
          />
          <button
            type="submit"
            disabled={stage !== data?.options.allow_button_click}
            className={classNames(
              "w-[80px] rounded-md bg-[#848484] hover:bg-black cursor-pointer text-white py-2 px-1",
              stage === data?.options.allow_button_click
                ? "bg-black animate-pulse"
                : ""
            )}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
