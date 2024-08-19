"use client";
import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../components/getCroppedImg"; // Ajuste o caminho conforme a localização real do arquivo

const ImageCropper = ({ imageSrc }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    setZoom(1); // Definir o zoom inicial
  }, [imageSrc]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImageUrl);
    } catch (error) {
      console.error("Erro ao salvar imagem cortada:", error);
    }
  };

  const handleDownload = () => {
    if (!croppedImage) return;
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = "theme-rubao20-1080x1920.png"; // Nome do arquivo que será baixado
    document.body.appendChild(link); // Adiciona o link ao DOM
    link.click();
    document.body.removeChild(link); // Remove o link do DOM
  };

  return (
    <div className="relative w-full max-w-[540px] h-[960px] mx-auto">
      {/* Imagem de sobreposição */}
      <div
        className="border-2 border-white/10 rounded-md"
        style={{
          backgroundImage: 'url("/images/theme-1080x1920.png")',
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: "none", // Permite interações com a área abaixo
        }}
      />
      {/* Área de Corte */}
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={9 / 16} // Aspect ratio para 1080x1920
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        cropSize={{ width: 1080, height: 1920 }} // Define a área de corte para 1080x1920
        style={{
          containerStyle: {
            width: "100%",
            height: "100%",
            position: "relative",
          },
          cropAreaStyle: {
            width: "100%",
            height: "100%",
          },
          mediaStyle: {
            objectFit: "cover",
          },
        }}
      />
      {/* Visualização da Imagem Cortada */}
      {croppedImage && (
        <div
          style={{
            backgroundImage: `url(${croppedImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        />
      )}

      {/* Botão de Download */}
      {croppedImage && (
        <button
          onClick={handleDownload}
          className="absolute bottom-0 w-full bg-green-500 text-white p-2 border border-gray-600 rounded-sm"
          style={{ zIndex: 12 }} // Garantia de visibilidade do botão
        >
          Download
        </button>
      )}

      {/* Botão de Salvar */}
      <button
        onClick={handleSave}
        className="absolute bottom-14 bg-sky-500 text-white p-2 border border-gray-600 w-full rounded-sm"
        style={{ zIndex: 10 }}
      >
        Salvar
      </button>
    </div>
  );
};

export default ImageCropper;
