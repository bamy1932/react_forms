import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [lengthError, setLengthError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello");
    if (username.length < 6 || username.length > 15) {
      setLengthError(`Username must be between 6 and 15 characters.`);
    } else {
      setLengthError(null);
      console.log("Submitting username", username);

      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
          {
            method: "POST",
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );
        const result = await response.json();
        console.log(result);
        setToken(result.token);
      } catch (error) {
        setError(error.message);
      }
    }
  };
  return (
    <div>
      <h2>Sign Up!</h2>
      {error && <p className="error">{error}</p>}
      {lengthError && <p className="error">{lengthError}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
