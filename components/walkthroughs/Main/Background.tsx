import { WalkthroughBackgroundRight } from '../icons/WalkthroughBackground';
import { WalkthroughBackgroundLeft } from '../icons/WalkthroughBackgroundLeft';

const Background = () => (
  <div className="absolute right-0 left-0 bottom-0">
    <div className="absolute left-0 bottom-0">
      <WalkthroughBackgroundLeft />
    </div>
    <div className="absolute right-0 bottom-0">
      <WalkthroughBackgroundRight />
    </div>
  </div>
);

export default Background;
