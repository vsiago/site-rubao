"use client";
import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCropper from "../../../components/ImageCropper"; // Ajuste o caminho conforme necessário

const Profile = () => {
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
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#053C81]/90 to-[#003055] border">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-10 border">
        <div className="my-6">
          <p className="text-2xl md:text-4xl  font-semibold text-center">
            Personalize sua foto de perfil
          </p>
          <p className="text-center text-base font-light text-slate-400">
            Para um encaixe perfeito, recomendamos que a imagem seja quadrada.
          </p>
        </div>

        {/* Esconde o botão quando imageSrc está ativo */}
        {!imageSrc && (
          <div
            onClick={handleFileClick}
            className="w-64 h-12 flex p-3 items-center justify-center bg-sky-500 text-white cursor-pointer rounded-full border-2 border-white/20 hover:bg-white hover:text-blue-900 transition-all duration-200 hover:shadow-2xl"
          >
            <p>Selecione uma imagem</p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />

        {imageSrc && <ImageCropper imageSrc={imageSrc} />}
      </main>
      <Footer />
    </main>
  );
};

export default Profile;
