import { ChangeEvent, FC, ReactNode } from 'react';
import { classNames } from '../../utils';

type CheckboxProps = {
  className?: string;
  required?: boolean;
  disabled?: boolean;
  name: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
};

export const Checkbox: FC<CheckboxProps> = ({
  className,
  required,
  disabled,
  name,
  onChange,
  children,
}: CheckboxProps) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label
    className={classNames(
      'flex select-none',
      !disabled ? 'cursor-pointer' : '',
      className,
    )}
  >
    <span>
      <input
        required={required}
        type="checkbox"
        name={name}
        disabled={disabled}
        onChange={onChange}
        className={!disabled ? 'cursor-pointer' : ''}
      />
    </span>
    <span className={classNames('ml-2', disabled ? 'opacity-50' : '')}>
      {children}
    </span>
  </label>
);
