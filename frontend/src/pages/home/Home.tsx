import "./homepage.css";
// Represents the homepage
// TODO: Remove the style sheet and turn those styles into tailwind classnames
export const Home = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="h-60"></div>
      <h1
        id="test"
        className="text-for-home text-white font-extrabold justify-center text-center drop-shadow-[0_0_100rem_black]"
      >
        The Green Notebook
      </h1>
      <h2
        id="test"
        className="text-for-sub-title text-white font-bold justify-center text-center drop-shadow-[0_0_100rem_black]"
      >
        The Tree Planting Journal
      </h2>
    </div>
  );
};
