const createImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = url;
  });

const getCroppedImg = async (imageSrc, crop, zoom) => {
  try {
    const userImage = await createImage(imageSrc);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Configura o tamanho do canvas
    canvas.width = crop.width;
    canvas.height = crop.height;

    // Ajusta a escala e posição da imagem para garantir que ela não estique
    const scaleX = userImage.width / crop.width;
    const scaleY = userImage.height / crop.height;
    const scale = Math.min(scaleX, scaleY);

    const offsetX = (userImage.width - crop.width * scale) / 2;
    const offsetY = (userImage.height - crop.height * scale) / 2;

    ctx.drawImage(
      userImage,
      crop.x * scale,
      crop.y * scale,
      crop.width * scale,
      crop.height * scale,
      0,
      0,
      crop.width,
      crop.height
    );

    // Adiciona o efeito de blur no fundo (se necessário)
    ctx.filter = "blur(20px)";
    ctx.drawImage(userImage, 0, 0, crop.width, crop.height);

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
