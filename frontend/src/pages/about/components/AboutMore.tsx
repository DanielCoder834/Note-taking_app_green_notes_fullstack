import { motion } from "framer-motion";

// The third about explanation
export const AboutMore = () => {
  const widthViewPoint = 61.8;
  const imageWidthVW = 38.2;
  return (
    <div className="bg-[#052E16]">
      <motion.div
        className="text-9xl text-center justify-center max-w-[90%]"
        // animate={isVisible ? show : hide}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="">
          <div className="flex justify-center gap-20">
            <div
              className={`w-[${widthViewPoint}%] text-6xl float-left text-center`}
            >
              The Green Notebook donates to these organizations:
              <div className="h-10"></div>
              <ol>
                <li>- Trees for the Future</li>
                <li>- One Tree Planted</li>
                <li>- National Forest Foundation</li>
              </ol>
            </div>
            <div
              className={`max-w-auto max-h-auto w-[${imageWidthVW}%] h-[10%] float-right pl-24`}
            >
              <div className="h-10"></div>
              <motion.img
                src={
                  "src/assets/hand-drawn-flat-design-tree-planting-illustration.png"
                }
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
