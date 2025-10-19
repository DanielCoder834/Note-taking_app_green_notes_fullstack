import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Represents the page for resetting a password
// TODO: add functionality to reset passwords
export const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <div>
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
      <div className="p-80 bg-slate-700">
        <div className="card flex shrink-0 shadow-2xl bg-base-100 text-center justify-center bg-[#8f8d90]">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl text-[#F5F5DC]">
                  Enter Your Email Here
                </span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-active">
                Send Password Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
