"use client"
import React, { useState, useEffect } from 'react';
import Summary from './Summary';
import NeoList from './NeoList';

// Define the structure of the NEO object based on your provided data
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

// Define the structure of the API response
interface ApiResponse {
  links: Record<string, string>;
  element_count: number;
  near_earth_objects: Record<string, NEO[]>;
}

export default function Dashboard() {
  const [neos, setNeos] = useState<NEO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.NASA_API_KEY;
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ApiResponse = await response.json();
        // Assuming the API returns the near_earth_objects structured by date
        const todayNeos = Object.values(data.near_earth_objects).flat();
        setNeos(todayNeos);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Summary neos={neos} />
      <NeoList neos={neos} />
    </div>
  );
}
