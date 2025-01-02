// When using "use client", it needs to be in a separate file as it effects the whole file
"use client";
import { motion } from "framer-motion";
import "../aboutpage.css";

// The second About Explanation
export const AboutExplain = () => {
  const widthViewPoint = 61.8;
  return (
    <div className="bg-[#052E16]">
      <motion.div
        className="text-9xl text-center justify-center max-w-[90%]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="">
          <div className="flex justify-center gap-56">
            <motion.img
              src={"/trees.png"}
              className={`max-w-auto max-h-auto w-[${widthViewPoint}%] float-left pl-24`}
            />
            <div className="w-[38.2%] text-6xl float-right text-center">
              The Green Notebook is a charity organization centered around the
              idea of using ad revenue to donate to tree planting charity.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
