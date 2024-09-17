import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Importar 'aframe' apenas no cliente
      require('aframe');

      // Adiciona o script 'aframe-gps-camera-component' via CDN
      const script = document.createElement('script');
      script.src = "https://unpkg.com/aframe-gps-camera-component/dist/aframe-gps-camera-component.min.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div>
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}
      >
        <a-camera gps-camera></a-camera>

        {/* Imagem renderizada com base em latitude e longitude */}
        <a-image
          src="/ar-rubao20.png"  // Caminho para a imagem
          gps-entity-place="latitude: -22.8708854; longitude: -43.7859875;" // Substitua pelas coordenadas desejadas
          width="20"  // Largura em metros
          height="20"  // Altura em metros
          scale="50 50 50"
        ></a-image>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
