import React from 'react';
import Layout from './layout';
import Dashboard from '@/components/Dashboard/Dash';
import MyGlobe from '../components/OrbitalPath/OrbitalVisualization';

export default function Page() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center">
        <Dashboard/>
        <MyGlobe/>
        <footer/>
      </main>
    </Layout>
  );
}
