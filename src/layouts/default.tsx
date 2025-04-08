import { Navbar } from "@/components/navbar";
import "@/styles/globals.css";
import "../styles/globals.css"; // if you're one level down

export default function DefaultLayout({
                                        children,
                                      }: {
  children: React.ReactNode;
}) {

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* 🎥 MP4 Video Background */}


      {/* 🧭 Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* 🧠 Scrollable content with padding for fixed header/footer */}
      <main className="pt-24 pb-20 px-6 container mx-auto max-w-7xl relative z-10">
        {children}
      </main>
    </div>
  );
}
