"use client";
import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCropper from "./ImageCropper"; // Ajuste o caminho conforme necessário
import Image from "next/image";

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
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#053C81]/90 to-[#003055]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-10 mb-20 mt-12">
        <div className="my-7">
          {!imageSrc && (
            <>
              <p className="text-3xl md:text-4xl  font-semibold text-center mb-10">
                Atualize sua foto <br className="md:hidden" /> de perfil
              </p>
              <div className="h-64 w-64   mx-auto">
                <Image
                  width={300}
                  height={300}
                  alt="Imagem perfil personalizada"
                  src="/images/thumb-carlaojj.png"
                  className="w-full h-full object-contain"
                />
              </div>
            </>
          )}
          <p className="text-xl md:text-2xl  font-semibold text-center">
            Carlão JJ + Rubão
          </p>
          <p className="text-center text-xs md:text-base font-light text-slate-400 mt-2">
            Recomendamos uma imagem <br className="md:hidden" /> quadrada 4:4
            para melhor encaixe.
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
