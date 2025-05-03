import "./loginpopup.css";
import { useState } from "react";


function Loginpopup({ setShowLogin }) {
  const [currState, setCurrState] = useState("Login"); // Login or Sign up
  const [currData, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const API_BASE_URL = "http://localhost:4000/api/user";

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Debug Admin Credentials Check
    if (currData.email === 'admin@example.com' && currData.password === 'ayesha1234') {
        console.log('Admin credentials detected. Redirecting to admin portal...');
        window.open('http://localhost:5174', '_self');
        return;
    } else {
        console.log('Not admin credentials. Proceeding with user login...');
    }

    const url =
        currState === 'Sign up'
            ? `${API_BASE_URL}/register`
            : `${API_BASE_URL}/login`;

    try {
        console.log('Sending request to:', url);
        console.log('Form Data:', currData);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currData),
        });

        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Response received:', response.status, result);

        if (result.success) {
            console.log('Login success:', result);
            setShowLogin(false); // Close popup on success
        } else {
            console.error('Login failed:', result.message);
            alert(result.message || 'An error occurred');
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        alert('Server error occurred');
    }
};

  

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-header">
          <h2>{currState === "Sign up" ? "Sign Up" : "Login"}</h2>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="close-btn"
          >
            ✕
          </button>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="login-popup-inputs">
            {currState === "Sign up" && (
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={currData.name}
                  onChange={onChangeHandler}
                  required
                />
              </div>
            )}
            <div className="input-container">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={currData.email}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={currData.password}
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>
          <div className="submit-btn">
            <button type="submit">
              {currState === "Sign up" ? "Sign Up" : "Log In"}
            </button>
          </div>
        </form>
        <div className="login-popup-switch">
          {currState === "Login" ? (
            <p>
              Don’t have an account?{" "}
              <span
                className="switch-btn"
                onClick={() => setCurrState("Sign up")}
              >
                Create Account
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="switch-btn"
                onClick={() => setCurrState("Login")}
              >
                Log In
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Loginpopup;
