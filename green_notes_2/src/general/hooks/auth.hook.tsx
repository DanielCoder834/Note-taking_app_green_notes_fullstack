import { createContext, useContext } from "react";
import { IUserLogin } from "../types/UserLogin.interface";
import axios from "axios";

// https://hhpendleton.medium.com/useauth-265512bbde3c
// I asked a question about a problem I was having.
// Some c**t on a forum said to fix the problem was to make a hook.
// I made the hook and it did not fix the issue. Now we use this hook.

// Anyway this hook, is for authenticating users logging into their page
// TODO: Add a way to do authenticating under the hood for example through a bearer token
// or jwt token or session token

// To use the hook:
/*
 * Outside Some Component:
 * <ProvideAuth>
 * <Some Component />
 * </ProvideAuth>
 * Inside Some Component:
 * const auth = useAuth();
 * const userInfo: IUserLogin = {.....}
 * ....
 * auth.validateUserInfo(userInfo)
 */
const AuthContext = createContext({});

export function ProvideAuth({ children }: any) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  async function validateUserInfo(userLoginInfo: IUserLogin): Promise<boolean> {
    if (userLoginInfo.Password && userLoginInfo.Email) {
      let userExist = await axios
        .post("http://localhost:3333/db/userExists", {
          Email: userLoginInfo.Email,
          Password: userLoginInfo.Password,
        })
        .then(function (response) {
          console.log(`Response: ${response.data}`);
          return response.data;
        })
        .catch(function (error) {
          console.log(`Error: ${error}`);
        });
      console.log(userExist);
      // useLoggedIn()
      return userExist;
    }
    return false;
  }

  return {
    validateUserInfo,
  };
}
