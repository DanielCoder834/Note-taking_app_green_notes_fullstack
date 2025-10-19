import axios from "axios";

// https://gist.github.com/hunan-rostomyan/28e8702c1cecff41f7fe64345b76f2ca
// gets the cookie value based off their name
// Some notes:
//  - HttpOnly cookies can not be read and should not be read as it exposes internal access to the server
//  - If the cookie does not exist, it will return null.
//      -  Do a null check with strict equality before using the value
export function getCookie(name: string): string | null {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
}

// Does an existence check for the session cookie which is used as a flag for whether a user is logged in or not
export function checkSessionCookies(): boolean {
  return getCookie("sesh") != null;
}

// Sets the three session cookies for when a user logs in or signs up
export const setSessionToken = async (email: string) => {
  await axios
    .post(
      "http://localhost:3333/cookies/setSessionCookie",
      {
        Email: email,
      },
      {
        withCredentials: true,
      }
    )
    .then(function (json_response) {
      console.log(`Response: ${json_response}`);
      return json_response;
    })
    .catch(function (error) {
      console.log(`Error: ${error}`);
    });
};

// Checks back every 400 milliseconds if the session cookie has been set
export async function waitForUserIdCookie() {
  const poll = (resolve: any) => {
    if (getCookie("user_id") !== null) resolve(getCookie("user_id"));
    else setTimeout(() => poll(resolve), 400);
  };

  return new Promise(poll);
}

export async function waitForUsernameCookie() {
  const poll = (resolve: any) => {
    if (getCookie("username") !== null) resolve(getCookie("username"));
    else setTimeout(() => poll(resolve), 400);
  };

  return new Promise(poll);
}
