import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ARComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Importa 'aframe' e 'mind-ar' somente no cliente
      require('aframe');
      require('mind-ar/dist/mindar-image-aframe.prod.js');
      
      // Qualquer outra inicialização do A-Frame ou MindAR pode ser colocada aqui
    }
  }, []);

  return (
    <a-scene mindar="imageTargetSrc: /assets/target.mind; autoStart: true;" embedded>
      <a-camera position="0 0 0"></a-camera>

      {/* Exemplo de imagem 20 */}
      <a-entity mindar-image-target="targetIndex: 0">
        <a-image src="/assets/imagem20.png" position="0 0 0" width="1" height="1"></a-image>
      </a-entity>
    </a-scene>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
