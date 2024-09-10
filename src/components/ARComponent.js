import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const GeoARComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('aframe');
      require('mind-ar/dist/mindar-image-aframe.prod.js');
    }
  }, []);

  // Coordenadas da Prefeitura de Itaguaí
  const cityHallLat = -22.8669;
  const cityHallLon = -43.7751;

  return (
    <div>
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        style={{ width: '100%', height: '100vh' }}
        gps-camera="simulateAltitude: true;" // Removido positionMinAccuracy para exibir sempre
      >
        {/* O cubo será sempre visível independentemente da distância */}
        <a-entity
          gps-entity-place={`latitude: ${cityHallLat}; longitude: ${cityHallLon}`}
          geometry="primitive: box"
          material="color: red;"
          scale="10 10 10"
        >
          <a-text value="Prefeitura de Itaguaí" scale="50 50 50" position="0 50 0"></a-text>
        </a-entity>

        <a-camera gps-camera="simulateAltitude: true;"></a-camera>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(GeoARComponent), { ssr: false });
