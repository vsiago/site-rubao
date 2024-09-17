import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [imageSize, setImageSize] = useState({ width: 5.5, height:5 }); // Tamanho em metros
  const [distance, setDistance] = useState(3); // Distância inicial da imagem em metros

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

  // Calcular a nova posição da imagem com base na distância ajustada
  const imagePosition = `0 1.5 -${distance}`;

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', zIndex: 1 }}>
        <p>Latitude: {coords.latitude}</p>
        <p>Longitude: {coords.longitude}</p>
        <p>Imagem Tamanho: {imageSize.width}m x {imageSize.height}m</p>
        <p>Distância da Imagem: {distance}m</p>
          <input
            type="range"
            min="1"
            max="20"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value))}
          />
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
          src="/ar-rubao20.png"  // Caminho para a imagem no diretório público
          gps-entity-place={`latitude: -22.8709369; longitude: -43.7862696;`} // Coordenadas atuais
          width={imageSize.width}  // Largura em metros
          height={imageSize.height}  // Altura em metros
          scale="5 5 5"  // Ajuste a escala conforme necessário
          position={imagePosition}  // Atualiza a posição da imagem com base na distância ajustada
        ></a-image>

        {/* Texto que sempre olha para a câmera */}
        <a-text
          value="Este conteúdo sempre estará virado para você."
          look-at="[gps-camera]"
          scale="5 5 5"  // Ajuste a escala conforme necessário
          gps-entity-place={`latitude: ${coords.latitude}; longitude: ${coords.longitude};`} // Coordenadas atuais
        ></a-text>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
