import React, { useState, useEffect } from "react";
import { motion, usePresence } from "framer-motion";

import { WalkthroughData } from "@/types/walkthrough";
import { fadeIn } from "@/utils/animations";

import SellerVector from "@/components/walkthroughs/icons/SellerVector";
import BuyerVector from "@/components/walkthroughs/icons/BuyerVector";
import BiodiversityIconGray from "@/components/walkthroughs/icons/BiodiversityIcon";
import NutrientsIcon from "@/components/walkthroughs/icons/NutrientsIcon";

type Props = {
  next: () => void;
  stage: number;
  data: WalkthroughData;
};

const Details = ({ data, stage, next }: Props) => {
  const [price, setPrice] = useState("");

  // User role either buyer or seller
  const role = data.options.role;

  // Project cost
  const projectCost = data.project_cost;

  // User input price
  const myPrice: string =
    role === "seller"
      ? data.sellers.find((seller) => seller.id === 1)?.offer!
      : data.buyers.find((buyer) => buyer.id === 1)?.bid!;

  // Proceed to next stage when submit button is clicked
  const onButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  useEffect(() => {
    if (stage >= data.options.set_my_price) {
      setPrice(`£${myPrice}`);
    }
  }, [stage, data.options]);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
      layout
      // onAnimationComplete={() => !isPresent && safeToRemove()}
      className="border-2 border-black px-5 py-4 rounded-lg w-full"
    >
      <div className="text-black text-xl">
        <p className="font-bold">My Project</p>
        <p>{role === "seller" ? "Landholder" : "Developer"}</p>
      </div>

      <div className="mt-3 flex justify-between">
        {/* Vector */}
        <>{role === "seller" ? <SellerVector /> : <BuyerVector />}</>

        {/* Credits */}
        <div className="flex gap-x-2 mt-2">
          {/* Biodiversity */}
          <div className="relative">
            <span className="absolute -right-1 top-0 text-[10px] text-black font-bold border border-black rounded-full bg-white w-[14px] h-[14px] flex justify-center items-center">
              2
            </span>
            <BiodiversityIconGray />
          </div>
          {/* Nutrients */}
          <div className="relative">
            <span className="absolute -right-1 top-0 text-[10px] text-black font-bold border border-black rounded-full bg-white w-[14px] h-[14px] flex justify-center items-center">
              2
            </span>
            <NutrientsIcon />
          </div>
        </div>

        {/* Project Cost */}
        <p className="font-light mt-2">£{projectCost}</p>

        {/* Form */}
        <form
          className="space-y-4 flex flex-col items-end mt-1"
          onSubmit={onButtonClick}
        >
          <input
            type="text"
            placeholder="Enter offer..."
            className="w-[116px] text-sm text-center inline-block rounded-lg py-2 bg-[#e8e8e8]"
            value={price}
          />
          <div className="relative w-[71px]">
            {stage === data.options.allow_button_click && (
              <span className="flex h-3 w-3 absolute right-0 -top-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            )}
            <button
              type="submit"
              disabled={stage !== data.options.allow_button_click}
              className="w-full rounded-lg bg-[#848484] hover:bg-black cursor-pointer text-white text-xs py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Details;
