import Footer from "../Components/Footer";
import Buttons from "../Components/Home/Section1/buttons";
import Features from "../Components/Home/Section1/Features";
import HeroText from "../Components/Home/Section1/HeroText";
import { Shield  } from "lucide-react";
import ProfitStocks from "../Components/Home/Section2/ProfitStocks";
import LossStocks from "../Components/Home/Section2/LossStocks";
export default function Home() {

  const f = [
    {
      icon: '<Shield />',
      text1: "Secure Treads",
      text2: "End-to-end protection",
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
      text1: "Secure Treads",
      text2: "End-to-end protection",
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
      text1: "Secure Treads",
      text2: "End-to-end protection",
    }
  ];


  return (
    <div className="text-white ">
      <HeroText />
      <Buttons />
      <div className="flex flex-wrap justify-center gap-36 w-full max-w-5xl mx-auto px-8 py-10">
        {f.map((fe)=>(<Features icon={fe.icon} text1={fe.text1} text2={fe.text2} />))}
      </div>
        <ProfitStocks />
        <LossStocks />
      <Footer />
    </div>
  );
}
