import Header from '@/components/Header'
import Footer from '@/components/Footer'
import IntroPage from "@/components/IntroPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prefeito Rubao",
  description: "Prefeito do Município de Itaguaí.",
};

function QuemSomos() {
  return (
    <main className='min-h-screen flex flex-col'>
      <Header />
      <IntroPage Title="Quem Somos" />
      <Footer />
    </main>
  )
}

export default QuemSomos
