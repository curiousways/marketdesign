import { Bidder } from '@/types/demo';

import Project from './Project';
import ProjectLost from './ProjectLost';

type Props = {
  participants: Bidder[] | undefined;
  type?: 'winners' | 'losers';
};

const ParticipantsList = ({ participants, type = 'winners' }: Props) => {
  return (
    <>
      {type === 'winners' && (
        <>
          {/* Sellers */}
          <div className="space-y-5">
            {participants?.map((participant) => (
              <Project
                title={participant.name}
                projectRoleId={
                  Number(participant.bids[0]?.v) < 0 ? 'seller' : 'buyer'
                }
                bids={participant.bids}
                key={participant.name}
              />
            ))}
          </div>
        </>
      )}

      {type === 'losers' && (
        <div className="space-y-2">
          {/* Sellers */}
          <div className="space-y-2">
            {participants?.map((participant) => (
              <ProjectLost
                key={participant.name}
                title={participant.name}
                projectRoleId={
                  Number(participant.bids[0]?.v) < 0 ? 'seller' : 'buyer'
                }
                bids={participant.bids}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ParticipantsList;
