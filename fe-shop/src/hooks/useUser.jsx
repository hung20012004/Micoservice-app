import { useState } from "react";
import useAuth from "./useAuth";

export const useUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [name, setName] = useState("");
  const [userEmail, setUSerEmail] = useState("");
  const [role, setRole] = useState("customer");

  const getUserDetails = async (access_token) => {
    const UserResponse = await fetch("https://fruity-fruit-shop.herokuapp.com/api/me", {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userJson = await UserResponse.json();

    if (UserResponse.ok) {
      setName(userJson.name);
      setUSerEmail(userJson.email);
      setRole(userJson.role);
    }
  };

  const getUser = async (refreshToken) => {
    setIsLoading(true);
    setError(false);

    const token = {
      refresh_token: refreshToken,
    };

    const response = await fetch("https://fruity-fruit-shop.herokuapp.com/api/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(token),
    });

    const json = await response.json();

    getUserDetails(json.access_token);
  };

  return { getUser,name,userEmail,role };
};
