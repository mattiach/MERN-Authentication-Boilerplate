import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-52">
        <h2 className="text-4xl text-center opacity-30 select-none tracking-widest">Home Page</h2>
      </div>
    </>
  );
}
