import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg"; // Ajuste o caminho conforme a localização real do arquivo

const ImageCropper = ({ imageSrc }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    setZoom(1); // Definir o zoom inicial para que a imagem preencha o quadrado de 400x400
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
    link.download = "marilanedasaude-rubao.png"; // Nome do arquivo que será baixado
    document.body.appendChild(link); // Adiciona o link ao DOM
    link.click();
    document.body.removeChild(link); // Remove o link do DOM
  };

  return (
    <div className="relative w-[400px] h-[400px]">
      {/* Imagem de sobreposição */}
      <div
        className="border-2 border-white/10 rounded-md"
        style={{
          backgroundImage: 'url("/images/profile-marilanedasaude.png")',
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
        aspect={1} // Mantém o corte em formato quadrado
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
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
          className="absolute -bottom-16 w-full bg-green-500 border-2 hover:bg-green-200 hover:text-green-900 shadow-2xl hover:scale-110 border-green-100 text-white p-3  rounded-full transition-all duration-150 ease-in-out"
          style={{ zIndex: 5 }} // Garantia de visibilidade do botão
        >
          Download
        </button>
      )}

      {/* Botão de Salvar */}
      <button
        onClick={handleSave}
        className="absolute -bottom-16 bg-sky-500 border-2 border-sky-300  p-3 w-full rounded-full hover:bg-sky-200 text-white hover:text-blue-900 transition-all duration-150 ease-in-out"
        style={{ zIndex: 4 }} // Garantia de visibilidade do botão
      >
        Salvar
      </button>
    </div>
  );
};

export default ImageCropper;
