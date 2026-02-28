import { BuildingTab } from './BuildingTab';
import { Practice } from '../types/practice';

interface FacilitiesProps {
  practice: Practice;
}

export function Facilities({ practice }: FacilitiesProps) {
  return (
    <div>
      <h1 className="mb-6 text-[20px] font-semibold">Facilities</h1>
      <BuildingTab practice={practice} />
    </div>
  );
}
