jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock(
  'next/link',
  () => (props) => jest.requireActual('react').createElement('a', props),
);
