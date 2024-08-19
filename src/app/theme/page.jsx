"use client";
import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCropper from "../../components/ImageCropper"; // Ajuste o caminho conforme necessário

const Theme = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-10">
        <div
          onClick={handleFileClick}
          className="w-64 h-12 flex items-center justify-center bg-blue-500 text-white rounded cursor-pointer"
        >
          Selecione uma imagem
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        {imageSrc && <ImageCropper imageSrc={imageSrc} />}
      </main>
      <Footer />
    </main>
  );
};

export default Theme;
