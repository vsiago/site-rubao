import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Função para converter graus para radianos
const toRad = (value) => (value * Math.PI) / 180;

// Função para calcular a distância entre dois pontos geográficos (Haversine Formula)
const haversineDistance = (lat1, lon1, lat2, lon2) => {
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

// Função para converter coordenadas geográficas (latitude e longitude) para um sistema cartesiano simplificado
const latLonToXYZ = (lat, lon, distance) => {
  const phi = toRad(90 - lat);
  const theta = toRad(lon);

  const x = distance * Math.sin(phi) * Math.cos(theta);
  const y = distance * Math.sin(phi) * Math.sin(theta);
  const z = distance * Math.cos(phi);

  return { x, y, z };
};

const ARComponent = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [distanceMeters, setDistanceMeters] = useState(null);
  const [cubePosition, setCubePosition] = useState({ x: 0, y: 0, z: 0 });

  // Latitude e Longitude da Prefeitura de Itaguaí
  const prefeituraLatitude = -22.8641035;
  const prefeituraLongitude = -43.7799832;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('aframe');

      // Obter a posição do usuário
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const userPos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserPosition(userPos);

          console.log(`Sua latitude: ${userPos.latitude}, longitude: ${userPos.longitude}`);

          // Calcular a distância até a Prefeitura
          const distanceKm = haversineDistance(
            userPos.latitude,
            userPos.longitude,
            prefeituraLatitude,
            prefeituraLongitude
          );

          // Converter para metros
          const distanceMeters = distanceKm * 1000;
          setDistanceMeters(distanceMeters);

          console.log(`Distância até a Prefeitura: ${distanceMeters.toFixed(2)} metros`);

          // Converter a posição da Prefeitura para coordenadas XYZ
          const cubePos = latLonToXYZ(prefeituraLatitude, prefeituraLongitude, distanceMeters);
          setCubePosition(cubePos);
        });
      }
    }
  }, []);

  return (
    <div>
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1 }}
      >
        <a-camera position="0 0 0"></a-camera>
        
        {/* Mostrar o cubo fixo na posição XYZ da Prefeitura */}
        <a-box 
          position={`${cubePosition.x} 20 ${cubePosition.z}`}  // Ajustar a altura se necessário
          width="20" 
          height="20" 
          depth="20" 
          color="#4CC3D9"
        ></a-box>
      </a-scene>

      {/* Mostrar a distância para debug */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: '#fff' }}>
        {distanceMeters !== null ? (
          <>
            <p>Sua posição: {userPosition?.latitude}, {userPosition?.longitude}</p>
            <p>Distância até a Prefeitura: {distanceMeters.toFixed(2)} metros</p>
          </>
        ) : (
          <p>Obtendo sua posição...</p>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
