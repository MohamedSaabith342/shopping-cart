import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice/index";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Login successful");
      } else {
        toast.error(data?.payload?.message || "Login failed");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          Welcome Back
        </span>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 font-heading">
          Sign In To SHOPVERSE
        </h1>
        <p className="text-xs text-zinc-500">
          Don't have an account yet?{" "}
          <Link
            className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline ml-1"
            to="/auth/register"
          >
            Create an Account
          </Link>
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xl">
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthLogin;
