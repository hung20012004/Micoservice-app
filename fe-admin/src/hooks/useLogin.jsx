import { useState } from "react";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch, setAuth, isLogin } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const login = async (userDetails) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:80/customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("token", json.token);

      // Update auth
      dispatch({ type: "LOGIN", payload: json.token });

      setIsLoading(false);
      setAuth(json);
      isLogin(true);
      navigate(from, { replace: true });
    }
  };

  return { login, isLoading, error };
};