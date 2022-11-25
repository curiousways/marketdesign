import { render, screen } from '@testing-library/react';
import { LoadingOverlay } from './index';

describe('LoadingOverlay', () => {
  it('renders the overlay with the given text', () => {
    render(<LoadingOverlay text="Loading stuff..." />);

    expect(screen.getByText('Loading stuff...')).toBeInTheDocument();
  });
});
