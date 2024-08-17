import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg"; // Ajuste o caminho conforme a localização real do arquivo

const ImageCropper = ({ imageSrc }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // Ajusta o zoom mínimo com base no tamanho da imagem
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const { width, height } = img;
      const minZoomLevel = Math.max(400 / width, 400 / height);
      setZoom(minZoomLevel);
      setMinZoom(minZoomLevel);
    };
  }, [imageSrc]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    try {
      // Gera a URL da imagem cortada
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
    link.download = "theme-rubao20.png"; // Nome do arquivo que será baixado
    document.body.appendChild(link); // Adiciona o link ao DOM
    link.click();
    document.body.removeChild(link); // Remove o link do DOM
  };

  return (
    <div className="relative w-[400px] h-[400px]">
      {/* Container para a imagem e a sobreposição */}
      {/* Imagem de sobreposição */}
      <div
        className="border-2 border-white/10 rounded-md"
        style={{
          backgroundImage: 'url("/images/theme-rubao-20.png")',
          backgroundSize: "cover",
          width: "100%",
          maxWidth: "400px",
          height: "100%",
          maxHeight: "100%",
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
        minZoom={minZoom} // Ajuste dinâmico do minZoom
        aspect={1} // Mantém o corte em formato quadrado
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        style={{
          containerStyle: {
            minWidth: "100%",
            minHeight: "100%",
            objectFit: "cover",
          },
        }} // Ajusta o tamanho da área de visualização
      />
      {/* Visualização da Imagem Cortada */}
      {croppedImage && (
        <div
          style={{
            backgroundImage: `url(${croppedImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "400px",
            height: "400px",
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
          className="absolute -bottom-14 w-full bg-green-500 text-white p-2 border border-gray-600 rounded-sm"
          style={{ zIndex: 12 }} // Garantia de visibilidade do botão
        >
          Download
        </button>
      )}

      {/* Botão de Salvar */}
      <button
        onClick={handleSave}
        className="absolute -bottom-14 bg-sky-500 text-white p-2 border border-gray-600 w-full rounded-sm"
        style={{ zIndex: 10 }}
      >
        Salvar
      </button>
    </div>
  );
};

export default ImageCropper;
