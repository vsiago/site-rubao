"use client"
import { useState } from "react";
import Image from "next/image";

export default function Header() {
    const [open, setOpen] = useState(false);

    const menuItems = [
        {
            nome: "Início",
            link: "/"
        },
        {
            nome: "Biografia do Prefeito",
            link: "/biografia-prefeito"
        },
        {
            nome: "Agenda e Eventos",
            link: "/agenda-e-eventos"
        },

    ];

    return (
        <header className="bg-accent">
            <nav className="h-24 px-6 flex justify-between items-center md:container mx-auto">
                <a href="/">
                    <Image
                        src="/rubao-logo-clara.png"
                        width={155}
                        height={20}
                        alt="Logo Rubao"
                    />
                </a>
                <ul
                    onClick={() => setOpen(!open)}
                    className="relative flex h-10 w-10 flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-700 rounded transition duration-150 ease-in hover:transform hover:scale-105"
                >
                    <li
                        className={`${open ? "transform rotate-45 absolute" : ""} w-6 h-[2px] rounded-[2px] bg-white transition duration-150 ease-in-out`}
                    ></li>
                    <li
                        className={`${open ? "transform -rotate-45 absolute" : ""} w-6 h-[2px] rounded-[2px] bg-white transition duration ease-in-out`}
                    ></li>
                </ul>
                <ul
                    className={`${open ? "bg-accent flex opacity-100 w-full h-[calc(100%-4rem)] left-0" : "w-full h-0"} absolute top-24 right-0 flex flex-col transition duration-200 ease-out opacity-0 flex-1`}
                >
                    {menuItems.map((item, index) => (
                        <li
                            key={item.nome}
                            style={{ transitionDelay: `${open ? index * 75 : 0}ms` }}
                            className={`px-6 ${open ? 'opacity-100 transform translate-x-0' : ' opacity-0 transform -translate-x-10'} transition-all ease-out duration-500`}
                        >
                            <a
                                className={`${open ? 'inline-block ml-0 pointer-events-auto transition ease-in py-6' : 'py-0 opacity-0 ml-6 hidden pointer-events-none'} text-slate-300 border-b-[1px] border-slate-700 w-full focus:text-white focus:font-semibold`}
                                href={`${item.link}`}
                            >
                                {item.nome}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
