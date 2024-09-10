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

        {/* Imagem substituindo o texto */}
        <a-image
          src="/ar-rubao20.png"  // Caminho para a imagem
          position="0 1.5 -3"  // Posiciona a imagem à frente da câmera
          width="2"  // Largura da imagem
          height="2"  // Altura da imagem
        ></a-image>
      </a-scene>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
