'use client'
import React, { useEffect, useRef, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import * as satellite from 'satellite.js';
import * as THREE from 'three';

// Utility function to convert radians to degrees
const radiansToDegrees = (radians: number): number => radians * 180 / Math.PI;

interface Satellite {
  name: string;
  satrec: satellite.SatRec;
  lat: number;
  lng: number;
  alt: number;
}

const EARTH_RADIUS_KM = 6371; // Earth's radius in kilometers
const SAT_SIZE = 80; // Satellite size relative scale
const TIME_STEP = 3 * 1000; // Time step for updating positions

const MyGlobe: React.FC = () => {
  const globeEl = useRef<any>(null);
  const [satData, setSatData] = useState<Satellite[]>([]);
  const [time, setTime] = useState<Date>(new Date());

  // Fetch and process satellite data
  useEffect(() => {
    fetch('//unpkg.com/globe.gl/example/datasets/space-track-leo.txt')
      .then(response => response.text())
      .then(rawData => {
        const tleData = rawData.replace(/\r/g, '').split(/\n(?=[^12])/).filter(Boolean).map(tle => tle.split('\n'));
        const processedSatData: Satellite[] = tleData.map(([name, line1, line2]) => {
          const satrec = satellite.twoline2satrec(line1, line2);
          return { satrec, name: name.trim().replace(/^0 /, ''), lat: 0, lng: 0, alt: 0 }; // Initialize lat, lng, and alt
        }).filter(d => satellite.propagate(d.satrec, new Date()).position !== undefined);
        setSatData(processedSatData);
      });
  }, []);

  // Time ticker for updating satellite positions
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date(time.getTime() + TIME_STEP));
    }, TIME_STEP);
    return () => clearInterval(intervalId);
  }, [time]);

  // Update satellite positions based on time
  const objectsData = useMemo(() => satData.map((sat): Satellite | null => {
    // Attempt to propagate satellite position and velocity
    const propagationResult = satellite.propagate(sat.satrec, time);
  
    // Check if the propagation was successful and the position is available
    if (propagationResult && 'position' in propagationResult && propagationResult.position && typeof propagationResult.position !== 'boolean') {
      const gmst = satellite.gstime(time);
      const positionGd = satellite.eciToGeodetic(propagationResult.position, gmst);
  
      return {
        ...sat,
        lat: radiansToDegrees(positionGd.latitude),
        lng: radiansToDegrees(positionGd.longitude),
        alt: positionGd.height / EARTH_RADIUS_KM
      };
    }
  
    return null; // Return null if the propagation failed or position is not available
  }).filter((obj): obj is Satellite => obj !== null), [satData, time]);  

  const satObject = useMemo(() => {
    const satGeometry = new THREE.OctahedronGeometry(SAT_SIZE / EARTH_RADIUS_KM / 2, 0);
    const satMaterial = new THREE.MeshLambertMaterial({ color: 'palegreen', transparent: true, opacity: 0.7 });
    return new THREE.Mesh(satGeometry, satMaterial);
  }, []);

  const globeContainerRef = useRef<HTMLDivElement>(null); // Ref for the globe container
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // Initialize with numeric values

  useEffect(() => {
    const updateGlobeSize = () => {
      if (globeContainerRef.current) {
        setDimensions({
          width: globeContainerRef.current.offsetWidth - 40, // Set as a number
          height: globeContainerRef.current.offsetHeight - 40 // Set as a number
        });
      }
    };

    // Call once to set initial size
    updateGlobeSize();

    // Setup event listener for window resize to update size
    window.addEventListener('resize', updateGlobeSize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', updateGlobeSize);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div ref={globeContainerRef} className="container my-4 p-4 bg-gray-100 rounded-lg shadow h-96">
      <h2 className="text-lg font-bold text-center mb-2">Orbital Vis</h2>
      <Globe
        width={dimensions.width}
        height={dimensions.height}
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        objectsData={objectsData}
        objectLabel="name"
        objectLat="lat"
        objectLng="lng"
        objectAltitude="alt"
        objectThreeObject={() => satObject}
      />
    </div>
  );
};

export default MyGlobe;
