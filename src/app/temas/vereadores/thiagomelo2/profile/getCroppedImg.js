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
    const overlayImage = await createImage("/images/profile-thiagomelo.png"); // Ajuste o caminho conforme necessário

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

export default getCroppedImg;
