import React, { ChangeEvent, FunctionComponent } from 'react';
import {
  WalkthroughMarketState,
  WalkthroughProject,
} from '@/types/walkthrough';
import { useWalkthroughContext } from '@/context/WalkthroughContext';

type Props = {
  project: WalkthroughProject;
  populate: boolean;
  name: string;
};

const Input: FunctionComponent<Props> = ({
  project,
  populate,
  name,
}: Props) => {
  const { marketState, setProjectCost, getProjectCost } =
    useWalkthroughContext();

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProjectCost(project, Number(event.target.value));
  };

  if (Array.isArray(project.cost)) {
    return (
      <select
        required
        className="w-full text-sm inline-block rounded-lg py-2 px-3 bg-extra-light-grey"
        name={name}
        onChange={onSelectChange}
        disabled={marketState > WalkthroughMarketState.solvable}
        value={getProjectCost(project)}
      >
        <option />
        {project.cost.map((cost) => (
          <option key={cost} value={cost}>
            {cost}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      required
      disabled
      type="text"
      placeholder="Enter offer..."
      className="w-full text-sm inline-block rounded-lg py-2 px-3 bg-extra-light-grey"
      name={name}
      defaultValue={populate ? project.costPerCredit ?? project.cost : ''}
    />
  );
};

export default Input;
