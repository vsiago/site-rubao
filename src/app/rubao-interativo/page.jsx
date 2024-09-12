"use client";
import { useEffect, useState } from 'react';

export default function RubaoInterativo() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Verifique se estamos no navegador
    if (typeof window !== 'undefined') {
      setIsClient(true);

      // Importar dinamicamente as bibliotecas para que sejam carregadas apenas no navegador
      import('aframe');
      import('mind-ar/dist/mindar-image-aframe.prod.js').then(() => {
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

        // Limpeza do evento
        return () => {
          if (scene) {
            scene.removeEventListener('loaded', handleMindARLoaded);
          }
        };
      });
    }
  }, []);

  // Função para entrar em modo Fullscreen
  const enterFullscreen = () => {
    const elem = document.documentElement; // Seleciona o elemento raiz do documento
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  };

  // Renderize apenas no cliente
  if (!isClient) {
    return null; // Evita a renderização no lado do servidor
  }

  return (
    <div>
      <a-scene
        mindar-image="imageTargetSrc: /targets.mind"
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

      {/* Botão para entrar em modo Tela Cheia */}
      <button onClick={enterFullscreen} className="fullscreen-btn">
        Entrar em Tela Cheia
      </button>

      <style jsx>{`
        .fullscreen-btn {
          position: fixed;
          bottom: 10px;
          right: 10px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          z-index: 2000;
        }
      `}</style>
    </div>
  );
}
