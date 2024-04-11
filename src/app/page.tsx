"use client";
import { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { ref, inView } = useInView({
    threshold: 0.5, // Quando 50% do elemento estiver visível
  });

  return (
    <main className="min-h-screen bg-[#D8DBE3] flex flex-col">
      <Header />
      <section className=" h-[calc(100vh-150px)] w-full flex bg-gradient-to-br from-[#0E264A] via-[#0E3560] to-[#105F98] items-center md:items-start md:pt-40 ">
        <div
          ref={ref}
          className={`flex items-center w-full justify-center flex-col gap-6 md:flex-row-reverse md:container ${
            inView ? "animate" : ""
          }`}
        >










          <main className="px-8 w-full mt-32 mx-auto">
            <div className="flex items-baseline gap-3">
              <span className="text-[#0CC6F5] text-4xl font-semibold italic ml-[24px]">
                Prefeito
              </span>
              <div className="border-2 border-[#0CC6F5] w-16 h-16 rounded-md"></div>
            </div>
            <p className="text-[#ffffff] text-8xl font-black italic">Rubão</p>
            <p className="text-[#98B2C0] text-2xl italic leading-7">
              Fiz e vou fazer <br></br>muito mais!
            </p>

            <a className="p-3 px-9 w-full border-2 border-[#0CC6F5] rounded-full font-bold text-base text-center gap-3 mt-16 flex items-center justify-center" href="#">
              <span className="bg-sky-500 h-6 w-6 rounded-sm block rotate-45"></span>
              <span>
              Linha do tempo
              </span>
            </a>

          </main>










        </div>
      </section>

      <div className="custom-shape-divider-bottom-1712845043">
        <main className="h-[150px] text-center bg-white flex items-center justify-center pb-5">
          <p className="text-lg text-slate-600 leading-5 rotate-180">
            Nunca foi Sorte, <br></br>sempre foi Deus!
          </p>
        </main>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <Footer />
    </main>
  );
}
