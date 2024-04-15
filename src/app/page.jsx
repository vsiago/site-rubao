"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { useInView } from "react-intersection-observer";
import { scroller } from "react-scroll";
import timelineData from "../../public/timeline.json"



export default function Home() {
  const [timeline, setTimeline] = useState([])

  const { ref, inView } = useInView({
    threshold: 0.5, // Quando 50% do elemento estiver visível
  });

  useEffect(() => {
    setTimeline(timelineData)
    console.log(timelineData)
  }, [])

  return (
    <main className="min-h-screen bg-[#D8DBE3] flex flex-col overflow-x-clip">
      <Header />
      {/* <Image
        width={55}
        height={55}
        className="absolute -right-[150px] top-[100px] w-full opacity-10"
        alt="logo B Bubão"
        src={require("../../public/logo-b.svg")}
      /> */}
      <section className=" h-[calc(100vh-100px)] w-full flex bg-gradient-to-br from-[#0E264A] via-[#0E3560] to-[#105F98] items-center md:items-start md:pt-40 ">
        <div
          ref={ref}
          className={`flex items-center w-full justify-center flex-col gap-6 md:flex-row-reverse md:container ${inView ? "" : ""
            }`}
        >
          <main className="px-8 w-full mt-36 mx-auto">
            <div className="flex items-baseline gap-3">
              <span className="animate text-[#0CC6F5] text-4xl font-semibold italic ml-[15px] -mr-2">
                Prefeito
              </span>
              <div className="">
                <Image
                  width={55}
                  height={55}
                  alt="logo B Bubão"
                  src={require("../../public/logo-b.svg")}
                  className="animate"
                />
              </div>
            </div>
            <p className="animate delay1 text-[#ffffff] text-8xl font-black italic">Rubão</p>
            <p className="animate delay2 text-[#98B2C0] text-2xl italic leading-7">
              Fiz e vou fazer <br></br>muito mais!
            </p>

            <a
              className="p-3 px-9 w-full border-2 border-[#0CC6F5] rounded-full font-bold text-base text-center gap-3 mt-16 flex items-center justify-center"
              onClick={() =>
                scroller.scrollTo("linha-do-tempo", {
                  smooth: true,
                  offset: 0, // Ajuste opcional para compensar a altura do cabeçalho
                })
              }
            >
              <div className="mt-2">
                <Image
                  width={35}
                  height={32}
                  alt="logo B Bubão"
                  src={require("../../public/arrow.svg")}
                />
              </div>
              <span>Linha do tempo</span>
            </a>
          </main>
        </div>
      </section>

      <div className="custom-shape-divider-bottom-1712845043">
        <main className="h-[100px] text-center bg-white flex items-center justify-center ">
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

      <section
        id="linha-do-tempo"
        className="min-h-screen bg-[#0E264A] p-7 py-14"
      >
        <p className="text-bold text-xl mt-10 text-[#799EBF]">Linha do tempo</p>

        <ul className="my-10 flex flex-col gap-3">
          {timeline.map((year, index) => (
            <li key={index} className="w-full p-5 border-2 border-[#23B3E0] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 border-[2px] border-white/50 rounded-full flex items-center justify-center">
                  <div className="w-[8px] h-[8px] bg-[#34CCFC] rounded-full"></div>
                </div>
                <span className="text-base text-bold">Ano de {year.year}</span>
              </div>
              <Image
                width={35}
                height={32}
                alt="logo B Bubão"
                src={require("../../public/arrow.svg")}
                className="translate-y-1"
              />
            </li>
          ))}
        </ul>
        <nav>
          <a>
            Plano de campanha
          </a>
        </nav>
      </section>
      <Footer />
    </main>
  );
}
// Tell Next.js to remount this component on every edit
// @refresh reset