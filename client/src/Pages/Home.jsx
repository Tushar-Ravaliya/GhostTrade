import Footer from "../Components/Footer";
import Buttons from "../Components/Home/Section1/buttons";
import Features from "../Components/Home/Section1/Features";
import HeroText from "../Components/Home/Section1/HeroText";

export default function Home() {
  return (
    <div className="text-white ">
      <HeroText />
      <Buttons />
      <div className="flex flex-wrap justify-center gap-12 w-full max-w-5xl mx-auto px-8 py-10">
        <Features />
        <Features />
        <Features />
      </div>
    </div>
  );
}
