import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ARLocationComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('aframe');
      
      // Adiciona o script do AR.js ao carregar o componente
      const script = document.createElement('script');
      script.src = "https://raw.githack.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar-nft.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div>
      <a-scene embedded arjs='sourceType: webcam;'>
        {/* Configurar a câmera com GPS */}
        <a-camera gps-camera rotation-reader></a-camera>

        {/* Configuração do cubo na localização GPS específica */}
        <a-box
          gps-entity-place="latitude: -22.8708854; longitude: -43.7859875;"
          scale="20 20 20"
          material="color: red;"
        ></a-box>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARLocationComponent), { ssr: false });
