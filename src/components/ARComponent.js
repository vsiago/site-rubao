import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
        {/* Configura a câmera traseira */}
        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
          video="facingMode: environment"
        ></a-camera>

        {/* Cubo muito grande */}
        <a-entity
          geometry="primitive: box"
          material="color: red;"
          scale="50 50 50"  // Aumenta o tamanho do cubo
          position="0 0 -20"  // Ajusta a posição para que o cubo fique visível
          rotation="0 0 0"
        >
          <a-text
            value="Cubo Norte"
            scale="10 10 10"  // Aumenta o tamanho do texto
            position="0 0 0"  // Ajusta a posição do texto no cubo
          ></a-text>
        </a-entity>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
