import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DescriptionBox } from './index';

describe('Pagination', () => {
  it('renders the content visibly', async () => {
    render(<DescriptionBox>Hello</DescriptionBox>);

    expect(screen.getByText('Hello')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByTestId('description-box')).toHaveStyle({ opacity: 1 }),
    );
  });

  it('is hidden if there is no content', () => {
    render(<DescriptionBox />);

    expect(screen.getByTestId('description-box')).toHaveStyle({ opacity: 0 });
  });
});
