import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const goToDiscover = (e) => {
    navigate("/discover");
  };

  return (
    <div className="login">
      <form onSubmit={goToDiscover}>
        <input
          type="email"
          placeholder="Type Email Here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Type Password Here"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>

        {error && <span>Wrong input, try again.</span>}
      </form>
    </div>
  );
};

export default Login;
