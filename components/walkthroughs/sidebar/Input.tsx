import React, { ChangeEvent, FunctionComponent } from "react";
import { WalkthroughMarketState, WalkthroughProject } from "@/types/walkthrough";
import { useWalkthroughContext } from "@/context/WalkthroughContext";

type Props = {
  project: WalkthroughProject;
  name: string;
}

const Input: FunctionComponent<Props> = ({
  project,
  name
}: Props) => {
  const { marketState, setProjectCost, getProjectCost } = useWalkthroughContext();
  const value = getProjectCost(project);

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProjectCost(project, Number(event.target.value));
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    if (Number(event.target.value) === value) {
      target.setCustomValidity('');

      return;
    }

    target.setCustomValidity(`Please enter a value of ${value} to proceed`);
  };

  if (Array.isArray(project.cost)) {
    return (
      <select
        required
        className="w-full text-sm inline-block rounded-lg py-2 px-3 bg-extra-light-grey"
        name={name}
        onChange={onSelectChange}
        disabled={marketState >= WalkthroughMarketState.solvable}
        value={value}
      >
        <option />
        {project.cost.map((cost) => (
          <option
            key={cost}
            value={cost}
          >
            {cost}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      onChange={onInputChange}
      disabled={marketState >= WalkthroughMarketState.solvable}
      type="text"
      placeholder="Enter offer..."
      className="w-full text-sm inline-block rounded-lg py-2 px-3 bg-extra-light-grey"
      name={name}
    />
  );
};

export default Input;
