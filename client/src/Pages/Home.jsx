import Footer from "../Components/Footer";
import Buttons from "../Components/Home/Section1/buttons";
import Features from "../Components/Home/Section1/Features";
import HeroText from "../Components/Home/Section1/HeroText";
import { Shield, Users, Globe } from "lucide-react";
import ProfitStocks from "../Components/Home/Section2/ProfitStocks";
import LossStocks from "../Components/Home/Section2/LossStocks";
export default function Home() {
  const f = [
    {
      icon: <Shield size={80} strokeWidth={3} />,
      text1: "Secure Treads",
      text2: "End-to-end protection",
    },
    {
      icon: <Globe size={80} strokeWidth={3} />,
      text1: "Global Reach",
      text2: "180+ Countries",
    },
    {
      icon: <Users size={80} strokeWidth={3} />,
      text1: "Verified Sellers",
      text2: "Trusted Community",
    },
  ];

  return (
    <div className="text-white ">
      <HeroText />
      <Buttons />
      <div className="flex flex-wrap justify-center gap-36 w-full max-w-5xl mx-auto px-8 py-10">
        {f.map((fe) => (
          <Features icon={fe.icon} text1={fe.text1} text2={fe.text2} />
        ))}
      </div>
      <ProfitStocks />
      <LossStocks />
    </div>
  );
}
