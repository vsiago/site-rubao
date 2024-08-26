import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = ({ imageSrc }) => {
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [isSaving, setIsSaving] = useState(false); // Novo estado para rastrear o salvamento
  const cropperRef = useRef(null);
  const overlayImageSrc = "/images/frame-stories-rubao20.png"; // Substitua pelo caminho da sua imagem de overlay

  // Carregar a imagem e monitorar o estado de carregamento
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setLoading(false); // Carregamento concluído
    };
  }, [imageSrc]);

  // Função para salvar a imagem cortada
  const handleSave = async () => {
    setIsSaving(true); // Definir como salvando

    if (!cropperRef.current) return;

    const cropper = cropperRef.current.cropper;
    const croppedCanvas = cropper.getCroppedCanvas({
      width: 540,
      height: 960,
    });

    const blurredBackgroundUrl = await applyBlurBackground(imageSrc);
    const blurredBackgroundImg = new Image();
    blurredBackgroundImg.src = blurredBackgroundUrl;

    blurredBackgroundImg.onload = () => {
      const combinedCanvas = document.createElement("canvas");
      combinedCanvas.width = 540;
      combinedCanvas.height = 960;
      const ctx = combinedCanvas.getContext("2d");

      ctx.drawImage(blurredBackgroundImg, 0, 0, 540, 960);
      ctx.drawImage(croppedCanvas, 0, 0, 540, 960);

      const overlayImage = new Image();
      overlayImage.src = overlayImageSrc;
      overlayImage.onload = () => {
        ctx.drawImage(overlayImage, 0, 0, 540, 960);

        combinedCanvas.toBlob((blob) => {
          if (blob) {
            const croppedImageUrl = URL.createObjectURL(blob);
            setCroppedImage(croppedImageUrl);
            setIsSaving(false); // Definir como não salvando após conclusão
          }
        }, "image/png");
      };
    };
  };

  const handleDownload = () => {
    if (!croppedImage) return;
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = "image-with-overlay.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Função para criar uma imagem com efeito de desfoque
  const applyBlurBackground = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 540;
        canvas.height = 960;

        ctx.drawImage(img, 0, 0, 540, 960);
        ctx.filter = "blur(10px)";
        ctx.drawImage(canvas, 0, 0, 540, 960);

        resolve(canvas.toDataURL("image/png"));
      };
    });
  };

  return (
    <div className="relative w-[270px] h-[480px]">
      {loading ? (
        // Spinner de carregamento
        <div className="flex justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <Cropper
          src={imageSrc}
          style={{ height: "480px", width: "270px" }}
          aspectRatio={9 / 16}
          guides={false}
          ref={cropperRef}
          background={false}
          viewMode={0}
          minCropBoxHeight={480}
          minCropBoxWidth={270}
          minContainerWidth={270}
          minContainerHeight={480}
          minCanvasWidth={270}
          minCanvasHeight={480}
          dragMode="move"
          cropBoxResizable={false}
          cropBoxMovable={false}
        />
      )}

      {/* Adiciona o overlay diretamente sobre o Cropper */}
      <img
        src={overlayImageSrc}
        alt="Overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "270px",
          height: "480px",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Visualização da Imagem Cortada */}
      {croppedImage && (
        <div
          style={{
            backgroundImage: `url(${croppedImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "270px",
            height: "480px",
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
          className="absolute -bottom-20 w-full bg-green-500 border-2 hover:bg-green-200 hover:text-green-900 shadow-2xl hover:scale-110 border-green-100 text-white p-3 rounded-full transition-all duration-150 ease-in-out"
          style={{ zIndex: 5 }}
        >
          Download
        </button>
      )}

      {/* Botão de Salvar */}
      <button
        onClick={handleSave}
        className="absolute -bottom-20 bg-sky-500 border-2 border-sky-300 p-3 w-full rounded-full hover:bg-sky-200 text-white hover:text-blue-900 transition-all duration-150 ease-in-out"
        style={{ zIndex: 4 }}
        disabled={isSaving} // Desabilitar o botão durante o salvamento
      >
        {isSaving ? "Salvando..." : "Salvar"}
      </button>
    </div>
  );
};

export default ImageCropper;
