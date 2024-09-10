import React, { useEffect } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

const ARComponent = () => {
  useEffect(() => {
    // Aqui pode colocar inicializações ou configs do MindAR se necessário
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

export default ARComponent;
