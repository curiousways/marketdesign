import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './index';

describe('Pagination', () => {
  it('renders the title and subtitle', () => {
    render(<Pagination title="My title" subtitle="My subtitle" />);

    expect(screen.getByText('My title')).toBeInTheDocument();
    expect(screen.getByText('My subtitle')).toBeInTheDocument();
  });

  it('hides the next and previous buttons by default', () => {
    render(<Pagination title="My title" />);

    const prevButton = screen.getByLabelText('Previous');
    const nextButton = screen.getByLabelText('Next');

    expect(prevButton).toHaveClass('invisible');
    expect(nextButton).toHaveClass('invisible');
  });

  it('shows the previous button and calls the callback on click', () => {
    const onPreviousClick = jest.fn();

    render(
      <Pagination
        title="My title"
        hasPreviousPage
        onPreviousClick={onPreviousClick}
      />,
    );

    const prevButton = screen.getByLabelText('Previous');

    fireEvent.click(prevButton);

    expect(prevButton).not.toHaveClass('invisible');
    expect(onPreviousClick).toHaveBeenCalledTimes(1);
  });

  it('shows the next button and calls the callback on click', () => {
    const onNextClick = jest.fn();

    render(
      <Pagination title="My title" hasNextPage onNextClick={onNextClick} />,
    );

    const prevButton = screen.getByLabelText('Next');

    fireEvent.click(prevButton);

    expect(prevButton).not.toHaveClass('invisible');
    expect(onNextClick).toHaveBeenCalledTimes(1);
  });
});
