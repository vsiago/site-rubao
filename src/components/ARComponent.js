import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [imageSize, setImageSize] = useState({ width: 10, height: 5 }); // Tamanho em metros

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Importar 'aframe' apenas no cliente
      require('aframe');

      // Adiciona o script 'aframe-gps-camera-component' via CDN
      const script = document.createElement('script');
      script.src = "https://unpkg.com/aframe-gps-camera-component/dist/aframe-gps-camera-component.min.js";
      script.async = true;
      document.body.appendChild(script);

      // Obter a localização do usuário
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Erro ao obter a localização:", error);
        }
      );

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  if (coords.latitude === null || coords.longitude === null) {
    return <div>Obtendo localização...</div>;
  }

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', zIndex: 1 }}>
        <p>Latitude: {coords.latitude}</p>
        <p>Longitude: {coords.longitude}</p>
        <p>Imagem Tamanho: {imageSize.width}m x {imageSize.height}m</p>
      </div>

      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        {/* GPS Camera */}
        <a-camera gps-camera rotation-reader></a-camera>

        {/* Imagem renderizada com base na localização atual */}
        <a-image
          src="/ar-rubao20.png"  // Caminho para a imagem
          gps-entity-place={`latitude: ${coords.latitude}; longitude: ${coords.longitude};`} // Coordenadas atuais
          width={imageSize.width}  // Largura em metros
          height={imageSize.height}  // Altura em metros
          scale="10 10 10"
        ></a-image>

        {/* Texto que sempre olha para a câmera */}
        <a-text
          value="Este conteúdo sempre estará virado para você."
          look-at="[gps-camera]"
          scale="10 10 10"
          gps-entity-place={`latitude: ${coords.latitude}; longitude: ${coords.longitude};`} // Coordenadas atuais
        ></a-text>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
