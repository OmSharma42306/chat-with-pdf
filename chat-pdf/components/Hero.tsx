import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-24 px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Chat with your PDFs
      </h2>
      <p className="text-gray-600 max-w-xl mb-8">
        Upload any PDF and start asking questions. Built for AI learning with LangChain and vector search under the hood.
      </p>
      <Link href="/chat">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Get Started
        </button>
      </Link>
    </section>
  );
}
