import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: "ProOnco - Inicio",
    description: "Transormando cuidado em cura.",
    themeColor: "red"
};

export default function Home() {
    return (
        <main className='min-h-screen flex flex-col'>
            <Header />
            <section className='flex-1 bg-accent flex items-center justify-center'>
                {/* <h1 className='text-4xl font-display font-black line-clamp-3'>Excelência em Gestão Hospitalar Oncológica</h1> */}
            </section>
            <Footer />
        </main>
    );
}
