import { Link } from "react-router-dom";

// Displays the navbar seen in the layout component
// Holds links to various pages
// Can include more sites by adding it to the useEffect relying on location in App.tsx
export const Navbar = ({ showNavbar }: any) => {
  return (
    <div className={`${!showNavbar && "hidden"}`}>
      <div className="h-9"></div>
      <div
        className={`navbar bg-base-100 bg-green-900 rounded-3xl max-w-full justify-center text-center \
        w-auto ml-52 mr-52 bottom-44`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            ></div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {" "}
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              {/* <li>
                <Link to="/notes">Notes</Link>
              </li> */}
            </ul>
          </div>
          <div className="btn btn-ghost text-xl max-[890px]:text-sm">
            <Link to="/">The Green Notebook</Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {/* <li>
              <Link to="/notes">Notes</Link>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end gap-5">
          <Link to="/sign-up">
            <button className="btn max-[890px]:h-3 max-[890px]:w-12 btn-outline">
              <p className="max-[890px]:text-sm">Sign Up</p>
            </button>
          </Link>
          <Link to="/login">
            <button className="btn max-[890px]:h-3 max-[890px]:w-12 btn-outline mr-5">
              <p className="max-[890px]:text-sm">Login</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
