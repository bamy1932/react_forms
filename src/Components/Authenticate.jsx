import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  console.log(token);
  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setSuccessMessage(result.message);
        setError(null);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    }
  };
  return (
    <>
      <h2>Authenticate!</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="error">{error} </p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </>
  );
}
