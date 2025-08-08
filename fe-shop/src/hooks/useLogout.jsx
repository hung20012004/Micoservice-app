import useAuth from "./useAuth";

export const useLogout = () => {
  const { dispatch } = useAuth();
  
  const logout = () => {
    // remove from local storage
    localStorage.removeItem("token");
    
    console.log("--- logout ---")
    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
