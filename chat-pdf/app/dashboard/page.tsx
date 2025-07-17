import Head from "next/head";
import Header from "../../components/Header";
import Hero from "../../components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>ChatPDF AI</title>
        <meta name="description" content="Chat with your PDFs using AI" />
      </Head>
      <main className="min-h-screen bg-gray-50 text-gray-800">
        <Header />
        <Hero />
      </main>
    </>
  );
}
