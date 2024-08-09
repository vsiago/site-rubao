import { NextPage } from "next";

interface IntroPageProps {
  Title: string;
}

const IntroPage: NextPage<IntroPageProps> = ({ Title }) => {
  return (
    <section className='flex-1 bg-accent flex items-center justify-center px-10'>
      <h1 className='text-lg text-slate-400'>{Title}</h1>
    </section>
  )
}

export default IntroPage
