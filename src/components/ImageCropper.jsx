"use client";
import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg"; // Ajuste o caminho conforme a localização real do arquivo

const ImageCropper = ({ imageSrc }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [blurredImage, setBlurredImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // Função para criar uma imagem desfocada e ampliada
  const createBlurredImage = useCallback(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Aplicar desfoque e ampliação
      ctx.filter = "blur(20px)";
      ctx.drawImage(
        img,
        0,
        0,
        canvas.width * 1.5,
        canvas.height * 1.5,
        0,
        0,
        canvas.width,
        canvas.height
      );

      setBlurredImage(canvas.toDataURL());
      setImageSize({ width: canvas.width, height: canvas.height });
    };
  }, [imageSrc]);

  useEffect(() => {
    createBlurredImage();
  }, [createBlurredImage]);

  // Calcular e ajustar o crop para manter o centro
  const adjustCropForZoom = useCallback(() => {
    if (imageSize.width && imageSize.height) {
      const cropWidth = 400;
      const cropHeight = 400;

      // Ajustar a posição do crop para manter o centro durante o zoom
      setCrop((prevCrop) => ({
        x:
          (imageSize.width - cropWidth) / 2 / imageSize.width -
          (1 - zoom) * (prevCrop.x - 0.5),
        y:
          (imageSize.height - cropHeight) / 2 / imageSize.height -
          (1 - zoom) * (prevCrop.y - 0.5),
      }));
    }
  }, [imageSize, zoom]);

  useEffect(() => {
    adjustCropForZoom();
  }, [zoom, adjustCropForZoom]);

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
    link.download = "cropped-image.png"; // Nome do arquivo que será baixado
    document.body.appendChild(link); // Adiciona o link ao DOM
    link.click();
    document.body.removeChild(link); // Remove o link do DOM
  };

  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      {/* Fundo com a imagem original desfocada e ampliada */}
      {blurredImage && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${blurredImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px)", // Adiciona o efeito de desfoque
            zIndex: 0, // Posiciona o fundo abaixo do Cropper
          }}
        />
      )}

      <div
        className="border-2 border-white/10 rounded-md"
        style={{
          backgroundImage: 'url("/images/theme-rubao-20.png")',
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 6,
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
        style={{
          containerStyle: {
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 3, // Mantém o cropper acima do fundo desfocado
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          mediaStyle: {
            objectFit: "cover", // Preenche o container com a imagem
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
            width: "400px",
            height: "400px",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 3, // Coloca a imagem cortada acima do fundo desfocado
          }}
        />
      )}

      {/* Botão de Download */}
      {croppedImage && (
        <button
          onClick={handleDownload}
          className="absolute -bottom-14 w-full bg-green-500 text-white p-2 border border-gray-600 rounded-sm"
          style={{ zIndex: 5 }} // Garantia de visibilidade do botão
        >
          Download
        </button>
      )}

      {/* Botão de Salvar */}
      <button
        onClick={handleSave}
        className="absolute -bottom-14 bg-sky-500 text-white p-2 border border-gray-600 w-full rounded-sm"
        style={{ zIndex: 4 }} // Garantia de visibilidade do botão
      >
        Salvar
      </button>
    </div>
  );
};

export default ImageCropper;
