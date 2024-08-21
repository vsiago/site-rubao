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
      nome: "Início",
      link: "/",
    },
    {
      nome: "Biografia",
      link: "/biografia-prefeito",
    },
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
            src="/logo-rubao-2024.svg"
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
            className="md:hidden  relative flex h-10 w-10 flex-col items-center justify-center gap-[6px] cursor-pointer hover:bg-slate-950/40 rounded transition duration-150 ease-in hover:transform hover:scale-105"
          >
            <li
              className={`${
                open ? "transform rotate-45 absolute w-7" : "w-5"
              }  h-[4px] rounded-[2px] bg-[#FFF000] transition duration-150 ease-in-out`}
            ></li>
            <li
              className={`${
                open ? "transform -rotate-45 absolute" : ""
              } w-7 h-[4px] rounded-[2px] bg-white transition duration ease-in-out`}
            ></li>
            <li
              className={`${
                open ? "transform -rotate-45 absolute w-3" : "w-5"
              }  h-[4px] rounded-[2px] bg-[#0CE7E7] transition duration ease-in-out`}
            ></li>
          </ul>
        )}
        <ul
          className={`${
            open
              ? "bg-gradient-to-br from-[#0E264A] via-[#0E3560] to-[#105F98] flex opacity-100 w-full h-screen left-0 absolute z-[1000]"
              : "w-full h-0"
          } fixed ${
            scrolled ? "top-16" : "top-20"
          } right-0 flex flex-col transition duration-200 ease-out opacity-0 flex-1`}
        >
          {menuItems.map((item, index) => (
            <li
              key={item.nome}
              style={{ transitionDelay: `${open ? index * 70 : 0}ms` }}
              className={`px-6 ${
                open
                  ? "opacity-100 transform translate-x-0 "
                  : "opacity-0 transform -translate-x-10"
              } transition-all ease-out duration-500`}
            >
              <a
                className={`${
                  open
                    ? "inline-block ml-0 pointer-events-auto transition ease-in py-6"
                    : "py-0 opacity-0 ml-6 hidden pointer-events-none"
                } text-white border-b-[1px] border-slate-950/40 w-full hover:text-white focus:font-semibold`}
                href={`${item.link}`}
              >
                {item.nome}
              </a>
            </li>
          ))}
          {open ? (
            <Link
              href="/temas"
              className="ml-3 bg-[#FFF000] rounded-full p-2 px-4 hover:bg-white transition-all ease-in-out duration-200"
            >
              <p className="text-blue-950 font-bold">Temas</p>
            </Link>
          ) : (
            ""
          )}
        </ul>
        <ul className="hidden md:flex gap-3 items-center">
          {menuItems.map((item, intex) => (
            <li key={item.nome}>
              <Link
                className={`${
                  scrolled ? "text-white" : ""
                } h-20 px-2 py-1 text-white hover:text-sky-400 transition-all ease-linear duration-150`}
                href={item.link}
              >
                {item.nome}
              </Link>
            </li>
          ))}
          <Link
            href="/temas"
            className="ml-3 bg-[#FFF000] rounded-full p-2 px-4 hover:bg-white transition-all ease-in-out duration-200"
          >
            <p className="text-blue-950 font-bold">Temas</p>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
