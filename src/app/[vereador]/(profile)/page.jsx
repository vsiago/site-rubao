"use client";
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCropper from "./ImageCropper"; // Atualize o caminho conforme necessário
import Image from "next/image";
import Head from "next/head";
import { useParams } from "next/navigation"; // Alterado para useParams
import vereadores from "@/data/vereadores.json";
import { FiCopy } from "react-icons/fi"; // Importar um ícone de copiar

const Profile = () => {
  const { vereador } = useParams(); // Obtendo o parâmetro da URL

  const vereadorData = vereadores[vereador] || {};
  const { name, thumb, profile } = vereadorData;

  const [imageSrc, setImageSrc] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false); // Estado para a mensagem de confirmação
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (name) {
      document.title = `Dr. Rubão e ${name}`; // Configura o título da aba do navegador
    }
  }, [name]);

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

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Ocultar mensagem após 2 segundos
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  if (!name) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#053C81]/90 to-[#003055]">
        <p className="text-xl">Vereador não encontrado.</p>
      </main>
    );
  }

  const nameDownload = `Dr Rubão ${name}`;

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#053C81]/90 to-[#003055]">
      <Head>
        <title>Troque a foto do seu perfil com {name}</title>
        <meta
          property="og:image"
          content={`https://www.drrubao.com.br/images/${thumb}`}
        />
        <meta
          property="og:title"
          content={`Troque a foto do seu perfil com ${name}`}
        />
        <meta property="og:description" content={`Perfil de ${name}`} />
        <meta property="og:url" content={`https://example.com/profile`} />
        <meta property="og:type" content="profile" />
      </Head>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-10 mb-20 mt-12">
        <div className="my-7">
          {!imageSrc && (
            <>
              <p className="text-3xl md:text-4xl font-semibold text-center mb-10">
                Atualize sua foto <br className="md:hidden" /> de perfil
              </p>
              <div className="relative h-64 w-64 mx-auto">
                <Image
                  width={300}
                  height={300}
                  alt="Imagem perfil personalizada"
                  src={`/images/${thumb}`}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={handleCopyClick}
                  className="absolute top-0 -right-3 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
                >
                  <FiCopy size={28} />
                </button>
                {copySuccess && (
                  <span className="absolute top-12 right-0 p-2 bg-green-500 text-white rounded-md shadow-lg">
                    Link copiado!
                  </span>
                )}
              </div>
            </>
          )}
          <p className="text-xl md:text-2xl font-semibold text-center">
            {name} + Rubão
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

        {imageSrc && (
          <ImageCropper
            imageSrc={imageSrc}
            downloadFileName={nameDownload}
            backgroundImageUrl={`/images/${profile}`}
          />
        )}
      </main>
      <Footer />
    </main>
  );
};

export default Profile;
