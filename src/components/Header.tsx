"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const menuItems = [
    {
      nome: "Tema Foto Perfil",
      link: "/theme",
    },
    {
      nome: "Início",
      link: "/",
    },
    {
      nome: "Biografia do Prefeito",
      link: "/biografia-prefeito",
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolled = currentScrollPos > 0;

      setScrolled(isScrolled);

      if (currentScrollPos > prevScrollPos) {
        // Scrolling down
        setPrevScrollPos(currentScrollPos);
        setOpen(false);
      } else {
        // Scrolling up
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      className={`${
        scrolled
          ? "h-16 bg-sky-500 fixed top-0 flex w-full translate-y-0 duration-300 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-90"
          : "h-24 top-0  absolute"
      }   w-full z-[1000]`}
    >
      <nav className="min-h-full px-6 flex  w-full justify-between items-center md:container mx-auto ">
        <a href="/">
          <Image
            src="/rubao-logo-clara.svg"
            width={140}
            height={20}
            alt="Logo Rubao"
          />
        </a>
        {scrolled ? (
          <ul
            onClick={() => setOpen(!open)}
            className="md:hidden scale-150 flex h-10 w-10 flex-col items-center justify-center gap-[8px] cursor-pointer hover:bg-slate-950/40 rounded transition duration-150 ease-in hover:transform hover:scale-105"
          >
            <li
              className={`${
                open ? "transform rotate-45 absolute w-7" : "w-5"
              }  h-[3px] rounded-[2px] bg-white/50 transition duration-150 ease-in-out`}
            ></li>
            <li
              className={`${
                open ? "transform -rotate-45 absolute" : ""
              } w-7 h-[3px] rounded-[2px] bg-white transition duration ease-in-out`}
            ></li>
            <li
              className={`${
                open ? "transform -rotate-45 absolute w-3" : "w-5"
              }  h-[3px] rounded-[2px] bg-white/50 transition duration ease-in-out`}
            ></li>
          </ul>
        ) : (
          <ul
            onClick={() => setOpen(!open)}
            className="md:hidden scale-125 relative flex h-10 w-10 flex-col items-center justify-center gap-[8px] cursor-pointer hover:bg-slate-950/40 rounded transition duration-150 ease-in hover:transform hover:scale-105"
          >
            <li
              className={`${
                open ? "transform rotate-45 absolute w-7" : "w-5"
              }  h-[3px] rounded-[2px] bg-[#0DB2EE] transition duration-150 ease-in-out`}
            ></li>
            <li
              className={`${
                open ? "transform -rotate-45 absolute" : ""
              } w-7 h-[3px] rounded-[2px] bg-white transition duration ease-in-out`}
            ></li>
            <li
              className={`${
                open ? "transform -rotate-45 absolute w-3" : "w-5"
              }  h-[3px] rounded-[2px] bg-[#0CE7D5] transition duration ease-in-out`}
            ></li>
          </ul>
        )}

        <ul className="hidden md:flex gap-3">
          {menuItems.map((item, intex) => (
            <li key={item.nome}>
              <Link
                className={`${
                  scrolled ? "text-white" : ""
                } h-20 px-2 py-1 text-slate-400 active:text-sky-400 transition-all ease-linear duration-150`}
                href={item.link}
              >
                {item.nome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
