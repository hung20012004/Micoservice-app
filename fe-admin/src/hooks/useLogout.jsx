import useAuth from "./useAuth";

export const useLogout = () => {
  const { dispatch, isLogin } = useAuth();
  
  const logout = () => {
    // remove from local storage
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    
    console.log("--- logout ---");
    
    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    
    // set login state to false
    isLogin(false);
  };
  
  return { logout };
};