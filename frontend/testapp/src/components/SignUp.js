import axios from "axios";
import React, { useState } from "react";

const SignUp = ({ setShowLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const onLoginClick = () => {
    setShowLogin(true);
  };

  const onSignUpClick = async () => {
    setLoading(true);
    if (!fullName || !email || !password || !phone) {
      setLoading(false);
      return alert("Missing fields!");
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/signup", {
        fullName,
        email,
        password,
        phone,
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
          <label style={styles.labels}>Full Name</label>
          <input
            style={styles.input}
            onChange={(e) => setFullName(e.target.value)}
          />
        </span>

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
        <span style={styles.fields}>
          <label style={styles.labels}>Phone</label>
          <input
            style={styles.input}
            onChange={(e) => setPhone(e.target.value)}
          />
        </span>
      </form>
      <button onClick={onSignUpClick} style={styles.footer} disabled={loading}>
        Signup
      </button>
      <button onClick={onLoginClick} disabled={loading}>
        Already a user?
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

export default SignUp;
