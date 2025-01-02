import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { UserLoginEnum } from "../../general/types/UserLogin.enum";
import { useAuth } from "../../general/hooks/auth.hook";
import {
  setSessionToken,
  waitForUserIdCookie,
} from "../../general/helper/cookies";
import { IUserLogin } from "../../general/types/UserLogin.interface";
import { useState } from "react";

// The login page
export const Login = () => {
  // The user's information
  const [userLoginInfo, setUserLoginInfo] = useState<IUserLogin>({
    Email: "",
    Password: "",
  });
  // For navigating to different pages
  // navigate(-1) means go back to the last page visited
  const navigate = useNavigate();
  // For authenticating
  // TODO: Add better typing so vscode stops complaining
  const auth = useAuth();

  // Updates the user information passed on the type of information
  const updateUserLoginInfo = (event: any, userLoginEnum: UserLoginEnum) => {
    switch (userLoginEnum) {
      case UserLoginEnum.Password:
        setUserLoginInfo({ ...userLoginInfo, Password: event.target.value });
        break;
      case UserLoginEnum.Email:
        setUserLoginInfo({ ...userLoginInfo, Email: event.target.value });
        break;
      default:
        break;
    }
  };

  const login = async () => {
    if (await auth.validateUserInfo(userLoginInfo)) {
      await setSessionToken(userLoginInfo.Email);
      let user_id = await waitForUserIdCookie();
      navigate(`/${user_id}/dashboard`);
    } else {
      alert("User does not exist");
    }
  };

  return (
    <div
      className="login flex flex-col h-screen"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          login();
        }
      }}
    >
      <div className="">
        <div className="float-right p-10">
          <button
            className="btn max-[890px]:h-3 max-[890px]:w-14 btn-outline"
            onClick={() => navigate(-1)}
          >
            <div className="flex">
              <IoArrowBack /> Back
            </div>
          </button>
        </div>
      </div>
      {/* <div className="h-[-72rem]"></div> */}
      <div className="flex flex-1 flex-col justify-center px-6 lg:px-8 h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-28 w-auto"
            src="/trees.png"
            alt="The Green Notebook"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#F5F5DC]">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <form className="space-y-6" action="#" method="POST"> */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-[#F5F5DC]"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full pl-3 rounded-md border-0 py-1.5 text-[#F5F5DC] shadow-sm ring-1 ring-inset ring-[#d4c9c8] 
                  placeholder:text-green-400 sm:text-sm sm:leading-6"
                onChange={(event) =>
                  updateUserLoginInfo(event, UserLoginEnum.Email)
                }
              />
            </div>
          </div>
          <div className="h-4"></div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-[#F5F5DC]"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block pl-3 w-full rounded-md border-0 py-1.5 text-[#F5F5DC] shadow-sm ring-1 ring-inset ring-[#d4c9c8] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(event) =>
                  updateUserLoginInfo(event, UserLoginEnum.Password)
                }
              />
            </div>
          </div>
          <div className="h-8"></div>
          <div>
            <button
              // type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={login}
            >
              Sign in
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't Have An Account?{" "}
            <Link
              to="/sign-up"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
