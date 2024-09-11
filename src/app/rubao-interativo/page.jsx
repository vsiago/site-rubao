"use client"
import { useEffect } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js'; // Import correto para image tracking

export default function RubaoInterativo() {
  useEffect(() => {
    const scene = document.querySelector('a-scene');

    const handleMindARLoaded = () => {
      const mindAR = scene?.systems?.mindar; // Verifica se o sistema MindAR está presente
      if (mindAR && typeof mindAR.start === 'function') {
        mindAR.start(); // Iniciar o AR quando o sistema MindAR estiver disponível
      } else {
        console.error('MindAR system not found');
      }
    };

    if (scene) {
      scene.addEventListener('loaded', handleMindARLoaded);
    }

    // Remover o evento ao desmontar o componente
    return () => {
      if (scene) {
        scene.removeEventListener('loaded', handleMindARLoaded);
      }
    };
  }, []);

  return (
    <div>
      <a-scene
        mindar-image="imageTargetSrc: /targets.mind" // Ajuste para Image Tracking
        embedded
        color-space="sRGB"
        renderer="antialias: true; alpha: true"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          {/* Carregar o arquivo .mind e a imagem PNG */}
          <a-asset-item id="mindar-file" src="/targets.mind"></a-asset-item>
          <img id="rubao-frame" src="/rubao-santinho-frame.png" alt="Rubão Santinho Frame" />
        </a-assets>

        {/* Adicionar MindAR sistema */}
        <a-entity
          mindar-image-target="targetIndex: 0" // Atribuindo o índice do target
          position="0 0 0"
          scale="1 1 1"
        >
          {/* Entidade para renderizar a imagem PNG ao detectar a imagem */}
          <a-image
            src="#rubao-frame"
            width="1"
            height="1"
            position="0 0 -1"
            rotation="0 0 0"
          ></a-image>
        </a-entity>

        <a-camera position="0 0 0"></a-camera>
      </a-scene>
    </div>
  );
}
