import React, { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react';
import { classNames } from '@/utils/index';

type CostInputProps = {
  cost: number | number[];
  name: string;
  animate?: boolean;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  value?: number;
  validate?: boolean;
};

export const CostInput: FC<CostInputProps> = ({
  cost,
  name,
  animate,
  onInputChange,
  onSelectChange,
  disabled,
  value,
  validate,
}: CostInputProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputClassNames = classNames(
    'w-full text-sm inline-block rounded-lg py-2 px-3 bg-extra-light-grey',
    animate ? 'animate-scale' : '',
  );

  const validateInput = useCallback(
    (element: HTMLInputElement) => {
      if (!validate || !value) {
        return;
      }

      const msg =
        Number(element.value) === value
          ? ''
          : `Please enter a value of ${value} to proceed`;

      element.setCustomValidity(msg);
    },
    [validate, value],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    validateInput(event.target);
    onInputChange(event);
  };

  useEffect(() => {
    if (inputRef.current) {
      validateInput(inputRef.current);
    }
  }, [validateInput]);

  if (Array.isArray(cost)) {
    return (
      <select
        required
        ref={selectRef}
        className={inputClassNames}
        name={name}
        onChange={onSelectChange}
        disabled={disabled}
        value={value}
      >
        <option />
        {cost.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      ref={inputRef}
      onChange={handleInputChange}
      disabled={disabled}
      type="text"
      placeholder="Enter offer..."
      className={inputClassNames}
      name={name}
    />
  );
};
