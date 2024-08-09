import React from 'react';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import IntroPage from "@/components/IntroPage";

type ComponentProps = {
  name?: string;
  children?: React.ReactNode;
  isVisible?: boolean;
  age?: number;
  variant?: "primary" | "secondary";
  data: Array<{ name: string }>
}

const Component = ({ name, age, isVisible, variant }: ComponentProps) => {
  return (
    <>
      <h2>Component, {name}</h2>
      <p>{variant}</p>
    </>
  )
}

function QuemSomos() {
  const data = [{ name: "Maria" }]

  return (
    <main className='min-h-screen flex flex-col'>
      <Header />
      <IntroPage Title="Rubem Vieira de Souza, conhecido como Dr. Rubão, desempenhou um papel de destaque como vereador e presidente da Câmara Municipal de Itaguaí entre 2017 e 2020. Em 2020, com uma trajetória marcada pela transparência e dedicação ao serviço público, lançou-se na disputa para prefeito. Eleito com o apoio da população, Dr. Rubão assumiu o cargo em janeiro de 2021, comprometendo-se a liderar Itaguaí com uma gestão responsável, transparente e focada no desenvolvimento sustentável da cidade." />
      <Footer />
    </main>
  )
}

export default QuemSomos
