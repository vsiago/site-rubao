// app/temas/vereadores/[vereador]/profile/page.jsx

"use client";
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCropper from "./ImageCropper"; // Atualize o caminho conforme necessário
import Image from "next/image";
import Head from "next/head";
import { useParams } from "next/navigation"; // Alterado para useParams

// Dados do vereador, idealmente você deve buscar isso de um banco de dados ou API
const vereadores = {
  alexalves: {
    name: "Alex Alves",
    thumb: "thumb-alexalves.png",
    profile: "profile-alexalves.png",
  },
  amandinha: {
    name: "Amandinha Siqueira",
    thumb: "thumb-amandinha.png",
    profile: "profile-amandinha.png",
  },
  andreamorim: {
    name: "Andre Amorim",
    thumb: "thumb-andreamorim.png",
    profile: "profile-andreamorim.png",
  },
  andrearede: {
    name: "Andre Amorim",
    thumb: "thumb-andrearede.png",
    profile: "profile-andrearede.png",
  },
  arielydonipa: {
    name: "Ariely do Nipa",
    thumb: "thumb-arielydonipa.png",
    profile: "profile-arielydonipa.png",
  },
  bocaodoestrela: {
    name: "Bocão do Estrela",
    thumb: "thumb-bocaodoestrela.png",
    profile: "profile-bocaodoestrela.png",
  },
  carlaojj: {
    name: "Bocão do Estrela",
    thumb: "thumb-carlaojj.png",
    profile: "profile-carlaojj.png",
  },
  cemardamaquina: {
    name: "Cemar da Maquina",
    thumb: "thumb-cemardamaquina.png",
    profile: "profile-cemardamaquina.png",
  },
  cintiafernandes: {
    name: "Cintia Fernandes",
    thumb: "thumb-cintiafernandes.png",
    profile: "profile-cintiafernandes.png",
  },
  claudiorocha: {
    name: "Cláudio Rocha",
    thumb: "thumb-claudiorocha.png",
    profile: "profile-claudiorocha.png",
  },
  coxinhadopiranema: {
    name: "Coxinha do Piranema",
    thumb: "thumb-coxinhadopiranema.png",
    profile: "profile-coxinhadopiranema.png",
  },
  denisedadedicas: {
    name: "Denise da DêDicas",
    thumb: "thumb-denisedadedicas.png",
    profile: "profile-denisedadedicas.png",
  },
  drababi: {
    name: "Dra Babi",
    thumb: "thumb-drababi.png",
    profile: "profile-drababi.png",
  },
  dramariusa: {
    name: "Drª Mariusa",
    thumb: "thumb-dramariusa.png",
    profile: "profile-dramariusa.png",
  },
  dugel: {
    name: "Dugel",
    thumb: "thumb-dugel.png",
    profile: "profile-dugel.png",
  },
  elisagiovana: {
    name: "Elisa Giovana",
    thumb: "thumb-elisagiovana.png",
    profile: "profile-elisagiovana.png",
  },
  enfermeiramanu: {
    name: "Elisa Giovana",
    thumb: "thumb-enfermeiramanu.png",
    profile: "profile-enfermeiramanu.png",
  },
  fabinhoprime: {
    name: "Fabinho Prime",
    thumb: "thumb-fabinhoprime.png",
    profile: "profile-fabinhoprime.png",
  },
  fabinhotaciano: {
    name: "Fabinho Taciano",
    thumb: "thumb-fabinhotaciano.png",
    profile: "profile-fabinhotaciano.png",
  },
  genildogandra: {
    name: "Genildo Gandra",
    thumb: "thumb-genildogandra.png",
    profile: "profile-genildogandra.png",
  },
  guilhermefarias: {
    name: "Guilherme Farias",
    thumb: "thumb-guilhermefarias.png",
    profile: "profile-guilhermefarias.png",
  },
  haroldojesus: {
    name: "Haroldo Jesus",
    thumb: "thumb-haroldojesus.png",
    profile: "profile-haroldojesus.png",
  },
  ivanzinho: {
    name: "Ivanzinho",
    thumb: "thumb-ivanzinho.png",
    profile: "profile-ivanzinho.png",
  },
  jocimar: {
    name: "Jocimar do Cartório",
    thumb: "thumb-jocimar.png",
    profile: "profile-jocimar.png",
  },
  julinho: {
    name: "Julinho",
    thumb: "thumb-julinho.png",
    profile: "profile-julinho.png",
  },
  karinebrandao: {
    name: "Drª Karine Brandão",
    thumb: "thumb-karinebrandao.png",
    profile: "profile-karinebrandao.png",
  },
  marilanedasaude: {
    name: "Marilane da Saúde",
    thumb: "thumb-marilanedasaude.png",
    profile: "profile-marilanedasaude.png",
  },
  michelisobral: {
    name: "Michele Sobral",
    thumb: "thumb-michelisobral.png",
    profile: "profile-michelisobral.png",
  },
  nandorodrigues: {
    name: "Nando Rodrigues",
    thumb: "thumb-nandorodrigues.png",
    profile: "profile-nandorodrigues.png",
  },
  nilceramos: {
    name: "Nilce Ramos",
    thumb: "thumb-nilceramos.png",
    profile: "profile-nilceramos.png",
  },
  patybumerangue: {
    name: "Paty Bumerangue",
    thumb: "thumb-patybumerangue.png",
    profile: "profile-patybumerangue.png",
  },
  paulinhadositio: {
    name: "Paulinha do Sítio",
    thumb: "thumb-paulinhadositio.png",
    profile: "profile-paulinhadositio.png",
  },
  pimpo: {
    name: "Pimpo",
    thumb: "thumb-pimpo.png",
    profile: "profile-pimpo.png",
  },
  rachelsecundo: {
    name: "Rachel Secundo",
    thumb: "thumb-rachelsecundo.png",
    profile: "profile-rachelsecundo.png",
  },
  rafaelquima: {
    name: "Rafael Quima",
    thumb: "thumb-rafaelquima.png",
    profile: "profile-rafaelquima.png",
  },
  renatoandrade: {
    name: "Renato Andrade",
    thumb: "thumb-renatoandrade.png",
    profile: "profile-renatoandrade.png",
  },
  robsonkadosh: {
    name: "Robson Kadosh",
    thumb: "thumb-robsonkadosh.png",
    profile: "profile-robsonkadosh.png",
  },
  sandrodaheminio: {
    name: "Sandro da Hermínio",
    thumb: "thumb-sandrodaheminio.png",
    profile: "profile-sandrodaheminio.png",
  },
  selminhadasaude: {
    name: "Selminha da Saúde",
    thumb: "thumb-selminhadasaude.png",
    profile: "profile-selminhadasaude.png",
  },
  thiagomelo: {
    name: "Thiago Melo",
    thumb: "thumb-thiagomelo.png",
    profile: "profile-thiagomelo.png",
  },
  tonhaojacare: {
    name: "Tonhão Jacaré",
    thumb: "thumb-tonhaojacare.png",
    profile: "profile-tonhaojacare.png",
  },
  valtinho: {
    name: "Valtinho",
    thumb: "thumb-valtinho.png",
    profile: "profile-valtinho.png",
  },
  viniciusalves: {
    name: "Vinícius Alves",
    thumb: "thumb-viniciusalves.png",
    profile: "profile-viniciusalves.png",
  },
  williancezar: {
    name: "Willian Cezar",
    thumb: "thumb-williancezar.png",
    profile: "profile-williancezar.png",
  },
  zecadoestrela: {
    name: "Zeca do Estrela",
    thumb: "thumb-zecadoestrela.png",
    profile: "profile-zecadoestrela.png",
  },
  zedomingos: {
    name: "Zé Domingos",
    thumb: "thumb-zedomingos.png",
    profile: "profile-zedomingos.png",
  },
  zeze: {
    name: "Zezé",
    thumb: "thumb-zeze.png",
    profile: "profile-zeze.png",
  },
  zoia: {
    name: "Dr Zóia",
    thumb: "thumb-zoia.png",
    profile: "profile-zoia.png",
  },
};

const Profile = () => {
  const { vereador } = useParams(); // Obtendo o parâmetro da URL

  const vereadorData = vereadores[vereador] || {};
  const { name, thumb, profile } = vereadorData;

  const [imageSrc, setImageSrc] = useState(null);
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
              <div className="h-64 w-64 mx-auto">
                <Image
                  width={300}
                  height={300}
                  alt="Imagem perfil personalizada"
                  src={`/images/${thumb}`}
                  className="w-full h-full object-contain"
                />
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
