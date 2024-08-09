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
      <IntroPage Title="Quem Somos" />
      <Footer />
    </main>
  )
}

export default QuemSomos
