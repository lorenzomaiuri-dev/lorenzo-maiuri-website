import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gray-800 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container-custom relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            TRANSFORMING COMPLEX DATA INTO TECH SOLUTIONS THAT GENERATE TANGIBLE
            RESULTS
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10">
            I combine advanced skills in artificial intelligence, software
            development, and data engineering to create technology solutions
            that optimize processes, reduce costs, and enhance your business.
          </p>
        </div>

        <div className="relative hidden md:inline-block bg-black text-black font-medium px-4 py-2 rounded-lg overflow-hidden shimmer-hover">
          <Link href="#services" className="block glow-button">
            DISCOVER MY SERVICES
          </Link>
        </div>
      </div>
    </section>
  );
}
