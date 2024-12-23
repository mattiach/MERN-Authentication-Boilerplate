import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center flex-grow">
        <section className="flex items-center h-full p-16">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
              <h2 className="mb-4 font-extrabold text-8xl md:text-9xl">
                <span className="sr-only">Error</span>404
              </h2>
              <button className="w-64 py-1.5 text-xl font-semibold bg-primary rounded text-secondary">
                <Link href="/" className="flex justify-center">
                  Back to home
                </Link>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}