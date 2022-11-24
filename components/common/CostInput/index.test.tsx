import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { CostInput } from './index';

describe('CostInput', () => {
  it('renders a regular input if a single cost is given', async () => {
    render(
      <CostInput
        name="my-input"
        cost={42}
        onInputChange={jest.fn()}
        onSelectChange={jest.fn()}
      />,
    );

    const textInput = screen.getByRole('textbox');

    expect(textInput).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('calls the input callback', async () => {
    const onInputChange = jest.fn();

    render(
      <CostInput
        name="my-input"
        cost={42}
        onInputChange={onInputChange}
        onSelectChange={jest.fn()}
      />,
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'x' } });

    expect(onInputChange).toHaveBeenCalledTimes(1);
  });

  it('validates the input', async () => {
    render(
      <CostInput
        validate
        name="my-input"
        cost={42}
        value={42}
        onInputChange={jest.fn()}
        onSelectChange={jest.fn()}
      />,
    );

    const textInput = screen.getByRole('textbox');

    fireEvent.change(textInput, { target: { value: 'x' } });

    expect(textInput).not.toBeValid();

    fireEvent.change(textInput, { target: { value: '42' } });

    expect(textInput).toBeValid();
  });

  it('renders a select input if multiple costs are given', async () => {
    render(
      <CostInput
        name="my-input"
        cost={[42, 43]}
        onInputChange={jest.fn()}
        onSelectChange={jest.fn()}
      />,
    );

    const selectInput = screen.getByRole('combobox');

    expect(selectInput).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    const options = within(selectInput).getAllByRole('option');

    expect(options).toHaveLength(3);
    expect(options[0]).toHaveValue('');
    expect(options[0].textContent).toBe('');
    expect(options[1]).toHaveValue('42');
    expect(options[1].textContent).toBe('42');
    expect(options[2]).toHaveValue('43');
    expect(options[2].textContent).toBe('43');
  });

  it('calls the select input callback', async () => {
    const onSelectChange = jest.fn();

    render(
      <CostInput
        name="my-input"
        cost={[42, 43]}
        onInputChange={jest.fn()}
        onSelectChange={onSelectChange}
      />,
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '43' } });

    expect(onSelectChange).toHaveBeenCalledTimes(1);
  });
});
