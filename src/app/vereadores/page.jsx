import Header from "@/components/Header";
import Footer from "@/components/Footer";
import vereadores from "@/data/vereadores.json"; // Adjust the path if needed
import Link from "next/link";
import Image from "next/image";

export default function Vereadores() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#053C81]/90 to-[#003055]">
      <Header />
      <div className="h-28"></div>
      <p className="text-3xl md:text-4xl font-semibold text-center my-6">
        Personalize com o seu vereador <br className="md:hidden" /> e Dr Rubão
      </p>
      <div className="flex-1 container mx-auto p-4 mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.keys(vereadores).map((vereador) => (
            <Link
              href={`/${vereador}`}
              key={vereador}
              className="flex flex-col items-center bg-white/50 border border-white rounded-lg shadow-lg p-4 hover:bg-gray-200 transition-colors"
            >
              <Image
                src={`/images/${vereadores[vereador].thumb}`}
                alt={vereadores[vereador].name}
                className="w-full h-32 object-contain rounded-md"
                width={200}
                height={200}
              />
              <span className="mt-2 text-center text-slate-800 font-semibold">
                {vereadores[vereador].name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
