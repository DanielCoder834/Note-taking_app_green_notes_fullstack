import animationData from "../lotties/loading.json";
import Lottie from "react-lottie";

// Displays the loading animation (relies on lottie) and the text provided
export const Loading = ({ displayText }: { displayText?: string }) => {
  //   setLoadingPage(true);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="text-center">
      <div className="h-52"></div>
      <div className="flex">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="flex justify-center">
        <h1 className="text-3xl">{displayText}</h1>
      </div>
    </div>
  );
};
