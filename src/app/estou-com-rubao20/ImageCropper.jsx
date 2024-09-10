import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = ({ imageSrc }) => {
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);
  const overlayImageSrc = "/theme-estou-com-rubao20.png"; // Substitua pelo caminho da sua imagem de overlay
  const [overlayLoaded, setOverlayLoaded] = useState(false);

  // Função para criar uma imagem com efeito de desfoque
  const applyBlurBackground = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 400;
        canvas.height = 400;

        ctx.drawImage(img, 0, 0, 400, 400);
        ctx.filter = "blur(10px)";
        ctx.drawImage(canvas, 0, 0, 400, 400);

        resolve(canvas.toDataURL("image/png"));
      };
    });
  };

  // Função para salvar a imagem cortada
  const handleSave = async () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current.cropper;
    const croppedCanvas = cropper.getCroppedCanvas({
      width: 400,
      height: 400,
    });

    const blurredBackgroundUrl = await applyBlurBackground(imageSrc);
    const blurredBackgroundImg = new Image();
    blurredBackgroundImg.src = blurredBackgroundUrl;

    blurredBackgroundImg.onload = () => {
      const combinedCanvas = document.createElement("canvas");
      combinedCanvas.width = 400;
      combinedCanvas.height = 400;
      const ctx = combinedCanvas.getContext("2d");

      ctx.drawImage(blurredBackgroundImg, 0, 0, 400, 400);
      ctx.drawImage(croppedCanvas, 0, 0, 400, 400);

      const overlayImage = new Image();
      overlayImage.src = overlayImageSrc;
      overlayImage.onload = () => {
        ctx.drawImage(overlayImage, 0, 0, 400, 400);

        combinedCanvas.toBlob((blob) => {
          if (blob) {
            const croppedImageUrl = URL.createObjectURL(blob);
            setCroppedImage(croppedImageUrl);
          }
        }, "image/png");
      };
    };
  };

  const handleDownload = () => {
    if (!croppedImage) return;
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = "estou-com-rubao20.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Função para lidar com o carregamento da imagem de overlay
  useEffect(() => {
    const img = new Image();
    img.src = overlayImageSrc;
    img.onload = () => setOverlayLoaded(true);
  }, []);

  return (
    <div className="relative w-[400px] h-[400px]">
      <Cropper
        src={imageSrc}
        style={{ height: "400px", width: "400px" }}
        aspectRatio={1}
        guides={false}
        ref={cropperRef}
        background={false}
        viewMode={0}
        minCropBoxHeight={400}
        minCropBoxWidth={400}
        minContainerWidth={400}
        minContainerHeight={400}
        minCanvasWidth={100}
        minCanvasHeight={100}
        minZoomRatio={0}
        dragMode="move"
        cropBoxResizable={false}
        cropBoxMovable={false}
      />

      {/* Adiciona o overlay diretamente sobre o Cropper */}
      {overlayLoaded && (
        <img
          src={overlayImageSrc}
          alt="Overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "400px",
            height: "400px",
            objectFit: "cover",
            pointerEvents: "none", // Permite interações com o Cropper
            zIndex: 1, // Fica atrás da visualização da imagem cortada
          }}
        />
      )}

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
          className="absolute -bottom-16 w-full bg-green-500 border-2 hover:bg-green-200 hover:text-green-900 shadow-2xl hover:scale-110 border-green-100 text-white p-3 rounded-full transition-all duration-150 ease-in-out"
          style={{ zIndex: 5 }}
        >
          Download
        </button>
      )}

      {/* Botão de Salvar */}
      <button
        onClick={handleSave}
        className="absolute -bottom-16 bg-sky-500 border-2 border-sky-300 p-3 w-full rounded-full hover:bg-sky-200 text-white hover:text-blue-900 transition-all duration-150 ease-in-out"
        style={{ zIndex: 4 }}
      >
        Salvar
      </button>
    </div>
  );
};

export default ImageCropper;
