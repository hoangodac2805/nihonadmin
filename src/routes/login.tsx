
import { useNavigate } from "react-router-dom";
import useAuth from "../customHooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login ,authed} = useAuth();
    
    const handleLogin = () => {
        login().then(() => {
          navigate("/");
        });
      };
  return (
    <div>
        {authed? "true" :"fasle"}
      <h1>Login</h1>
      <button className="border" onClick={handleLogin}>Log in</button>
    </div>
  )
}

export default Login