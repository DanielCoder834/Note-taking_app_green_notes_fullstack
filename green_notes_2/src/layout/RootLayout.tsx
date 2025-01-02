import { useEffect } from "react";
import { Navbar } from "../general/general_components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

// Represents the app layout for all pages
export default function RootLayout({
  showNavbar,
  setShowNavbar,
  setHomePage,
  setLoginPage,
  setAboutPage,
  setSignUpPage,
}: any) {
  // Use location can only be used within a router :(
  const location = useLocation();
  useEffect(() => {
    setShowNavbar(
      location.pathname === "/" ||
        location.pathname === "/about" ||
        location.pathname === "/notes"
    );
    setHomePage(location.pathname === "/");
    setLoginPage(location.pathname === "/login");
    setAboutPage(location.pathname === "/about");
    setSignUpPage(location.pathname === "/sign-up");
    // TODO: Set darkMode in local storage?? Maybe
    // Also could remove onClicks now with this
    // setDarkMode(darkMode && location.pathname === "/notes");
  }, [location]);
  return (
    <div>
      <Navbar showNavbar={showNavbar} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
