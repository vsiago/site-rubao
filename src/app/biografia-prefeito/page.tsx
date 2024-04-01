import Header from '@/components/Header'
import Footer from '@/components/Footer'
import IntroPage from "@/components/IntroPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProOnco - Quem Somos",
  description: "Transormando cuidado em cura.",
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
