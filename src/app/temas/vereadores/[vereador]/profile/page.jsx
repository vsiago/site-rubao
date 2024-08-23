"use client";
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCropper from "./ImageCropper"; // Atualize o caminho conforme necessário
import Image from "next/image";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation"; // Alterado para useParams
import vereadoresData from "@/data/vereadores.json";

const Profile = () => {
  const { vereador } = useParams(); // Obtendo o parâmetro da URL
  const router = useRouter();
  const [vereadores, setVereadores] = useState({});

  useEffect(() => {
    // Carrega os dados do arquivo JSON
    setVereadores(vereadoresData);

    if (vereadores[vereador]) {
      router.replace(`/${vereador}`);
    } else {
      router.replace("/404"); // Redireciona para uma página 404 caso o vereador não exista
    }
  }, [vereador, router, vereadores]);

  return null; // Não renderiza nada enquanto redireciona
};

export default Profile;
