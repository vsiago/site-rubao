import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = ({ imageSrc }) => {
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);

  // Função para criar uma imagem com efeito de desfoque
  const applyBlurBackground = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.crossOrigin = "Anonymous"; // Permite o uso de imagens de diferentes origens
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 400;
        canvas.height = 400;

        // Desenha a imagem no canvas
        ctx.drawImage(img, 0, 0, 400, 400);

        // Aplica o filtro de desfoque
        ctx.filter = "blur(10px)"; // Ajuste o valor do desfoque conforme necessário
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
      // Cria um novo canvas para combinar a imagem cortada e a sobreposição
      const combinedCanvas = document.createElement("canvas");
      combinedCanvas.width = 400;
      combinedCanvas.height = 400;
      const ctx = combinedCanvas.getContext("2d");

      // Desenha a imagem de fundo desfocada
      ctx.drawImage(blurredBackgroundImg, 0, 0, 400, 400);

      // Desenha a imagem cortada por cima do fundo desfocado
      ctx.drawImage(croppedCanvas, 0, 0, 400, 400);

      // Converte o canvas combinado em uma URL de objeto (Blob URL)
      combinedCanvas.toBlob((blob) => {
        if (blob) {
          const croppedImageUrl = URL.createObjectURL(blob);
          setCroppedImage(croppedImageUrl);
        }
      }, "image/png");
    };
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
      <Cropper
        src={imageSrc}
        style={{ height: "400px", width: "400px" }} // Garante que o cropper ocupe toda a área de 400x400px
        aspectRatio={1}
        guides={false}
        ref={cropperRef}
        background={false} // Remove o fundo padrão do Cropper
        viewMode={0} // Permite que a imagem fique menor do que a área de corte
        minCropBoxHeight={100} // Altura mínima da caixa de corte
        minCropBoxWidth={100} // Largura mínima da caixa de corte
        minContainerWidth={400} // Largura mínima do contêiner
        minContainerHeight={400} // Altura mínima do contêiner
        minCanvasWidth={100} // Largura mínima da imagem no canvas
        minCanvasHeight={100} // Altura mínima da imagem no canvas
        minZoomRatio={0.5} // Permite zoom out até 50% do tamanho original
        dragMode="move" // Modo de arrastar a imagem
        cropBoxResizable={false} // Desabilita redimensionamento da área de corte
        cropBoxMovable={false} // Desabilita mover a área de corte
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
          className="absolute -bottom-16 w-full bg-green-500 border-2 hover:bg-green-200 hover:text-green-900 shadow-2xl hover:scale-110 border-green-100 text-white p-3 rounded-full transition-all duration-150 ease-in-out"
          style={{ zIndex: 5 }} // Garantia de visibilidade do botão
        >
          Download
        </button>
      )}

      {/* Botão de Salvar */}
      <button
        onClick={handleSave}
        className="absolute -bottom-16 bg-sky-500 border-2 border-sky-300 p-3 w-full rounded-full hover:bg-sky-200 text-white hover:text-blue-900 transition-all duration-150 ease-in-out"
        style={{ zIndex: 4 }} // Garantia de visibilidade do botão
      >
        Salvar
      </button>
    </div>
  );
};

export default ImageCropper;
