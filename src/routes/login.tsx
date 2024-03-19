import { useNavigate } from "react-router-dom";
import useAuth from "../customHooks/useAuth";
import AuthConsumer from "../customHooks/useAuth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { authed, isLoading } = AuthConsumer();
  if (isLoading) {
    return <p>Loading...</p>; // Display loading message while checking
  }
  if (!authed) {
    return (
      <div>
        <h1>Login</h1>
        <button
          className="border"
          onClick={() => {
            login({
              email: "hoangodac2a805@gmail.com",
              password: "123",
            }).then(() => {
              navigate("/");
            });
          }}
        >
          Log in
        </button>
      </div>
    );
  }else{
    return <Navigate to="/" replace />
  }
};

export default Login;
