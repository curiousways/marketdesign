import React, { ChangeEvent, FunctionComponent } from "react";
import { WalkthroughMarketState, WalkthroughProject } from "@/types/walkthrough";
import { useWalkthroughContext } from "@/context/WalkthroughContext";
import { classNames } from "@/utils/index";
import { useEffect } from "react";
import { useRef } from "react";

type Props = {
  project: WalkthroughProject;
  name: string;
  animate: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Input: FunctionComponent<Props> = ({
  project,
  name,
  animate,
  onChange,
}: Props) => {
  const { marketState, setProjectCost, getProjectCost } = useWalkthroughContext();
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const value = getProjectCost(project);
  const inputClassNames = classNames(
    'w-full text-sm inline-block rounded-lg py-2 px-3 bg-extra-light-grey',
    animate ? 'animate-scale-small' : '',
  );

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProjectCost(project, Number(event.target.value));
    onChange(event);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const msg = Number(event.target.value) === value
      ? ''
      : `Please enter a value of ${value} to proceed`;

    target.setCustomValidity(msg);
    onChange(event);
  };

  useEffect(() => {
    if (!animate) {
      return;
    }

    if (selectRef.current) {
      selectRef.current.focus();
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [animate]);

  if (Array.isArray(project.cost)) {
    return (
      <select
        required
        ref={selectRef}
        className={inputClassNames}
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
      ref={inputRef}
      onChange={onInputChange}
      disabled={marketState >= WalkthroughMarketState.solvable}
      type="text"
      placeholder="Enter offer..."
      className={inputClassNames}
      name={name}
    />
  );
};

export default Input;
