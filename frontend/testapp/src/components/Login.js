import axios from "axios";
import React, { useState } from "react";

const Login = ({ setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onSignUpClick = () => {
    setShowLogin(false);
  };

  const onLoginClick = async () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      return alert("Missing fields!");
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });
      console.log(response.headers);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      return alert(error?.response?.data?.header?.message ?? "Failed");
    }

    alert("success");

    setLoading(false);
  };

  return (
    <>
      <form style={{ width: "25%" }}>
        <span style={styles.fields}>
          <label style={styles.labels}>Email</label>
          <input
            style={styles.input}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
        <span style={styles.fields}>
          <label style={styles.labels}>Password</label>
          <input
            style={styles.input}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
      </form>
      <button
        style={{ marginBottom: "10px" }}
        disabled={loading}
        onClick={onLoginClick}
      >
        Login
      </button>
      <button onClick={onSignUpClick} disabled={loading}>
        Create a new account
      </button>
    </>
  );
};

const styles = {
  fields: {
    display: "block",
    justifyContent: "space-between",
    display: "flex",
    marginBottom: "10px",
  },
  input: { width: "220px" },
  labels: { marginRight: "10px" },
  footer: { marginBottom: "10px", marginTop: "10px" },
};

export default Login;
