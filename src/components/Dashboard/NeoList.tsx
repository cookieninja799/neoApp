import React from 'react';

interface NEO {
  id: string;
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }>;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
}

interface NEOListProps {
  neos: NEO[];
}

const NEOList: React.FC<NEOListProps> = ({ neos }) => {
  if (neos.length === 0) {
    return <div className="neo-list-container my-4 p-4 bg-gray-100 rounded-lg shadow">No Near Earth Objects for today.</div>;
  }

  return (
    <div className="neo-list-container my-4 p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="text-lg font-bold text-center mb-3">Today's Near Earth Objects</h3>
      <ul>
        {neos.map((neo) => (
          <li key={neo.id} className={`p-3 my-2 rounded-lg ${neo.is_potentially_hazardous_asteroid ? 'bg-red-200' : 'bg-green-200'}`}>
            <h4 className="font-bold">{neo.name}</h4>
            <p>Diameter: {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(2)}m - {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}m</p>
            <p>Velocity: {parseFloat(neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour).toLocaleString() || 'N/A'} km/h</p>
            <p>Miss Distance: {parseFloat(neo.close_approach_data[0]?.miss_distance.kilometers).toLocaleString() || 'N/A'} km</p>
            <p>{neo.is_potentially_hazardous_asteroid ? 'Potentially Hazardous' : 'Not Hazardous'}</p>
            <a href={neo.nasa_jpl_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Learn More</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NEOList;
