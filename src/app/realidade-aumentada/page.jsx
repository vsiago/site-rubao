"use client"
import React, { useEffect, useState } from 'react';
import CameraView from '../../components/CameraView';
import ARComponent from '../../components/ARComponent';
import YouTubeLive from '../../components/YouTubeLive';

const RealidadeAumentada = () => {
  const [showLive, setShowLive] = useState(false);

  // Condição para mostrar o YouTube Live (exemplo: quando for 20h)
  const checkLiveTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour === 20) {
      setShowLive(true);
    }
  };

  useEffect(() => {
    checkLiveTime();
  }, []);

  return (
    <div>
      {showLive ? (
        <YouTubeLive />
      ) : (
        <>
          <CameraView />
          <ARComponent />
        </>
      )}
    </div>
  );
};
// teste

export default RealidadeAumentada;
