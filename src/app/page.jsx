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
        className="absolute top-0 bottom-0 left-0 w-full h-screen object-cover opacity-20 z-10"
      >
        <source src="/video/seq-rubao.mp4" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
      <section className="relative flex-1 min-h-screen w-full flex flex-col bg-gradient-to-br from-[#005087]/80 via-[#005087] to-[#105F98] items-start justify-start md:items-start md:pt-40 ">
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
                ainda melhor
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
        <div class="custom-shape-divider-bottom-1723226387" className="">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* SECTION TIMELINE */}

      <section
        id="linha-do-tempo"
        className="min-h-screen flex flex-col  bg-[#E2E6EC] p-6 py-14"
      >
        <div className="md:container mx-auto flex flex-col flex-1   w-full">
          <p className="text-bold text-2xl mt-10 text-slate-600">
            Linha do tempo
          </p>

          <ul className="my-10 flex-1 flex flex-col md:flex-row  gap-3 w-full ">
            {timeline.map((year, index) => (
              <li
                key={index}
                className="w-full  h-full  pointer-events-auto "
                onClick={() => (handleModal(index), scroller.scrollTo("linha-do-tempo", {
                  smooth: true,
                  offset: 0, // Ajuste opcional para compensar a altura do cabeçalho
                }))}
                
              >
                <div className=" pointer-events-auto">
                  <div
                    className={`${
                      modalActiveIndex === index
                        ? " bg-gradient-to-r from-[#0DB4EE] to-[#005087] text-white"
                        : " rounded-b-xl border-2 border-white"
                    } flex w-full justify-between p-5 items-center gap-4 bg-white/50  rounded-t-xl`}
                  >
                    <div className="w-5 h-5 border-[2px] border-slate-500/20 rounded-full flex items-center justify-center">
                      <div className="w-[8px] h-[8px] bg-[#34CCFC] rounded-full"></div>
                    </div>
                    <span
                      className={`${
                        modalActiveIndex === index
                          ? " text-white"
                          : " text-slate-800"
                      } text-base font-bold `}
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
                    <>
                      {/* <div className=" h-32 bg-gradient-to-b from-slate-100 to-slate-100/0 absolute top-0 left-0 right-0 z-20"></div> */}
                      <ul
                        className={`flex relative flex-col gap-2 p-3 pb-6 bg-gradient-to-b from-slate-300/5 via-slate-600/10 to-slate-300/0  overflow-x-auto rounded-b-xl transition-[max-height] duration-500 ease-in-out ${
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
                            id={event.title}
                          >
                            <div className="flex items-center gap-3 p-6">
                              <p className="text-slate-600 text-lg font-bold ">
                                {event.title}
                              </p>
                            </div>
                            <div className="bg-white/80 border-2 border-white -mt-4 rounded-3xl p-2 shadow-lg shadow-slate-900/10">
                              <div className="diff aspect-[16/10] rounded-t-2xl diff-resizer.stopped">
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
                                      className="h-full w-full grayscale absolute top-0 left-0 "
                                    />
                                    <Image
                                      src={event.fotoAntes}
                                      width={400}
                                      height={300}
                                      alt={event.title}
                                      className="h-full w-full absolute top-0 left-0 opacity-20"
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
                                <div className=" w-[30%] flex items-end justify-start  flex-col  relative">
                                  <div className=" flex flex-col items-center">
                                  <div className="w-11 h-11 bg-slate-300/50 rounded-full cursor-pointer flex items-center justify-center ">
                                      <Image
                                        src="/images/icon-coracao.png"
                                        width={28}
                                        height={28}
                                        alt="Ícone curtir"
                                      />
                                  </div>
                                    <p className="text-slate-500  mt-1">Curtir</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
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
