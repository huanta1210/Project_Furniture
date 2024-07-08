import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { FormValues } from "../../interfaces/User";
import { useForm, SubmitHandler } from "react-hook-form";
import instance from "../../api";
import { useNavigate } from "react-router";

const Register: React.FC = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <MainRegister />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

const MainRegister: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await instance.post("/auth/register", data);

      if (!res) {
        toast.error("The data returned is incorrect");
      } else {
        toast.success("Sign up successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to register");
    }
  };
  return (
    <main className="mx-96 main-login">
      <div className="login flex flex-col items-center justify-center mt-10 mr-12">
        <div className="login-title text-center">
          <h1 className="text-2xl text-black font-semibold">
            Register an account
          </h1>
          <p className="text-lg ml-4 mt-5 text-black text-center">
            If you have an account yet, register here
          </p>
          <div className="login-platform mt-6 ml-6">
            <div className="login-facebook border p-2 bg-blue-800 inline-block mr-6">
              <a className="text-white flex items-center" href="#">
                <i className="ti ti-facebook pr-3 text-lg border-r-2"></i>
                <span className="mx-4 text-sm">Facebook</span>
              </a>
            </div>

            <div className="login-facebook border p-2 bg-orange-600 inline-block mr-6">
              <a className="text-white flex items-center" href="#">
                <i className="ti ti-google pr-3 text-lg border-r-2"></i>
                <span className="mx-7 text-sm">Google</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="login-form my-10">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-8">
              <label className="text-sm text-black" htmlFor="email">
                Name:<span className="text-red-500">*</span>
              </label>
              <input
                className="w-full py-3 mt-2 rounded-md border-gray-300 border outline-none pl-3 focus:border-lime-600"
                type="text"
                placeholder="Hoàng Anh Thư"
                {...register("userName", {
                  required: "Name is required",
                })}
              />
              {errors.userName && (
                <small className="text-red-500">
                  {errors.userName.message}
                </small>
              )}
            </div>
            <div className="form-group mb-8">
              <label className="text-sm text-black" htmlFor="email">
                Phone:<span className="text-red-500">*</span>
              </label>
              <input
                className="w-full py-3 mt-2 rounded-md border-gray-300 border outline-none pl-3 focus:border-lime-600"
                type="number"
                placeholder="+8490458343"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "Do not enter negative numbers",
                  },
                })}
              />
              {errors.phone && (
                <small className="text-red-500">{errors.phone.message}</small>
              )}
            </div>
            <div className="form-group mb-8">
              <label className="text-sm text-black" htmlFor="email">
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
              <label className="text-sm text-black" htmlFor="password">
                Password:<span className="text-red-500">*</span>
              </label>
              <input
                className="w-full py-3 mt-2 rounded-md border-gray-300 border outline-none pl-3 focus:border-lime-600"
                type="password"
                placeholder="**************"
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
                className="btn-submit border border-black py-3 px-28 text-sm text-white bg-black font-medium hover:bg-white hover:text-black"
                type="submit"
              >
                Create Account
              </button>
              <p className="text-sm text-red-500 font-semibold my-6">
                <a href="/login">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
export default Register;
