import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./style/App.css";
import { Home } from "./pages/home/Home";
import { About } from "./pages/about/About";
import { SignUp } from "./pages/sign-up/SignUp";
import { Login } from "./pages/login/Login";
import { NoteApp } from "./pages/old_notes/NoteApp";
import { useState } from "react";
import { ForgotPassword } from "./pages/forget-password/ForgotPassword";
import { NewPassword } from "./pages/new-password/NewPassword";
import { ProvideAuth } from "./general/hooks/auth.hook";
import RootLayout from "./layout/RootLayout";
import { User_Notes } from "./pages/dashboard/inner-pages/Notes";
import { Setting } from "./pages/dashboard/inner-pages/Settings";
import { Dashboard } from "./pages/dashboard/inner-pages/Dashboard";
import { ErrorPage } from "./general/general_components/ErrorPage";
import { ANote } from "./pages/dashboard/inner-pages/ANote";

export default function App() {
  // TODO: On Refresh Check Page
  const [isHomePage, setHomePage] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoginPage, setLoginPage] = useState(false);
  const [isAboutPage, setAboutPage] = useState(false);
  const [isSignUpPage, setSignUpPage] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  // Manages the routes being used by the website
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <RootLayout
            showNavbar={showNavbar}
            setShowNavbar={setShowNavbar}
            setHomePage={setHomePage}
            setLoginPage={setLoginPage}
            setAboutPage={setAboutPage}
            setSignUpPage={setSignUpPage}
          />
        }
        errorElement={<ErrorPage />}
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        {/* <Route path="notes" element={<NoteApp setDarkMode={setDarkMode} />} /> */}
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="login"
          element={
            <ProvideAuth>
              <Login />
            </ProvideAuth>
          }
        />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="new-password" element={<NewPassword />} />
        {/* <Route
          path=":id"
          element={<UserMainPage />}
          loader={userMainPageLoader}
        /> */}
        {/* TODO: Update the :id page elements to display something nicer */}
        <Route path=":id/dashboard" element={<Dashboard />} />
        <Route path=":id/settings" element={<Setting />} />
        {/* <Route path=":id/profile" element={<Profile />} /> */}
        <Route path=":id/notes" element={<User_Notes />} />
        <Route path=":id/notes/:notes_id" element={<ANote />} />
        {/* <Route path=":id/:test" element={<div>Testing</div>} /> */}
        {/* <Route path="placeholder/logout" element={<div>Logout</div>} /> */}
        <Route path={"dashboard"} element={<Navigate replace to={"login"} />} />
      </Route>
    )
  );
  //

  return (
    <div
      // classname styling so the style can applied over the navbar as well
      className={`${isHomePage && "bg-home-page"} 
      ${isHomePage && "image_home"} 
      ${darkMode && "dark-mode"}
      ${isLoginPage && "bg-slate-700 h-[120vh]"}
      ${isAboutPage && "bg-[#052E16] about-page-background"}
      ${isSignUpPage && "bg-slate-700"}
       bg-cover bg-center 
       `}
    >
      {/* Wrapper for the routing */}
      <RouterProvider router={router} />
    </div>
  );
}
