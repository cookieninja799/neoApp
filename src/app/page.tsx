import React from 'react';
import Layout from './layout';
import Summary from '../components/Dashboard/Summary';
import NeoList from '../components/Dashboard/NeoList';
import Filters from '../components/Dashboard/Filters';
import OrbitalVisualization from '../components/OrbitalPath/OrbitalVisualization';

// Dummy data simulating the API response
const dummyNeos = [
{
  id: "2481025",
  name: "481025 (2004 VA1)",
  nasa_jpl_url: "https://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2481025",
  is_potentially_hazardous_asteroid: false,
  close_approach_data: [{
    miss_distance: {
      kilometers: "52437899.014448976",
    },
    relative_velocity: {
      kilometers_per_hour: "44436.407877569",
    },
  }],
  estimated_diameter: {
    meters: {
      estimated_diameter_min: 97.0402621378,
      estimated_diameter_max: 230.5954204445,
    }
  }
},
{
  id: "3358522",
  name: "(2006 VG13)",
  nasa_jpl_url: "https://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3358522",
  is_potentially_hazardous_asteroid: true,
  close_approach_data: [{
    miss_distance: {
      kilometers: "76031339.791236659",
    },
    relative_velocity: {
      kilometers_per_hour: "55939.0531393145",
    },
  }],
  estimated_diameter: {
    meters: {
      estimated_diameter_min: 135.6922289935,
      estimated_diameter_max: 303.4170480479,
    }
  }
},
{
  id: "3726710",
  name: "(2015 RC)",
  nasa_jpl_url: "https://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3726710",
  is_potentially_hazardous_asteroid: false,
  close_approach_data: [{
    miss_distance: {
      kilometers: "42000000",
    },
    relative_velocity: {
      kilometers_per_hour: "50000",
    },
  }],
  estimated_diameter: {
    meters: {
      estimated_diameter_min: 50,
      estimated_diameter_max: 150,
    }
  }
},
{
  id: "3774734",
  name: "(2017 FU102)",
  nasa_jpl_url: "https://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3774734",
  is_potentially_hazardous_asteroid: true,
  close_approach_data: [{
    miss_distance: {
      kilometers: "33000000",
    },
    relative_velocity: {
      kilometers_per_hour: "48000",
    },
  }],
  estimated_diameter: {
    meters: {
      estimated_diameter_min: 40,
      estimated_diameter_max: 90,
    }
  }
}
// Add more NEOs as needed...
];

export default function Page() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center">
        <Summary neos={dummyNeos}/>
        <Filters />
        <NeoList neos={dummyNeos}/>
        <OrbitalVisualization />
      </main>
    </Layout>
  );
}
