import { UserInfoType } from "../../../general/types/UserInfo.enum";
import { UserInfo } from "../../../general/types/UserInfo.interface";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { useState } from "react";

// The field representing information for the user to pass in
export const SignUpField = ({
  Icon,
  PlaceHolder,
  TextAbove,
  InputFieldType,
  setUserInfo,
  userInfo,
  UserInfoEnumValue,
  passwordStrength,
  setPasswordStrength,
}: {
  Icon: any;
  PlaceHolder: any;
  TextAbove: any;
  InputFieldType: any;
  setUserInfo: any;
  userInfo: UserInfo;
  UserInfoEnumValue: UserInfoType;
  passwordStrength: number;
  setPasswordStrength: any;
}) => {
  const options = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
    },
  };

  zxcvbnOptions.setOptions(options);

  // console.log(zxcvbn(password));

  const [strongPasswordRequirementText, setStrongPasswordRequirementText] =
    useState("Empty");

  // Updates the user information based on the enum userinfo passed in
  const updateUserInfo = (event: any) => {
    switch (UserInfoEnumValue) {
      case UserInfoType.ComfirmPassword:
        setUserInfo({ ...userInfo, ComfirmPassword: event.target.value });
        break;
      case UserInfoType.Email:
        setUserInfo({ ...userInfo, Email: event.target.value });
        break;

      case UserInfoType.Password:
        setUserInfo({ ...userInfo, Password: event.target.value });
        break;

      case UserInfoType.Username:
        setUserInfo({ ...userInfo, Username: event.target.value });
        break;
      default:
        break;
    }
  };

  const calculatePasswordStrength = () => {
    const password = userInfo.Password;
    setPasswordStrength(zxcvbn(password).score);
    if (passwordStrength <= 2) {
      setStrongPasswordRequirementText("Weak");
    } else if (passwordStrength === 3) {
      setStrongPasswordRequirementText("Strong");
    } else if (passwordStrength === 4) {
      setStrongPasswordRequirementText("Excellent");
    }
  };

  return (
    <div className="pl-20 pr-20">
      <div>
        <span className="text-2xl font-bold text-[#F5F5DC] pb-3 pl-2">
          {TextAbove}
        </span>
        <span
          className={`text-2xl float-right pr-2 ${
            strongPasswordRequirementText === "Weak"
              ? "text-red-400"
              : "text-green-500"
          }`}
        >
          {UserInfoEnumValue == UserInfoType.Password &&
            strongPasswordRequirementText}
        </span>
        <button onClick={() => console.log(zxcvbn(userInfo.Password))}>
          {UserInfoEnumValue == UserInfoType.Password && "test"}
        </button>
      </div>

      <div>
        <label className="input input-bordered flex items-center gap-2">
          {Icon}
          <input
            type={InputFieldType}
            className="grow"
            placeholder={PlaceHolder}
            onChange={(e) => {
              updateUserInfo(e);
              if (UserInfoEnumValue === UserInfoType.Password) {
                calculatePasswordStrength();
              }
            }}
            required
          />
        </label>
      </div>
      <div
        className={`${
          UserInfoEnumValue != UserInfoType.Password && "hidden"
        } flex my-2`}
      >
        <div
          className={`outline outline-2 card ${
            passwordStrength >= 1 ? "bg-[#F5F5DC]" : "bg-transparent"
          } outline-[#1D232A] rounded grid h-8 flex-grow place-items-center`}
        ></div>
        <div className="w-1"></div>
        <div
          className={`outline outline-2 card ${
            passwordStrength >= 2 ? "bg-[#F5F5DC]" : "bg-transparent"
          } outline-[#1D232A] rounded grid h-8 flex-grow place-items-center`}
        ></div>
        <div className="w-1"></div>
        <div
          className={`outline outline-2 card ${
            passwordStrength >= 3 ? "bg-[#F5F5DC]" : "bg-transparent"
          } outline-[#1D232A] rounded grid h-8 flex-grow place-items-center`}
        ></div>
        <div className="w-1"></div>
        <div
          className={`outline outline-2 card ${
            passwordStrength >= 4 ? "bg-[#F5F5DC]" : "bg-transparent"
          } outline-[#1D232A] rounded grid h-8 flex-grow place-items-center`}
        ></div>
      </div>
    </div>
  );
};
