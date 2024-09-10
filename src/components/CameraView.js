import React, { useEffect } from 'react';

const CameraView = () => {
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const videoElement = document.getElementById('video');
          if (videoElement) {
            videoElement.srcObject = stream;
            videoElement.play();
          }
        })
        .catch((err) => {
          console.error("Erro ao acessar a câmera: ", err);
        });
    }
  }, []);

  return <video id="video" style={{ width: '100%' }} autoPlay playsInline />;
};

export default CameraView;
