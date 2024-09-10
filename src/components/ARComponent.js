import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Função para calcular a distância entre dois pontos geográficos
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Raio da Terra em quilômetros

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distância em quilômetros
};

const ARComponent = () => {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('aframe');

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        });
      }
    }
  }, []);

  const prefeituraLatitude = -22.8641035;
  const prefeituraLongitude = -43.7799832;

  const isPointingToSky = () => {
    if (userPosition) {
      const distance = haversineDistance(
        userPosition.latitude,
        userPosition.longitude,
        prefeituraLatitude,
        prefeituraLongitude
      );

      return distance < 0.01; // Ajuste o valor de distância conforme necessário
    }
    return false;
  };

  return (
    <div>
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}
      >
        <a-camera position="0 0 0"></a-camera>
        
        {isPointingToSky() && (
          <a-image
            src="/ar-rubao20.png"
            position="0 1.5 -3"
            width="2"
            height="2"
          ></a-image>
        )}
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
