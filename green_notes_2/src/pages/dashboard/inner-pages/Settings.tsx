import { useEffect, useState } from "react";
import { DashboardNavbar } from "../components/DashboardNavbar";
import {
  deleteAccountInDB,
  deleteCookieByName,
  getEmailByUserIdCookieFromApi,
  getUserNameByUserIdCookieFromApi,
  matchesPasswordInDB,
  updateEmailInDB,
  updatePasswordInDB,
  updateUsernameInDB,
} from "../../../general/api/getCookie";
import { Link, useNavigate } from "react-router-dom";

export const Setting = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPasswordInChangeEmail, setCurrentPasswordInChangeEmail] =
    useState("");
  const [newEmailInModal, setNewEmailInModal] = useState("");
  const [currentPasswordInChangeUsername, setCurrentPasswordInChangeUsername] =
    useState("");
  const [newUsernameInModal, setNewUsernameInModal] = useState("");

  const [passwordInDeleteAccountModal, setPasswordInDeleteAccountModal] =
    useState("");
  const [
    confirmPasswordInDeleteAccountModal,
    setConfirmPasswordInDeleteAccountModal,
  ] = useState("");
  const [passwordsAreHidden, setPasswordHidden] = useState(true);

  useEffect(() => {
    const setInfo = () => {
      getUserNameByUserIdCookieFromApi().then((resp) => setUsername(resp));
      getEmailByUserIdCookieFromApi().then((resp) => setEmail(resp));
    };
    setInfo();
  }, [setUsername, setEmail]);

  const updatePassword = async () => {
    if (await matchesPasswordInDB(currentPassword, email)) {
      await updatePasswordInDB(newPassword, email);
      setNewPassword("");
      setCurrentPassword("");
    } else {
      alert("current password does not match");
    }
  };

  const updateUsername = async (e: any) => {
    if (e.key == "Enter") {
      if (await matchesPasswordInDB(currentPasswordInChangeUsername, email)) {
        // Update Username
        await updateUsernameInDB(newUsernameInModal, email);
        setUsername(newUsernameInModal);
      } else {
        alert("current password does not match");
      }
    }
  };

  const updateEmail = async (e: any) => {
    if (e.key == "Enter") {
      if (await matchesPasswordInDB(currentPasswordInChangeEmail, email)) {
        // Update Email
        await updateEmailInDB(newEmailInModal, email);
        setEmail(newEmailInModal);
      } else {
        alert("current password does not match");
      }
    }
  };

  const deleteAccount = async (e: any) => {
    if (e.key === "Enter") {
      if (
        confirmPasswordInDeleteAccountModal === passwordInDeleteAccountModal &&
        (await matchesPasswordInDB(passwordInDeleteAccountModal, email))
      ) {
        await deleteAccountInDB();
        await deleteCookieByName("user_id");
        await deleteCookieByName("sesh");
        await deleteCookieByName("secure_id");
        navigate("/");
      } else {
        alert("Passwords do not match");
      }
    }
  };

  return (
    <div className="bg-slate-900 h-screen flex w-screen">
      <DashboardNavbar />
      {/* sm:bg-gray-50 */}
      <div className="col-span-8 overflow-hidden rounded-xl  sm:px-8 sm:shadow">
        <div className="pt-4">
          <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
          {/* <!-- <p className="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> --> */}
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Email Address</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            Your email address is <strong>{email}</strong>
          </p>
          <label
            htmlFor="change_email_modal"
            className="inline-flex text-sm font-semibold text-blue-600 cursor-pointer"
          >
            Change
          </label>
          <input
            type="checkbox"
            id="change_email_modal"
            className="modal-toggle"
          />
          <div className="modal" role="dialog" onKeyDown={updateEmail}>
            <div className="modal-box">
              <h3 className="text-lg font-bold">Changing Email</h3>
              <p className="py-4">Press Enter To Apply Changes</p>
              {/* <p className="py-4">This modal works with a hidden checkbox!</p> */}
              <div className="h-3"></div>
              <input
                type="text"
                placeholder="New Email"
                className="input input-bordered w-full max-w-xs"
                onInput={(e) =>
                  setNewEmailInModal((e.target as HTMLInputElement).value)
                }
              />
              <div className="h-4"></div>
              <input
                type="password"
                placeholder="Current Password"
                className="input input-bordered w-full max-w-xs"
                onInput={(e) =>
                  setCurrentPasswordInChangeEmail(
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </div>
            <label className="modal-backdrop" htmlFor="change_email_modal">
              Close
            </label>
          </div>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Username</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            Your username is <strong>{username}</strong>
          </p>
          <label
            htmlFor="change_username_modal"
            className="inline-flex text-sm font-semibold text-blue-600 cursor-pointer"
          >
            Change
          </label>
          <input
            type="checkbox"
            id="change_username_modal"
            className="modal-toggle"
          />
          <div className="modal" role="dialog" onKeyDown={updateUsername}>
            <div className="modal-box">
              <h3 className="text-lg font-bold">Changing Username</h3>
              <p className="py-4">Press Enter To Apply Changes</p>
              <div className="h-3"></div>
              <input
                type="text"
                placeholder="New Username"
                className="input input-bordered w-full max-w-xs"
                onInput={(e) =>
                  setNewUsernameInModal((e.target as HTMLInputElement).value)
                }
              />
              <div className="h-4"></div>
              <input
                type="password"
                placeholder="Current Password"
                className="input input-bordered w-full max-w-xs"
                onInput={(e) =>
                  setCurrentPasswordInChangeUsername(
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </div>
            <label className="modal-backdrop" htmlFor="change_username_modal">
              Close
            </label>
          </div>
        </div>

        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Password</p>
        <div className="flex items-center">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <label htmlFor="login-password">
              <span className="text-sm text-gray-500">Current Password</span>
              <div className="h-2"></div>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type={passwordsAreHidden ? "password" : "text"}
                  id="login-password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="***********"
                  value={currentPassword}
                  onInput={(e) =>
                    setCurrentPassword((e.target as HTMLInputElement).value)
                  }
                />
              </div>
            </label>
            <label htmlFor="login-password">
              <span className="text-sm text-gray-500">New Password</span>
              <div className="h-2"></div>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type={passwordsAreHidden ? "password" : "text"}
                  id="login-password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="***********"
                  value={newPassword}
                  onInput={(e) =>
                    setNewPassword((e.target as HTMLInputElement).value)
                  }
                />
              </div>
            </label>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            onClick={() => setPasswordHidden(!passwordsAreHidden)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        </div>
        <p className="mt-2">
          Can't remember your current password.{" "}
          <Link
            className="text-sm font-semibold text-blue-600 underline decoration-2"
            to={"/forgot-password"}
          >
            Recover Account
          </Link>
        </p>
        <button
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
          onClick={updatePassword}
        >
          Save Password
        </button>
        <hr className="mt-4 mb-8" />

        <div className="mb-10">
          <p className="py-2 text-xl font-semibold">Delete Account</p>
          <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Proceed with caution
          </p>
          <p className="mt-2">
            Make sure you have taken backup of your account in case you ever
            need to get access to your data. We will completely wipe your data.
            There is no way to access your account after this action.
          </p>
          <label
            className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2"
            htmlFor="delete_account_modal"
          >
            Continue with deletion
          </label>
          <input
            type="checkbox"
            id="delete_account_modal"
            className="modal-toggle"
          />
          <div className="modal" role="dialog" onKeyDown={deleteAccount}>
            <div className="modal-box">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">Deleting Account</h3>
                <img src="/lol.jpg" height={75} width={75} />
              </div>
              {/* <p className="py-4">Are you sure about that?</p> */}

              <div className="h-3"></div>
              <input
                type="password"
                placeholder="Current Password"
                className="input input-bordered w-full max-w-xs"
                onInput={(e) =>
                  setPasswordInDeleteAccountModal(
                    (e.target as HTMLInputElement).value
                  )
                }
              />
              <div className="h-4"></div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full max-w-xs"
                onInput={(e) =>
                  setConfirmPasswordInDeleteAccountModal(
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </div>
            <label className="modal-backdrop" htmlFor="delete_account_modal">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
