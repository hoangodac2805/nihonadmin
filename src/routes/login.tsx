import { useNavigate } from "react-router-dom";
import useAuth from "../customHooks/useAuth";
import AuthConsumer from "../customHooks/useAuth";
import { Navigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"

interface IInputs {
  email: string,
  password: string
}
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { authed } = AuthConsumer();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>()

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    login(data).then(() => {
      // navigate("/");
    });
  }

  if (!authed) {
    return (
      <div className="bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("https://picsum.photos/1920/1080")' }}>
        <div className="h-screen flex justify-center items-center">
          <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pb-5 relative">
                <label className="block font-semibold text-gray-700 mb-2 cursor-pointer" htmlFor="email">
                  Email Address
                </label>
                <input {...register('email', {
                  required: true, pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  }
                })} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email address" />
                {errors.email && <span className="absolute bottom-0 left-1 text-red-500 text-xs">{errors.email.message}</span>}
              </div>
              <div className="pb-5">
                <label className="block font-semibold text-gray-700 mb-2 cursor-pointer" htmlFor="password">
                  Password
                </label>
                <input {...register('password', { required: true })} className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" />
              </div>
              <div className="pb-7">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );

  } else {
    return <Navigate to="/" replace />
  }
};

export default Login;
