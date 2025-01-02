import { motion } from "framer-motion";
import { AboutExplain } from "./components/AboutExplain";
import { AboutMore } from "./components/AboutMore";

// Represents the about page
export const About = () => {
  const startingText =
    "What is The Green Notebook about and why should you use it?".split(" ");

  const endingText =
    "It is win-win for the environment and for your note-taking purposes";
  return (
    <div className="about h-screen">
      <div className="h-72"></div>
      <h1 className="text-5xl p-4 text-center font-bold text-white-500">
        {startingText.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2.5,
              delay: i / 10,
            }}
            key={i}
          >
            {el}{" "}
          </motion.span>
        ))}
      </h1>
      {/* bg-[#052E16] */}
      <div className="h-72 bg-[#052E16]"></div>
      {/* <div className="h-72 bg-[#052E16]"></div> */}
      {/* <div className="h-72 bg-[#052E16]"></div>
      <div className="h-72 bg-[#052E16]"></div> */}
      {/* <AboutExplain />
      <div className="h-72 bg-[#052E16]"></div>
      <div className="h-72 bg-[#052E16]"></div>
      <AboutMore />
      <div className="h-72 bg-[#052E16]"></div> */}
      <div className="sm:flex items-center max-w-screen bg-[#052E16] w-screen">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img
              src="vecteezy_isolated-tropical-plant-and-summer-tree_24212390.png"
              className="object-scale-down max-h-full m-auto h-4/5"
            />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-[#9799CA] uppercase">
              About us
            </span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
              <span>About</span>{" "}
              <span className="text-[#9799CA]">The Green Notebook</span>
            </h2>
            <p className="text-[#F5F5DD] text-xl">
              The Green Notebook is a charity organization centered around the
              idea of using ad revenue to donate to tree planting charity.
            </p>
            <hr className="my-3" />
            <p className="text-[#F5F5DD]">
              <div>
                The Green Notebook donates to these organizations:
                <ol>
                  <li>- Trees for the Future</li>
                  <li>- One Tree Planted</li>
                  <li>- National Forest Foundation</li>
                </ol>
              </div>
            </p>
            <hr className="my-3" />
            <p className="text-[#F5F5DD]">
              <ol>
                <li>{"The More You Use the Notebook -> "}</li>
                <li>
                  {"The More Money We Can Donate to Those Organizations -> "}
                </li>
                <li>{"The More Trees that Get Planted in The End -> "}</li>
              </ol>
            </p>
          </div>
        </div>
      </div>
      {/* <div className="h-72 bg-[#052E16]"></div> */}
      <div className="h-96 bg-[#052E16]"></div>
      {/* <div className="h-72 bg-[#052E16]"></div> */}
      <h1 className="text-5xl p-4 text-center font-bold text-white-500 bg-[#052E16]">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          {endingText}
        </motion.div>
      </h1>
      <div className="h-96 bg-[#052E16]"></div>
      {/* <div className="h-72 bg-[#052E16]"></div> */}
      {/* <div className="h-72 bg-[#052E16]"></div> */}
    </div>
  );
};
