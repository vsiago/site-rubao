"use client";
import { useEffect, useState } from 'react';

const ARPage = () => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const loadScripts = () => {
      // Carregar o script A-Frame
      const scriptAFrame = document.createElement('script');
      scriptAFrame.src = 'https://aframe.io/releases/1.6.0/aframe.min.js';
      scriptAFrame.async = true;
      scriptAFrame.onload = () => {
        // Depois de carregar o A-Frame, carregar o MindAR
        const scriptMindAR = document.createElement('script');
        scriptMindAR.src = 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js';
        scriptMindAR.async = true;
        scriptMindAR.onload = () => setScriptsLoaded(true); // Marcar scripts como carregados
        document.body.appendChild(scriptMindAR);
      };
      document.body.appendChild(scriptAFrame);
    };

    loadScripts();

    return () => {
      const scriptAFrame = document.querySelector('script[src="https://aframe.io/releases/1.6.0/aframe.min.js"]');
      const scriptMindAR = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"]');
      
      if (scriptAFrame) document.body.removeChild(scriptAFrame);
      if (scriptMindAR) document.body.removeChild(scriptMindAR);
    };
  }, []);

  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  };

  if (!scriptsLoaded) {
    return <div>Loading...</div>; // Opcional: uma mensagem de carregamento
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
       <button
        onClick={enterFullscreen}
        className='p-3 px-6 bg-sky-500 text-lg font-semibold text-white rounded absolute bottom-8 left-2'
      >
        Entrar em tela cheia
      </button>
      <a-scene
        mindar-image="imageTargetSrc: /targets.mind;" // Atualize para o caminho do seu arquivo targets.mind
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style={{ width: '100%', height: '100%' }}
      >
        <a-assets>
          <img
            id="overlayImage"
            src="/rubao-santinho-frame.png"
            crossorigin="anonymous"
          />
        </a-assets>

        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
          fullscreen
        ></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-plane
            src="#overlayImage"
            position="0 0 0"
            height="1.2"
            width="1"
            rotation="0 0 0"
            material="transparent: true; opacity: 1"
          ></a-plane>
          
          <a-gltf-model
            rotation="0 0 0"
            position="0 0 0.1"
            scale="0.005 0.005 0.005"
            src="#avatarModel"
            animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
          ></a-gltf-model>
        </a-entity>
      </a-scene>

     
    </div>
  );
};

export default ARPage;
