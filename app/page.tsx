import { About, Contact, Hero, Projects } from "@/components";
import CanvasContainer from "@/features/experience/components/CanvasContainer";

export default function Home() {
  return (
    <>
      <CanvasContainer />
      <main className="relative z-[2]">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
