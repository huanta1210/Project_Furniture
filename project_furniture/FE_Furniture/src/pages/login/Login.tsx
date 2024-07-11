import { SubmitHandler, useForm } from "react-hook-form";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { FormValues } from "../../interfaces/User";
import { toast } from "react-toastify";
import instance from "../../api";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <MainLogin />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

const MainLogin: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (dataLogin) => {
    try {
      const { data } = await instance.post("/auth/login", dataLogin);
      console.log(data.checkUserRegister.role);

      if (!data) {
        toast.error("The data returned failed");
      } else {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", data.checkUserRegister);

        if (data.checkUserRegister.role === "admin") {
          toast.success("Logged in successfully", {
            onClose: () => {
              reset();
              navigate("/admin/product/list");
            },
            autoClose: 1000,
          });
        } else {
          toast.success("Logged in successfully", {
            onClose: () => {
              reset();
              navigate("/");
            },
            autoClose: 1000,
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Login to unsuccessful");
    }
  };
  const handleLoginGoogle = () => {
    window.open(`http://localhost:8000/api/auth/google`, "_self");
  };

  const handleLoginFaceBook = () => {
    window.open(`http://localhost:8000/api/auth/facebook`, "_self");
  };
  return (
    <main className="mx-96 main-login">
      <div className="login flex flex-col items-center justify-center mt-24 mr-12">
        <div className="login-title text-center">
          <h1 className="text-4xl text-black">Login to your account</h1>
          <div className="login-platform mt-6">
            <div className="login-facebook border p-2 bg-blue-800 inline-block mr-6">
              <button
                onClick={handleLoginFaceBook}
                className="text-white flex items-center"
              >
                <i className="ti ti-facebook pr-3 text-lg border-r-2"></i>
                <span className="mx-4 text-sm">Facebook</span>
              </button>
            </div>

            <div className="login-facebook border p-2 bg-orange-600 inline-block mr-6">
              <button
                onClick={handleLoginGoogle}
                className="text-white flex items-center"
              >
                <i className="ti ti-google pr-3 text-lg border-r-2"></i>
                <span className="mx-7 text-sm">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="login-form my-10">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-8">
              <label className="text-lg text-black" htmlFor="email">
                Email:<span className="text-red-500">*</span>
              </label>
              <input
                className="w-full py-3 mt-2 rounded-md border-gray-300 border outline-none pl-3 focus:border-lime-600"
                type="text"
                placeholder="example@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Email không đúng định dạng",
                  },
                })}
              />
              {errors.email && (
                <small className="text-red-500">{errors.email.message}</small>
              )}
            </div>

            <div className="form-group mb-8">
              <label className="text-lg text-black" htmlFor="password">
                Password:<span className="text-red-500">*</span>
              </label>
              <input
                className="w-full py-3 mt-2 rounded-md border-gray-300 border outline-none pl-3 focus:border-lime-600"
                type="password"
                placeholder="************"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <small className="text-red-500">
                  {errors.password.message}
                </small>
              )}
            </div>

            <div className="form-group text-center">
              <button
                className="btn-submit border border-black py-3 px-28 text-lg text-white bg-black font-medium hover:bg-white hover:text-black"
                type="submit"
              >
                Login
              </button>
              <p className="text-sm text-red-500 my-6">
                <a href="/login_recover">Forgot password ?</a>
              </p>
              <p className="text-sm">
                Do you already have an account? Register{" "}
                <a className="text-red-500" href="/register">
                  Here.
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
export default Login;
