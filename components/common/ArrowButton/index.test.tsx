import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ArrowButton } from './index';

describe('ArrowButton', () => {
  it('calls the callback when the button is clicked', () => {
    const onClick = jest.fn();

    render(<ArrowButton onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not make the button invisible by default', () => {
    render(<ArrowButton onClick={jest.fn()} />);

    expect(screen.getByRole('button')).not.toHaveClass('invisible');
  });

  it('makes the button invisible if the hide prop is given', () => {
    render(<ArrowButton hide onClick={jest.fn()} />);

    expect(screen.getByRole('button')).toHaveClass('invisible');
  });
});
