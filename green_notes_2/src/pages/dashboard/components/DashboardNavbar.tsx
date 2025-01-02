import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { deleteCookieByName } from "../../../general/api/getCookie";

// TODO: Needs lots of work with the routing
// Represents the sidebar in the dashboard page
export const DashboardNavbar = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      {/* <!-- container --> */}
      <aside className="flex flex-col items-center bg-[#F5F5DC] text-gray-700 shadow h-full">
        {/* <!-- Side Nav Bar--> */}

        <div className="h-4"></div>
        <div className="h-16 flex items-center w-full">
          {/* <!-- Logo Section --> */}
          <Link to={"/"} className="h-10 w-10 mx-auto">
            <img
              className="h-10 w-10 mx-auto"
              src="/trees.png"
              alt="tree logo"
            />
          </Link>
        </div>

        <div className="h-40"></div>
        <ul className="">
          {/* <!-- Items Section --> */}
          {/* <li className="hover:bg-gray-100">
            <Link
              to={`/${id}/profile`}
              className="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500"
            >
              <CgProfile className="h-5 w-5" />
              <h1 className="mx-2">Profile</h1>
            </Link>
          </li> */}

          <li className="hover:bg-gray-100">
            <Link
              to={`/${id}/notes`}
              className="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500"
            >
              <CgNotes className="h-5 w-5" />
              <h1 className="mx-2">Notes</h1>
            </Link>
          </li>

          <li className="hover:bg-gray-100">
            <Link
              to={`/${id}/dashboard`}
              className="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500"
            >
              <MdOutlineDashboard className="h-5 w-5" />
              <h1 className="mx-2 w-[4.5rem]">Dashboard</h1>
            </Link>
          </li>

          {/* <li className="hover:bg-gray-100">
            <a
              href="."
              className="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0
							2-1.61L23 6H6"
                ></path>
              </svg>
            </a>
          </li> */}

          <li className="hover:bg-gray-100">
            <Link
              className="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500"
              to={`/${id}/settings`}
            >
              <IoSettingsOutline className="h-5 w-5" />
              <h1 className="mx-2">Settings</h1>
            </Link>
          </li>

          {/* <li className="hover:bg-gray-100">
            <a
              href="."
              className="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </a>
          </li> */}
        </ul>

        {/* TODO: Add an onclick for logging out */}
        <div className="mt-auto h-16 flex items-center w-full">
          {/* <!-- Action Section --> */}
          <button
            onClick={async () => {
              // await deleteCookieByName("user_id");
              navigate("/");
            }}
            className="h-16 w-10 mx-auto flex flex justify-center items-center
				w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none"
          >
            <MdLogout className="h-5 w-5 text-red-700" />
            <h1 className="mx-2">Logout</h1>
          </button>
        </div>
      </aside>
    </div>
  );
};
