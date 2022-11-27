jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock(
  'next/link',
  () => (props) => jest.requireActual('react').createElement('a', props),
);

// Mock getBBox()
// https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox
Object.defineProperty(global.SVGElement.prototype, 'getBBox', {
  writable: true,
  value: jest.fn().mockReturnValue({
    x: 0,
    y: 0,
  }),
});
