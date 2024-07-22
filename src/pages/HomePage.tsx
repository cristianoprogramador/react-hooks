import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import reactAnimation from "../assets/animations/react.json";
import javascriptAnimation from "../assets/animations/javascript.json";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col w-full justify-center items-center">
      <div className="text-2xl font-semibold">React vs Javascript</div>

      <div className="flex flex-col md:flex-row gap-10 mt-10 justify-center items-center text-center">
        <div
          onClick={() => navigate("/react")}
          className="cursor-pointer hover:border-2 hover:bg-gray-100 rounded-lg p-5 hover:p-[18px]"
        >
          <Lottie
            animationData={reactAnimation}
            loop={true}
            style={{ width: 200, height: 200 }}
          />
          <div>React Version</div>
        </div>
        <div
          onClick={() => navigate("/vanilla")}
          className="cursor-pointer hover:border-2 hover:bg-gray-100 rounded-lg p-5 hover:p-[18px]"
        >
          <Lottie
            animationData={javascriptAnimation}
            loop={true}
            style={{ width: 200, height: 200 }}
          />
          <div>Javascript Version</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
