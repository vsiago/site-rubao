"use client";
import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCropper from "../../components/ImageCropper"; // Ajuste o caminho conforme necessário
import Image from "next/image";

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
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#053C81]/90  to-[#003055]">
      <Header />
      <main className="flex-1  flex flex-col items-center justify-center mt-40 md:mt-20">
        <p className="text-4xl my-10 font-semibold text-center">
          Personalize sua com temas do Rubão 20
        </p>
        <div className="container  flex flex-col gap-6 md:flex-row ">
          <a
            href="/theme/profile"
            className="h-80 w-full border-2 border-white bg-white/30 rounded-2xl shadow-xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out"
          >
            <div className=" h-[70%] w-full flex items-center justify-center">
              <div className="h-48 w-48 pt-4">
                <Image width={200} height={200} alt="Imagem perfil personalizada" src="/example-profile.png" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="bg-white h-[30%] w-full rounded-b-2xl flex items-center justify-start text-slate-700 p-8">
              <p className="text-2xl font-bold text-[#013360]">Perfil</p>
            </div>
          </a>
          <a
            href="#theme/stories"
            className="h-80 w-full border-2 border-white bg-white/30 rounded-2xl shadow-xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out"
          >
            <div className=" h-[70%] w-full flex items-center justify-center">
              <div className="h-48 w-48 pt-4">
                <Image width={200} height={200} alt="Imagem perfil personalizada" src="/example-profile.png" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="bg-white h-[30%] w-full rounded-b-2xl flex items-center justify-start text-slate-700 p-8">
              <p className="text-2xl font-bold text-[#013360]">Perfil</p>
            </div>
          </a>
          <a
            href="#theme/feed"
            className="h-80 w-full border-2 border-white bg-white/30 rounded-2xl shadow-xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out"
          >
            <div className=" h-[70%] w-full flex items-center justify-center">
              <div className="h-48 w-48 pt-4">
                <Image width={200} height={200} alt="Imagem perfil personalizada" src="/example-profile.png" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="bg-white h-[30%] w-full rounded-b-2xl flex items-center justify-start text-slate-700 p-8">
              <p className="text-2xl font-bold text-[#013360]">Perfil</p>
            </div>
          </a>
        </div>
      </main>
      <Footer />
    </main>
  );
};

export default Theme;
