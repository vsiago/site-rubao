"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { useInView } from "react-intersection-observer";
import { scroller } from "react-scroll";
import timelineData from "../../public/timeline.json";

export default function Home() {
  const [timeline, setTimeline] = useState([]);
  const [modalActiveIndex, setModalActiveIndex] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0.5, // Quando 50% do elemento estiver visível
  });

  useEffect(() => {
    setTimeline(timelineData);
    console.log(timelineData);
  }, []);

  const handleModal = (index) => {
    if (modalActiveIndex === index) {
      setModalActiveIndex(null);
    } else {
      setModalActiveIndex(index);
      console.log("Clicou no ano ", index);
    }
  };

  return (
    <>
      <Header />
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 brightness-50

"
      >
        <source src='/video/seq-rubao.mp4' type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
      <section className="flex-1 min-h-screen w-full flex flex-col bg-gradient-to-br from-[#005087]/80 via-[#005087] to-[#105F98] items-start justify-start md:items-start md:pt-40 ">
        <div
          ref={ref}
          className={`flex items-center w-full justify-center flex-col md:container flex-1 px-10 z-10${
            inView ? "" : ""
          }`}
        >
          <main className="w-full flex-1 flex flex-col justify-end md:justify-center">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="animate text-[#0CC6F5] text-4xl font-semibold italic ">
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
              <p className="animate delay1 text-[#ffffff] text-8xl font-black ">
                Rubão
              </p>
              <p className="animate delay1 text-[#ffffff] text-2xl  italic mt-3 tracking-wide">
                Por uma Itaguaí <br />
                ainda melhor.
              </p>
            </div>
            <a
              className="p-3 px-9 cursor-pointer w-full md:w-[50%] lg:w-[28%] border-2 border-[#0CC6F5] rounded-full font-bold text-base text-center gap-3 mt-16 flex items-center justify-center"
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
              <span className="text-white text-xl">Confira</span>
            </a>
          </main>
        </div>
        <div className="h-32 w-full"></div>
        <main className="h-[150px] text-center bg-gradient-to-t from-[#E2E6EC] to-[#E2E6EC]/0 flex w-full py-10 absolute bottom-0 left-0">
          <div className="container mx-auto flex items-center justify-center md:items-end md:justify-between">
            <p className="text-2xl text-white text-center md:-text-end hidden md:block">
              Itaguaí-RJ
            </p>
          </div>
        </main>
      </section>

{/* SECTION TIMELINE */}

      <section
        id="linha-do-tempo"
        className="min-h-screen flex flex-col  bg-[#E2E6EC] p-7 py-14"
      >
        <div className="md:container mx-auto flex flex-col flex-1 py-16  w-full">
          <p className="text-bold text-2xl mt-10 text-slate-600">
            Linha do tempo
          </p>

          <ul className="my-10 flex-1 flex flex-col md:flex-row  gap-3 w-full ">
            {timeline.map((year, index) => (
              <li
                key={index}
                className="w-full  h-full  pointer-events-auto cursor-pointer"
                onClick={() => handleModal(index)}
              >
                <div className=" pointer-events-auto">
                  <div
                    className={`${
                      modalActiveIndex === index
                        ? "border-x-2 border-t-2 bg-white/10"
                        : "border-2 rounded-b-xl"
                    } flex w-full justify-between p-5 items-center gap-4 bg-white/50 border-4 border-white rounded-t-xl`}
                  >
                    <div className="w-5 h-5 border-[2px] border-slate-500/20 rounded-full flex items-center justify-center">
                      <div className="w-[8px] h-[8px] bg-[#34CCFC] rounded-full"></div>
                    </div>
                    <span
                      className="text-base font-bold text-slate-800"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Ano de {year.year}
                    </span>
                    <Image
                      width={35}
                      height={32}
                      alt="logo B Bubão"
                      src={require("../../public/arrow.svg")}
                      className={`${
                        modalActiveIndex === index ? " rotate-180 " : ""
                      } transition-all 1s ease-in-out`}
                      onClick={(event) => event.stopPropagation()}
                    />
                  </div>
                  {modalActiveIndex === index && (
                    <ul
                      className={`flex flex-col gap-2 p-3 pb-6 bg-gradient-to-b from-slate-300/0 via-slate-600/10 to-slate-300/0  overflow-x-auto rounded-b-xl transition-[max-height] duration-500 ease-in-out ${
                        modalActiveIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                      style={{
                        maxHeight:
                          modalActiveIndex === index ? "1000px" : "0px",
                      }}
                    >
                      {year.events.map((event, eventIndex) => (
                        <li
                          key={eventIndex}
                          className="rounded-lg"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <div className="flex items-center gap-3 p-6">
                            <p className="text-slate-600 text-lg font-bold ">
                              {event.title}
                            </p>
                          </div>
                          <div className="bg-white/80 border-2 border-white -mt-4 rounded-3xl p-2 shadow-lg shadow-slate-900/10">
                            <div className="diff aspect-[16/9] rounded-t-2xl">
                              <div className="diff-item-1 h-full">
                                <div className="bg-primary flex  h-full text-9xl font-black">
                                  <Image
                                    src={event.fotoDepois}
                                    width={400}
                                    height={300}
                                    alt={event.title}
                                    className="h-full w-full brightness-125"
                                  />
                                </div>
                              </div>
                              <div className="diff-item-2">
                                <div className=" grid  text-9xl font-black">
                                  <Image
                                    src={event.fotoAntes}
                                    width={400}
                                    height={300}
                                    alt={event.title}
                                    className="h-full w-full grayscale absolute top-0 left-0"
                                  />
                                  <Image
                                    src={event.fotoAntes}
                                    width={400}
                                    height={300}
                                    alt={event.title}
                                    className="h-full w-full absolute top-0 left-0 opacity-40"
                                  />
                                </div>
                              </div>
                              <div className="diff-resizer">
                                <div className="bg-red-600 absolute top-20 left-0">
                                  OO
                                </div>
                              </div>
                            </div>

                            <div className="flex py-3">
                              <p className="text-slate-500 p-3 w-[70%]">
                                {event.description}
                              </p>
                              <div className=" w-[30%] p-3 flex ites-center justify-end">
                                <div className="w-12 h-12 bg-slate-300/50 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <nav>
            <a
              href="/biografia-prefeito"
              className="text-slate-700 h-16 w-full border-2 border-white flex items-center justify-center rounded-full bg-[#005087]/90"
            >
              <p className="text-white">Biografia</p>
            </a>
          </nav>
        </div>
      </section>
      <Footer />
    </>
  );
}
// Tell Next.js to remount this component on every edit
// @refresh reset
