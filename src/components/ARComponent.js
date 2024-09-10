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
        // Adiciona o componente AR
      >
        {/* A câmera traseira é utilizada */}
        <a-camera 
          position="0 0 0" 
          look-controls="enabled: false" 
          // Configura a câmera traseira
          video="facingMode: environment"
        ></a-camera>

        {/* Cubo simples apontado para o norte */}
        <a-entity
          geometry="primitive: box"
          material="color: red;"
          scale="10 10 10"
          position="0 0 -5"  // Ajuste a posição para que o cubo seja visível
          rotation="0 0 0"  // Cubo voltado para o norte
        >
          <a-text value="Cubo Norte" scale="5 5 5" position="0 0 0.5"></a-text>
        </a-entity>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
