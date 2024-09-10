import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const GeoARComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('aframe');
      require('mind-ar/dist/mindar-image-aframe.prod.js');
    }
  }, []);

  return (
    <div>
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        style={{ width: '100%', height: '100vh' }}
        gps-camera
      >
        {/* Define o objeto com base em lat/long */}
        <a-entity
          gps-entity-place="latitude: -22.8669; longitude: -43.7751"
          geometry="primitive: box"
          material="color: red;"
          scale="10 10 10"
        >
          <a-text value="Prefeitura de Itaguaí" scale="50 50 50" position="0 50 0"></a-text>
        </a-entity>

        {/* A câmera com suporte a GPS */}
        <a-camera gps-camera="simulateAltitude: false; positionMinAccuracy: 100"></a-camera>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(GeoARComponent), { ssr: false });
