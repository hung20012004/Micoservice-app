import { useEffect } from "react";
import { createContext, useState, useReducer } from "react";

const AuthContext = createContext({});

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { refreshToken: action.payload };
    case "LOGOUT":
      return { refreshToken: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [login, isLogin] = useState(false);
  const [state, dispatch] = useReducer(authReducer, {
    refreshToken: null,
  });

  useEffect(() => {
    // JWT token là string, không cần JSON.parse
    const refreshToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    
    if (refreshToken) {
      isLogin(true);
      dispatch({ type: "LOGIN", payload: refreshToken });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, isLogin, ...state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;