import { fireEvent, render, screen } from '@testing-library/react';
import { OutlineButton } from './index';

describe('OutlineButton', () => {
  it('calls the callback on click', () => {
    const onClick = jest.fn();
    render(<OutlineButton onClick={onClick}>Click me</OutlineButton>);

    fireEvent.click(screen.getByText('Click me'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
