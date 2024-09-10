import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [isInLocation, setIsInLocation] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Importa 'aframe' e 'mind-ar' somente no cliente
      require('aframe');
      require('mind-ar/dist/mindar-image-aframe.prod.js');

      // Obtenha a localização do usuário
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Define uma localização de referência (Prefeitura de Itaguaí)
          const targetLocation = {
            latitude: -22.8641,  // Latitude da prefeitura
            longitude: -43.7772, // Longitude da prefeitura
          };

          // Verifique se o usuário está perto da localização alvo (precisão de 100 metros)
          const distance = getDistanceFromLatLonInKm(
            latitude,
            longitude,
            targetLocation.latitude,
            targetLocation.longitude
          );

          if (distance <= 0.1) { // Aproximadamente 100 metros
            setIsInLocation(true);
          }
        });
      }
    }
  }, []);

  // Função para calcular a distância entre duas coordenadas
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distância em km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div>
      {isInLocation ? (
        <a-scene
          mindar="imageTargetSrc: /assets/target.mind; autoStart: true;"
          embedded
          vr-mode-ui="enabled: false"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <a-camera
            position="0 0 0"
            look-controls="enabled: false"
            mindar-camera="videoConstraints: { facingMode: { ideal: 'environment' } }"
          ></a-camera>

          {/* Exemplo de imagem 20 */}
          <a-entity mindar-image-target="targetIndex: 0">
            <a-image src="/ar-rubao20.png" position="0 0 0" width="1" height="1"></a-image>
          </a-entity>
        </a-scene>
      ) : (
        <p>Você precisa estar perto da Prefeitura de Itaguaí para acessar essa experiência de realidade aumentada.</p>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
