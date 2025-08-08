import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, setAuth, isLogin } = useAuth();
  const navigate = useNavigate();

  const signup = async (userDetails) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:80/customer/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Signup failed");
      }

      localStorage.setItem("token", json.token);
      dispatch({ type: "LOGIN", payload: json.token });
      setAuth(json);
      isLogin(true);
      setIsLoading(false);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  };

  return { signup, isLoading, error };
};