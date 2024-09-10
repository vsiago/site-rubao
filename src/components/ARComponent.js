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
  const [showImage, setShowImage] = useState(false);

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
      const distance = haversineDistance(
        userPosition.latitude,
        userPosition.longitude,
        prefeituraLatitude,
        prefeituraLongitude
      );

      console.log('Distância:', distance);

      const shouldShowImage = distance < 0.01;
      setShowImage(shouldShowImage);

      // Alertar as coordenadas da imagem e a distância
      if (shouldShowImage) {
        alert(`Imagem posicionada em: X: 0, Y: 1.5, Z: -3`);
      }

      // Configurar intervalo para alertar a distância a cada 10 segundos
      const intervalId = setInterval(() => {
        alert(`Distância: ${distance.toFixed(2)} km`);
      }, 10000); // 10000 ms = 10 segundos

      // Limpar intervalo quando o componente for desmontado
      return () => clearInterval(intervalId);
    }
  }, [userPosition]);

  const prefeituraLatitude = -22.8641035;
  const prefeituraLongitude = -43.7799832;

  return (
    <div>
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1 }}
      >
        {/* Certifique-se de que a câmera está ativa */}
        <a-camera position="0 0 0"></a-camera>
        
        {/* Adicione uma caixa de teste para ver se os elementos estão renderizando */}
        <a-box position="0 1 -3" rotation="0 45 45" color="#4CC3D9"></a-box>

        {/* Mostrar imagem quando estiver dentro do alcance */}
        {showImage && (
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
