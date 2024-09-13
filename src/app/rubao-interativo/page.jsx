"use client"
import { useEffect } from 'react';

const ARPage = () => {
  useEffect(() => {
    if (!document.querySelector('script[src="https://aframe.io/releases/1.6.0/aframe.min.js"]')) {
      const scriptAFrame = document.createElement('script');
      scriptAFrame.src = 'https://aframe.io/releases/1.6.0/aframe.min.js';
      scriptAFrame.async = true;
      document.body.appendChild(scriptAFrame);
    }

    if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"]')) {
      const scriptMindAR = document.createElement('script');
      scriptMindAR.src = 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js';
      scriptMindAR.async = true;
      document.body.appendChild(scriptMindAR);
    }

    return () => {
      const scriptAFrame = document.querySelector('script[src="https://aframe.io/releases/1.6.0/aframe.min.js"]');
      const scriptMindAR = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"]');
      
      if (scriptAFrame) document.body.removeChild(scriptAFrame);
      if (scriptMindAR) document.body.removeChild(scriptMindAR);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <a-scene
        mindar-image={`imageTargetSrc: /targets.mind;`} // Atualize para o caminho do seu arquivo targets.mind
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          {/* Carrega a imagem PNG do overlay */}
          <img
            id="overlayImage"
            src="/rubao-santinho-frame.png"
            crossorigin="anonymous"
            height
          />
        </a-assets>

        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
          fullscreen
        ></a-camera>
        
        {/* Entidade que será renderizada quando o target for detectado */}
        <a-entity mindar-image-target="targetIndex: 0">
          {/* Plane onde o overlay será aplicado */}
          <a-plane
            src="#overlayImage"  // Referencia a imagem carregada no <a-assets>
            position="0 0 0"
            height="1.2"
            width="1"
            rotation="0 0 0"
            material="transparent: true; opacity: 1" 
          ></a-plane>
          
          {/* Modelo 3D se desejado */}
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
