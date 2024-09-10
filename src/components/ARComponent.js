import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('aframe');
      
      // Obter a posição do usuário
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

  // Latitude e Longitude da Prefeitura de Itaguaí
  const prefeituraLatitude = -22.8715; // Substitua pela latitude real
  const prefeituraLongitude = -43.5957; // Substitua pela longitude real

  // Função para verificar se a posição do usuário está alinhada com a Prefeitura
  const isPointingToSky = () => {
    if (userPosition) {
      const distance = Math.sqrt(
        Math.pow(userPosition.latitude - prefeituraLatitude, 2) +
        Math.pow(userPosition.longitude - prefeituraLongitude, 2)
      );

      // Ajuste o valor de distância para quando a imagem deve aparecer
      return distance < 0.01; // Ajuste conforme necessário
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
        
        {/* Mostrar imagem apenas se estiver apontando para o céu */}
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
