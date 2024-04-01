import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Prefeito Rubão",
  description: "Transormando cuidado em cura.",
  themeColor: "red",
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="flex-1 bg-accent flex items-center justify-center flex-col gap-6">
        <Image
          src="/intro-manutencao.png"
          width={170}
          height={20}
          alt="Logo Rubao"
          className="w-full px-5"
        />
    <div className="text-center">
    <span className="uppercase text-lg font-semibold tracking-[4px] text-sky-400">Em breve:</span>
        <h1 className="text-5xl font-bold text-center">
          Novo site!
        </h1>
        <p className="max-w-[80%] text-center mx-auto text-slate-400 mt-8 mb-16">Estamos trabalhando para trazer um novo site, repleto de informações.
 
 Fiquem atentos para mais atualizações em breve!</p>
    </div>
      </section>
      <Footer />
    </main>
  );
}
