import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [imageSize, setImageSize] = useState({ width: 5.5, height: 5 }); // Tamanho em metros
  const [distance, setDistance] = useState(3); // Distância inicial da imagem em metros
  const [checkInCoords, setCheckInCoords] = useState(null); // Coordenadas de check-in

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

  // Função para registrar a posição de check-in
  const handleCheckIn = () => {
    setCheckInCoords({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  // Calcular a nova posição da imagem com base nas coordenadas de check-in e na distância ajustada
  const imagePosition = checkInCoords
    ? `0 1.5 -${distance}`  // Ajuste conforme necessário para a sua cena
    : '0 1.5 -3'; // Posição padrão se ainda não houver check-in

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
          style={{ writingMode: 'bt-lr', transform: 'rotate(270deg)', margin: '20px' }} // Rotaciona o slider
        />
        <button onClick={handleCheckIn} style={{ display: 'block', marginTop: '20px' }}>
          Check-in
        </button>
        {checkInCoords && (
          <div>
            <p>Coordenadas de Check-in:</p>
            <p>Latitude: {checkInCoords.latitude}</p>
            <p>Longitude: {checkInCoords.longitude}</p>
          </div>
        )}
      </div>

      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        {/* GPS Camera */}
        <a-camera gps-camera rotation-reader></a-camera>

        {/* Imagem renderizada com base nas coordenadas de check-in */}
        {checkInCoords && (
          <a-image
            src="/ar-rubao20.png"  // Caminho para a imagem no diretório público
            gps-entity-place={`latitude: ${checkInCoords.latitude}; longitude: ${checkInCoords.longitude};`} // Coordenadas de check-in
            width={imageSize.width}  // Largura em metros
            height={imageSize.height}  // Altura em metros
            scale="5 5 5"  // Ajuste a escala conforme necessário
            position={imagePosition}  // Atualiza a posição da imagem com base na distância ajustada
          ></a-image>
        )}

        {/* Texto que sempre olha para a câmera */}
        <a-text
          value="Este conteúdo sempre estará virado para você."
          look-at="[gps-camera]"
          scale="5 5 5"  // Ajuste a escala conforme necessário
          gps-entity-place={checkInCoords ? `latitude: ${checkInCoords.latitude}; longitude: ${checkInCoords.longitude};` : ''} // Coordenadas de check-in
        ></a-text>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
