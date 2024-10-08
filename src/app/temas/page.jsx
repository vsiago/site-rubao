"use client";
import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCropper from "../../components/ImageCropper"; // Ajuste o caminho conforme necessário
import Image from "next/image";
import Link from "next/link";

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
        <p className="text-3xl md:text-4xl my-10 font-semibold text-center">
          Personalize sua foto com <br className="md:hidden" /> temas do Rubão
          20
        </p>
        <div className="container  flex flex-col gap-6 gap-y-12 md:flex-row ">
          <Link
            href="/temas/profile"
            className="h-60 w-full bg-white/30 rounded-2xl shadow-xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out"
          >
            <div className=" h-[85%] w-full flex items-center justify-center">
              <div className="h-44 w-44 pt-4">
                <Image
                  width={200}
                  height={200}
                  alt="Imagem perfil personalizada"
                  src="/example-profile.png"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="bg-white h-[15%] w-full rounded-b-2xl flex items-center justify-start text-slate-700 p-8">
              <p className="text-2xl font-bold text-[#013360]">Perfil</p>
              <span className="font-normal italic text-lg text-green-500 ml-3">
                {"Disponível"}
              </span>
            </div>
          </Link>
          <Link
            href="/temas/stories"
            className=" h-60 w-full  bg-white/30 rounded-2xl shadow-xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out"
          >
            <div className=" h-[85%] w-full flex items-center justify-center">
              <div className="h-44 w-44 pt-4">
                <Image
                  width={200}
                  height={200}
                  alt="Imagem perfil personalizada"
                  src="/example-storie.png"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="bg-white h-[15%] w-full rounded-b-2xl flex items-center justify-start text-slate-700 p-8">
              <p className="text-2xl font-bold text-[#013360]">Stories</p>
              <span className="font-normal italic text-lg text-green-500 ml-3">
                {"Disponível"}
              </span>
            </div>
          </Link>
          <Link
            href="/temas/feed"
            className=" mb-16 h-60 w-full bg-white/30 rounded-2xl shadow-xl hover:drop-shadow-2xl transition-all duration-200 ease-in-out"
          >
            <div className=" h-[85%] w-full flex items-center justify-center">
              <div className="h-44 w-44 pt-4">
                <Image
                  width={200}
                  height={200}
                  alt="Imagem perfil personalizada"
                  src="/example-feed.png"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="bg-white h-[15%] w-full rounded-b-2xl flex items-center justify-start text-slate-700 p-8">
              <p className="text-2xl font-bold text-[#013360]">Feed</p>
              <span className="font-normal italic text-lg text-green-500 ml-3">
                {"Disponível"}
              </span>
            </div>
          </Link>
        </div>
        <div className="container w-full mb-20">
          <Link
            href="/vereadores"
            className=" border-2 border-[#FFF000] block w-full p-4 rounded-full text-center"
          >
            <p>Encontrar por vereador</p>
          </Link>
        </div>
      </main>
      <Footer />
    </main>
  );
};

export default Theme;
