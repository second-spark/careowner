import { TeamTab } from './TeamTab';
import { Practice } from '../types/practice';

interface TeamProps {
  practice: Practice;
}

export function Team({ practice }: TeamProps) {
  return (
    <div>
      <h1 className="mb-6 text-[20px] font-semibold">Team</h1>
      <TeamTab practice={practice} />
    </div>
  );
}
