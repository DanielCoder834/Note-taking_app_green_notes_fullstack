import { DashboardNavbar } from "../components/DashboardNavbar";
import { useEffect, useState } from "react";
import { Stats } from "../components/Stats";
import { getUserNameByUserIdCookieFromApi } from "../../../general/api/getCookie";

export const Dashboard = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const getUsername = () => {
      getUserNameByUserIdCookieFromApi().then((resp) => setUsername(resp));
    };
    getUsername();
  }, [setUsername]);

  return (
    <div>
      {/* // bg-slate-900 */}
      <div className="bg-[#111419] h-screen flex w-screen">
        <DashboardNavbar />
        <div className="w-screen flex flex-col max-w-[86%]">
          <h1 className="text-7xl text-center pt-[10rem] pl-[5rem]">
            {/* pr-[40rem] */}
            <p className="text-[#F5F5DC] shrink overflow-y-hidden overflow-x-scroll">
              {username}'s Dashboard
            </p>
          </h1>
          <div className="mt-10 mx-32 justify-center h-[30rem] bg-green-950 w-auto rounded-lg">
            <div className="artboard text-center items-center h-full">
              <Stats />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
