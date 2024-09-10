import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [canSeeAR, setCanSeeAR] = useState(false);

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

          // Verifique se o usuário está dentro de Itaguaí
          if (isInItaguai(latitude, longitude)) {
            // Ativa a AR se o usuário estiver mirando na direção da prefeitura
            const isPointingToPrefeitura = isPointingTowardsCityHall(latitude, longitude);
            if (isPointingToPrefeitura) {
              setCanSeeAR(true);
            }
          }
        });
      }
    }
  }, []);

  // Função que verifica se o usuário está dentro de Itaguaí (limites aproximados)
  function isInItaguai(lat, lon) {
    const itaguaiBounds = {
      north: -22.80,
      south: -23.00,
      east: -43.60,
      west: -44.00,
    };

    return (
      lat <= itaguaiBounds.north &&
      lat >= itaguaiBounds.south &&
      lon <= itaguaiBounds.east &&
      lon >= itaguaiBounds.west
    );
  }

  // Função para verificar se o usuário está apontando na direção da prefeitura
  function isPointingTowardsCityHall(lat, lon) {
    const cityHallLat = -22.8669;  // Latitude da Prefeitura de Itaguaí
    const cityHallLon = -43.7751;  // Longitude da Prefeitura de Itaguaí

    // Cálculo simples de direção (neste exemplo, isso pode ser expandido)
    const userDirectionToCityHall = Math.atan2(cityHallLat - lat, cityHallLon - lon);
    const userHeading = getUserHeading(); // Função para obter direção da bússola ou dispositivo

    // Verifica se o usuário está olhando para a direção correta (com tolerância de 15 graus)
    const angleDifference = Math.abs(userDirectionToCityHall - userHeading);
    return angleDifference < (15 * (Math.PI / 180)); // 15 graus de tolerância
  }

  // Exemplo de função para pegar a direção do dispositivo
  function getUserHeading() {
    // Suporte básico para dispositivos com API de orientação
    // Retorna um valor de exemplo (norte)
    return 0; // 0 radianos corresponde ao norte
  }

  return (
    <div>
      {canSeeAR ? (
        <a-scene
          mindar="imageTargetSrc: /assets/target.mind; autoStart: true;"
          embedded
          vr-mode-ui="enabled: false"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}
        >
          <a-camera
            position="0 0 0"
            look-controls="enabled: false"
            mindar-camera="videoConstraints: { facingMode: { ideal: 'environment' } }"
            // Garante que a câmera traseira seja usada
            video="facingMode: environment"
          ></a-camera>

          {/* Exemplo de imagem 20 centralizada ao mirar para o céu */}
          <a-entity mindar-image-target="targetIndex: 0">
            <a-image src="/ar-rubao20.png" position="0 5 0" rotation="-90 0 0" width="4" height="4"></a-image>
          </a-entity>
        </a-scene>
      ) : (
        <p>Você precisa estar em Itaguaí e mirando para o céu na direção da Prefeitura para visualizar a realidade aumentada.</p>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
