import { Biodiversity } from '../../../../../../components/Biodiversity';
import { Nutrients } from '../../../../../../components/Nutrients';

export const sidebarContent2 = (
  <>
    <p>
      The credits delivered by a landholder project depend on its location and
      the change in natural habitat being proposed.
    </p>
    <p>Here we imagine those credits are of two types;</p>
    <ul>
      <li className="flex items-center mb-3">
        <Nutrients type="positive" size={25} />
        <span className="ml-2">Water quality improvements</span>
      </li>
      <li className="flex items-center">
        <Biodiversity type="positive" size={25} />
        <span className="ml-2">Biodiversity improvements</span>
      </li>
    </ul>
  </>
);
