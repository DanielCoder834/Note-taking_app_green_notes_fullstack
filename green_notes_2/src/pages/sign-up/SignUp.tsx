import { SignUpForm } from "./components/SignUpForm";

// The sign up page
export const SignUp = () => {
  return (
    <div className="sign-up w-screen h-screen bg-slate-700">
      <div className="flex">
        <div className="w-1/2 h-[100vh]">
          <SignUpForm />
        </div>
        <div className="justify-center text-center w-1/2">
          <img
            className="h-[100vh] w-[101vw]"
            src="src/assets/marita-kavelashvili-ugnrXk1129g-unsplash_edited.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
