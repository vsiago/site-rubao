import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = url;
  });

const getCroppedImg = async (imageSrc, crop, overlayImageUrl) => {
  try {
    // Carrega a imagem do usuário
    const userImage = await createImage(imageSrc);

    // Carrega a imagem de overlay
    const overlayImage = await createImage(overlayImageUrl); // Ajuste o caminho conforme necessário

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Define as dimensões do canvas para o tamanho do crop
    canvas.width = crop.width;
    canvas.height = crop.height;

    // Desenha a imagem recortada no canvas
    ctx.drawImage(
      userImage,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    // Adiciona o overlay se a imagem de overlay estiver carregada
    if (overlayImage) {
      ctx.drawImage(overlayImage, 0, 0, crop.width, crop.height);
    }

    // Converte o canvas para uma URL de objeto (Blob URL)
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, "image/png");
    });
  } catch (error) {
    console.error("Erro ao recortar imagem:", error);
    throw error;
  }
};

const ImageCropper = ({ imageSrc, downloadFileName, backgroundImageUrl }) => {
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
      const croppedImageUrl = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        backgroundImageUrl
      );
      setCroppedImage(croppedImageUrl);
    } catch (error) {
      console.error("Erro ao salvar imagem cortada:", error);
    }
  };

  const handleDownload = () => {
    if (!croppedImage) return;
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = downloadFileName; // Nome do arquivo que será baixado
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
          backgroundImage: `url(${backgroundImageUrl})`,
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
        cropSize={{ width: 400, height: 400 }} // Define a área de corte para 400x400
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
