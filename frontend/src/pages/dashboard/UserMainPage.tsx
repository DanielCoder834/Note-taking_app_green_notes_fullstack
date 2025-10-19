import { Await, defer, useAsyncError, useLoaderData } from "react-router-dom";
import { checkSessionCookies } from "../../general/helper/cookies";
import { Loading } from "../../general/general_components/Loading";
import React from "react";
import { DashboardNavbar } from "./components/DashboardNavbar";

// See the defer guide in react router dom documentation
// The dashboard loader represents what we are awaiting
export function userMainPageLoader() {
  return defer({
    hasSessionCookies: waitForSessionCookie(),
  });
}

// Represents the dashboard element
export const UserMainPage = () => {
  // needed with the loader function
  const sessionCookie = useLoaderData();
  return (
    <div>
      {/* While waiting for the cookie to be set and receive, we load the loading page */}
      <React.Suspense
        fallback={<Loading displayText={"Loading your session cookie..."} />}
      >
        <Await
          // What part of the object we are awaiting
          resolve={sessionCookie.hasSessionCookies}
          // In case of error we load the error page
          // TODO: Refine the error page to be more ambiguous and look nicer
          errorElement={<ReviewsError />}
        >
          {/* Once we get the cookie set, we display the dashboard */}
          {(hasSessionCookies) => (
            <div className="bg-slate-900 h-screen flex w-screen">
              <DashboardNavbar />
              <div className="w-screen">
                <h1 className="text-3xl text-center">Text Here</h1>
              </div>
            </div>
          )}
        </Await>
      </React.Suspense>
    </div>
  );
};

// Checks back every 400 milliseconds if the session cookie has been set
async function waitForSessionCookie() {
  const poll = (resolve: any) => {
    if (checkSessionCookies()) resolve(checkSessionCookies());
    else setTimeout(() => poll(resolve), 400);
  };

  return new Promise(poll);
}

// TODO: Change it to log the error back to server and display a basic error message page
function ReviewsError() {
  const error = useAsyncError();
  return (
    <div>
      {error.message}
      <p>Error loading session cookie!</p>
    </div>
  );
}
