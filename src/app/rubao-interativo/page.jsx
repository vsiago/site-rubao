"use client"
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Carregar Aframe e MindAR dinamicamente e desabilitar SSR
const ARComponent = dynamic(
  () => {
    return import('aframe').then(() => {
      return import('mind-ar/dist/mindar-image-aframe.prod.js');
    });
  },
  { ssr: false }
);

export default function RubaoInterativo() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);

      const scene = document.querySelector('a-scene');

      const handleMindARLoaded = () => {
        const mindAR = scene?.systems?.mindar;
        if (mindAR && typeof mindAR.start === 'function') {
          mindAR.start(); // Iniciar o AR quando o sistema MindAR estiver disponível
        } else {
          console.error('MindAR system not found');
        }
      };

      if (scene) {
        scene.addEventListener('loaded', handleMindARLoaded);
      }

      return () => {
        if (scene) {
          scene.removeEventListener('loaded', handleMindARLoaded);
        }
      };
    }
  }, []);

  if (!isClient) {
    return <div>Carregando...</div>; // Mostra um texto temporário enquanto o cliente carrega
  }

  return (
    <a-scene
      mindar-image="imageTargetSrc: /targets.mind"
      embedded
      color-space="sRGB"
      renderer="antialias: true; alpha: true"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <a-asset-item id="mindar-file" src="/targets.mind"></a-asset-item>
        <img id="rubao-frame" src="/rubao-santinho-frame.png" alt="Rubão Santinho Frame" />
      </a-assets>

      <a-entity
        mindar-image-target="targetIndex: 0"
        position="0 0 0"
        scale="1 1 1"
      >
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
  );
}
