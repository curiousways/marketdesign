import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  WalkthroughMarketState,
  WalkthroughProject,
} from '@/types/walkthrough';
import { useWalkthroughContext } from '@/context/WalkthroughContext';
import { classNames } from '@/utils/index';

type Props = {
  project: WalkthroughProject;
  name: string;
  animate: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const Input: FunctionComponent<Props> = ({
  project,
  name,
  animate,
  onChange,
}: Props) => {
  const { marketState, setProjectCost, getProjectCost } =
    useWalkthroughContext();
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const value = project.costPerCredit
    ? project.costPerCredit
    : getProjectCost(project);

  const inputClassNames = classNames(
    'w-full text-sm inline-block rounded-lg py-2 px-3 bg-extra-light-grey',
    animate ? 'animate-scale-small' : '',
  );

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProjectCost(project, Number(event.target.value));
    onChange(event);
  };

  const validateInput = useCallback(
    (element: HTMLInputElement) => {
      const msg =
        Number(element.value) === value
          ? ''
          : `Please enter a value of ${value} to proceed`;

      element.setCustomValidity(msg);
    },
    [value],
  );

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    validateInput(event.target);
    onChange(event);
  };

  useEffect(() => {
    if (inputRef.current) {
      validateInput(inputRef.current);
    }

    if (!animate) {
      return;
    }

    if (selectRef.current) {
      selectRef.current.focus();
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [animate, validateInput]);

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
          <option key={cost} value={cost}>
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
