import React from 'react';

interface NEO {
  id: string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    miss_distance: {
      kilometers: string;
    };
  }>;
  estimated_diameter?: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
}

interface SummaryProps {
  neos: NEO[];
}

const Summary: React.FC<SummaryProps> = ({ neos }) => {
  const totalNeos = neos.length;

  const hazardousNeos = neos.filter(neo => neo.is_potentially_hazardous_asteroid).length;

  const closestNeo = neos.reduce((closest, currentNeo) => {
    if (!currentNeo.close_approach_data[0] || !closest?.close_approach_data[0]) return closest;
    const currentDistance = parseFloat(currentNeo.close_approach_data[0].miss_distance.kilometers);
    const closestDistance = parseFloat(closest.close_approach_data[0].miss_distance.kilometers);
    return currentDistance < closestDistance ? currentNeo : closest;
  }, neos[0] || null);

  const closestNeoDistance = closestNeo
    ? `${parseFloat(closestNeo.close_approach_data[0]?.miss_distance.kilometers).toLocaleString()} km`
    : 'N/A';

  return (
    <div className="summary-container p-4 my-4 bg-gray-200 rounded-lg shadow">
      <h2 className="text-lg font-bold text-center mb-2">Daily NEO Summary</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <span className="block font-semibold">{totalNeos}</span>
          <span className="text-sm">Total NEOs</span>
        </div>
        <div>
          <span className="block font-semibold">{hazardousNeos}</span>
          <span className="text-sm">Potentially Hazardous</span>
        </div>
        <div>
          <span className="block font-semibold">{closestNeoDistance}</span>
          <span className="text-sm">Closest Approach</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
