import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Prefeito Rubao",
  description: "Prefeito do Município de Itaguaí.",
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="flex-1 bg-accent flex items-start pt-40">
        <div className=" flex items-center justify-center flex-col gap-6 md:flex-row-reverse md:container">
          <div className="w-full mx-auto">
            <Image
              src="/intro-manutencao.png"
              width={170}
              height={20}
              alt="Logo Rubao"
              className="w-full px-5 mx-auto max-w-[80%] md:hidden"
            />
            <Image
              src="/site-manutencao-bg.svg"
              width={170}
              height={20}
              alt="Logo Rubao"
              className="hidden pointer-events-none md:flex absolute top-50% right-0 w-[40%] transform -translate-y-1/2"
            />
          </div>
          <div className="text-center md:text-start ">
            <span className="uppercase text-lg font-semibold tracking-[4px] text-sky-400">
              Em breve:
            </span>
            <h1 className="text-5xl font-bold text-center md:text-start">
              Novo site!
            </h1>
            <p className=" text-center text-lg mx-4 text-slate-400 mt-8 mb-16 md:text-start md:text-2xl md:mx-0 md:pr-40">
              Estamos trabalhando para trazer um novo site, repleto de
              informações. Fiquem atentos para mais atualizações em breve!
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
