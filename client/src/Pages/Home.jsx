import Footer from "../Components/Footer";
import Buttons from "../Components/Home/Section1/buttons";
import Features from "../Components/Home/Section1/Features";
import HeroText from "../Components/Home/Section1/HeroText";

export default function Home() {
  return (
    <div className="text-white ">
      <HeroText />
      <Buttons />
      <div className="flex w-screen justify-between px-60 overflow-hidden">
        <Features />
        <Features />
        <Features />
      </div>
      <Footer />
    </div>
  );
}
