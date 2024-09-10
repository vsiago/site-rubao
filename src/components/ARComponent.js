import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Importa 'aframe' somente no cliente
      require('aframe');
    }
  }, []);

  return (
    <div>
      <a-scene
        embedded
        style={{ width: '100%', height: '100vh' }}
        vr-mode-ui="enabled: false"
      >
        {/* Configura a câmera */}
        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
          video="facingMode: environment"
        ></a-camera>

        {/* Cubo grande e visível */}
        <a-entity
          geometry="primitive: box"
          material="color: red;"
          scale="10 10 10"  // Tamanho grande do cubo
          position="0 0 -5"  // Ajuste da posição do cubo
          rotation="0 0 0"
        >
          <a-text
            value="Cubo Norte"
            scale="10 10 10"  // Tamanho do texto
            position="0 0 5"  // Ajuste da posição do texto
          ></a-text>
        </a-entity>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
