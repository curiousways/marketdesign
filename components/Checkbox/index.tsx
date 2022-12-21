import { FC, ReactNode } from 'react';
import { classNames } from '../../utils';

type CheckboxProps = {
  className?: string;
  required?: boolean;
  disabled?: boolean;
  name: string;
  onChange: () => void;
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
  <label htmlFor={name} className={classNames('flex select-none', className)}>
    <span>
      <input
        required={required}
        type="checkbox"
        name={name}
        disabled={disabled}
        onChange={onChange}
      />
    </span>
    <span className="ml-2">{children}</span>
  </label>
);
