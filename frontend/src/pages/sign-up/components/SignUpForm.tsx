import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { SignUpField } from "./SignUpFields";
import { MdEmail } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { UserInfoType } from "../../../general/types/UserInfo.enum";
import { UserInfo } from "../../../general/types/UserInfo.interface";
import {
  setSessionToken,
  waitForUserIdCookie,
} from "../../../general/helper/cookies";
import { isEmailInTheDB } from "../../../general/api/getCookie";

// The form for sign up page. Contains some formatting and the fields
export const SignUpForm = () => {
  const navigate = useNavigate();
  // The user information typed into the signup field objects
  const [userInfoValues, setUserInfo] = useState<UserInfo>({
    Username: "",
    Password: "",
    ComfirmPassword: "",
    Email: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  // false => if there is an empty field, otherwise true
  const nonEmptyUserInfo = () =>
    userInfoValues.ComfirmPassword &&
    userInfoValues.Email &&
    userInfoValues.Password &&
    userInfoValues.Username;

  const isAStrongPathWord = () => passwordStrength >= 3;
  // Adds the new user to the database
  const addNewUser = async () => {
    if (
      nonEmptyUserInfo() &&
      userInfoValues.ComfirmPassword === userInfoValues.Password &&
      !(await isEmailInTheDB(userInfoValues.Email)) &&
      isAStrongPathWord()
    ) {
      await axios.post("http://localhost:3333/db/addUser", {
        Username: userInfoValues.Username,
        Password: userInfoValues.Password,
        Email: userInfoValues.Email,
      });
      await setSessionToken(userInfoValues.Email);
      navigate(`/${await waitForUserIdCookie()}/dashboard`);
    } else {
      if (!nonEmptyUserInfo()) {
        alert("Unfilled Fields");
      } else if (userInfoValues.ComfirmPassword !== userInfoValues.Password) {
        alert("Password does not match");
      } else if (await isEmailInTheDB(userInfoValues.Email)) {
        alert("Email already in use");
      } else if (!isAStrongPathWord()) {
        alert("Password needs to be strong or excellent");
      }
    }
  };
  return (
    <div className="min-h-screen bg-slate-700">
      <div className="flex justify-between">
        <div className="flex pt-9 pl-7">
          <img src="/trees.png" alt="" className="h-[100%] w-[10%]" />
          <div className="pt-3 pl-5">
            <h1 className="text-4xl font-bold text-[#F5F5DC]">
              The Green Notebook
            </h1>
          </div>
        </div>
        <div className="pt-12 pr-7">
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
      <div className="p-20 pb-10 pl-16">
        <h1 className="text-5xl font-black text-[#F5F5DC]">Sign Up</h1>
      </div>
      <div>
        <SignUpField
          Icon={<MdEmail />}
          PlaceHolder={"Enter Your Email Here"}
          TextAbove={"Email"}
          InputFieldType={"text"}
          setUserInfo={setUserInfo}
          userInfo={userInfoValues}
          UserInfoEnumValue={UserInfoType.Email}
          passwordStrength={passwordStrength}
          setPasswordStrength={setPasswordStrength}
        />
        <div className="h-8"></div>
        <SignUpField
          Icon={<RxAvatar />}
          PlaceHolder={"Enter Your Username Here"}
          TextAbove={"Username"}
          InputFieldType={"text"}
          setUserInfo={setUserInfo}
          userInfo={userInfoValues}
          UserInfoEnumValue={UserInfoType.Username}
          passwordStrength={passwordStrength}
          setPasswordStrength={setPasswordStrength}
        />
        <div className="h-8"></div>
        <SignUpField
          Icon={<RiLockPasswordLine />}
          PlaceHolder={"Enter Your Password Here"}
          TextAbove={"Password"}
          InputFieldType={"password"}
          setUserInfo={setUserInfo}
          userInfo={userInfoValues}
          UserInfoEnumValue={UserInfoType.Password}
          passwordStrength={passwordStrength}
          setPasswordStrength={setPasswordStrength}
        />
        <div className="h-8"></div>
        <SignUpField
          Icon={<RiLockPasswordLine />}
          PlaceHolder={"Re-Enter Your Password Here"}
          TextAbove={"Confirm Password"}
          InputFieldType={"password"}
          setUserInfo={setUserInfo}
          userInfo={userInfoValues}
          UserInfoEnumValue={UserInfoType.ComfirmPassword}
          passwordStrength={passwordStrength}
          setPasswordStrength={setPasswordStrength}
        />
      </div>
      <div className="h-8"></div>
      <div className="text-center justify-center">
        <button
          className="btn btn-wide w-[80%]"
          onClick={async () => {
            await addNewUser();
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
