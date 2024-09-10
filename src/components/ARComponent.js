import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Importar 'aframe' apenas no cliente
      require('aframe');
    }
  }, []);

  return (
    <div>
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}
      >
        <a-camera position="0 0 0"></a-camera>

        {/* Texto simples no centro da tela */}
        <a-text
          value="Norte"
          position="0 1.5 -3"  // Posiciona o texto à frente da câmera
          align="center"
          color="red"
          width="6">
        </a-text>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
