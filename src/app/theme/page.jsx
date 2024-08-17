"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCropper from "../../components/ImageCropper"; // Ajuste o caminho conforme necessário

const Theme = () => {
  const [imageSrc, setImageSrc] = useState(null);

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
      <main className="flex-1 flex flex-col items-center justify-center">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageSrc && <ImageCropper imageSrc={imageSrc} />}
      </main>
      <Footer />
    </main>
  );
};

export default Theme;
