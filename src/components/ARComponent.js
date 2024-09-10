import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Função para calcular a distância entre dois pontos geográficos (Haversine Formula)
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Raio da Terra em km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distância em km
};

const ARComponent = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [distanceMeters, setDistanceMeters] = useState(null);

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

  useEffect(() => {
    if (userPosition) {
      const distanceKm = haversineDistance(
        userPosition.latitude,
        userPosition.longitude,
        prefeituraLatitude,
        prefeituraLongitude
      );

      // Convertendo para metros
      const distanceMeters = distanceKm * 1000;
      setDistanceMeters(distanceMeters);

      console.log(`Distância: ${distanceMeters.toFixed(2)} metros`);

      // Exibir a distância atual a cada 10 segundos
      const intervalId = setInterval(() => {
        alert(`Distância atual do cubo: ${distanceMeters.toFixed(2)} metros`);
      }, 10000); // 10 segundos

      return () => clearInterval(intervalId);
    }
  }, [userPosition]);

  const prefeituraLatitude = -22.8641035;  // Latitude da Prefeitura
  const prefeituraLongitude = -43.7799832; // Longitude da Prefeitura

  return (
    <div>
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1 }}
      >
        <a-camera position="0 0 0"></a-camera>
        
        {/* Cubo flutuando a 20 metros de altura */}
        <a-box 
          position="0 20 -30"  // O cubo está 20 metros para cima e 30 metros à frente
          width="5" 
          height="5" 
          depth="5" 
          color="#4CC3D9"
        ></a-box>
      </a-scene>
      
      {/* Mostrar a distância em metros para debug */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: '#fff' }}>
        {distanceMeters !== null ? (
          <p>Distância do cubo: {distanceMeters.toFixed(2)} metros</p>
        ) : (
          <p>Obtendo sua posição...</p>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
