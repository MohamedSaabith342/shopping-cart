import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice/index";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Registration successful");
        navigate("/auth/login");
      } else {
        toast.error(data?.payload?.message || "Registration failed");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          Get Started
        </span>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 font-heading">
          Create Your Account
        </h1>
        <p className="text-xs text-zinc-500">
          Already have an account?{" "}
          <Link
            className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline ml-1"
            to="/auth/login"
          >
            Sign In Here
          </Link>
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xl">
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Create Account"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthRegister;
