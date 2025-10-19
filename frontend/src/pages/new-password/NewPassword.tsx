// The new password page
export const NewPassword = () => {
  return (
    <div>
      <div className="p-80 bg-slate-700">
        <div className="card flex shrink-0 shadow-2xl bg-base-100 text-center justify-center bg-[#8f8d90]">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl text-[#111419] pb-4">
                  Enter Your New Password Here
                </span>
              </label>
              <input
                type="password"
                placeholder="New Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                {/* <RiLockPasswordLine /> */}
                <span className="label-text text-2xl text-[#111419]"></span>
              </label>
              <input
                type="password"
                placeholder="Confirm Your New Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-active">Change Your Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
