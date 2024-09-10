import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Função para converter graus para radianos
const toRad = (value) => (value * Math.PI) / 180;

// Função para calcular a distância entre dois pontos geográficos (Haversine Formula)
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distância em km
};

const ARComponent = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [cubePosition, setCubePosition] = useState(null); // Posição do cubo
  const [distanceMeters, setDistanceMeters] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("aframe");

      // Obter a posição do usuário
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userPos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserPosition(userPos);

          // Colocar o cubo a 50 metros de distância
          const distInKm = 0.05; // 50 metros em km
          const distInDegrees = distInKm / 111.32; // Aproximadamente 111.32 km por grau de latitude

          const cubeLat = userPos.latitude + distInDegrees; // 50 metros ao norte
          const cubeLon = userPos.longitude; // Manter a mesma longitude

          setCubePosition({ latitude: cubeLat, longitude: cubeLon });
        });
      }
    }
  }, []);

  useEffect(() => {
    if (userPosition && cubePosition) {
      const distanceKm = haversineDistance(
        userPosition.latitude,
        userPosition.longitude,
        cubePosition.latitude,
        cubePosition.longitude
      );

      // Converter para metros
      const distanceMeters = distanceKm * 1000;
      setDistanceMeters(distanceMeters);

      console.log(`Distância: ${distanceMeters.toFixed(2)} metros`);

      // Exibir a distância atual a cada 10 segundos
      const intervalId = setInterval(() => {
        alert(`Distância atual do cubo: ${distanceMeters.toFixed(2)} metros`);
      }, 10000); // 10 segundos

      return () => clearInterval(intervalId);
    }
  }, [userPosition, cubePosition]);

  return (
    <div>
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 1,
        }}
      >
        <a-camera position="0 0 0"></a-camera>

        {/* Mostrar o cubo apenas quando a posição for calculada */}
        {cubePosition && (
          <a-box
            position="0 0 -50" // 50 metros à frente e 20 metros acima do chão
            width="20" // Aumentando a largura para 20 metros
            height="50" // Aumentando a altura para 20 metros
            depth="20" // Aumentando a profundidade para 20 metros
            color="#4CC3D9"
          ></a-box>
        )}
      </a-scene>

      {/* Mostrar a distância para debug */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "#fff",
        }}
      >
        {distanceMeters !== null ? (
          <p>Distância do cubo: {distanceMeters.toFixed(2)} metros</p>
        ) : (
          <p>Obtendo sua posição...</p>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ARComponent), { ssr: false });
