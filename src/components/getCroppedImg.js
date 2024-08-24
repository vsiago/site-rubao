const createImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = url;
  });

const getCroppedImg = async (imageSrc, crop) => {
  try {
    // Carrega a imagem do usuário
    const userImage = await createImage(imageSrc);

    // Carrega a imagem de overlay
    const overlayImage = await createImage("/images/theme-rubao-20.png"); // Ajuste o caminho conforme necessário

    // Cria um canvas para a imagem original
    const originalCanvas = document.createElement("canvas");
    const originalCtx = originalCanvas.getContext("2d");
    originalCanvas.width = userImage.width;
    originalCanvas.height = userImage.height;

    // Desenha a imagem original no canvas
    originalCtx.drawImage(userImage, 0, 0);

    // Cria um canvas para o recorte
    const cropCanvas = document.createElement("canvas");
    const cropCtx = cropCanvas.getContext("2d");
    cropCanvas.width = crop.width;
    cropCanvas.height = crop.height;

    // Desenha a parte recortada da imagem original no canvas de recorte
    cropCtx.drawImage(
      originalCanvas,
      crop.x, // Coordenada X do recorte na imagem original
      crop.y, // Coordenada Y do recorte na imagem original
      crop.width, // Largura do recorte
      crop.height, // Altura do recorte
      0, // Coordenada X na canvas de recorte
      0, // Coordenada Y na canvas de recorte
      crop.width, // Largura na canvas de recorte
      crop.height // Altura na canvas de recorte
    );

    // Adiciona a imagem de overlay
    if (overlayImage) {
      cropCtx.drawImage(overlayImage, 0, 0, crop.width, crop.height);
    }

    // Converte o canvas de recorte para uma URL de objeto (Blob URL)
    return new Promise((resolve) => {
      cropCanvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, "image/png");
    });
  } catch (error) {
    console.error("Erro ao recortar imagem:", error);
    throw error;
  }
};

export default getCroppedImg;
