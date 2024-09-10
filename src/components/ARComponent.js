import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {
  const [canSeeAR, setCanSeeAR] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Importa 'aframe' e 'mind-ar' somente no cliente
      require('aframe');
      require('mind-ar/dist/mindar-image-aframe.prod.js');

      // Ativa AR diretamente para teste
      setCanSeeAR(true);
    }
  }, []);

  return (
    <div>
      {canSeeAR ? (
        <a-scene
          mindar="imageTargetSrc: /assets/target.mind; autoStart: true;"
          embedded
          vr-mode-ui="enabled: false"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <a-camera
            position="0 0 0"
            look-controls="enabled: true"
            mindar-camera="videoConstraints: { facingMode: { exact: 'environment' } }"
            // Usa a câmera traseira
          ></a-camera>

          {/* Exemplo de texto "Norte" movido para o topo */}
          <a-entity position="0 2 -5">
            <a-text value="Norte" align="center" color="red"></a-text>
          </a-entity>
        </a-scene>
      ) : (
        <p>Ative a realidade aumentada mirando para o céu.</p>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
