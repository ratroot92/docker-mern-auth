import React, { createContext, useState, useEffect } from "react";
import AuthService from "./../services/AuthService";
import loader from  './../assets/svgs/loader.svg';
export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  /*
    ! React hook version of componentDidMount()
    */
  useEffect(() => {
    console.log(
      " %c *** AuthProvider.useEffect *** ",
      "font-size: 12px; font-weight: bold;color:green"
    );
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
      console.log("AuthService.isAuthenticated() %o", { data });
    });
  }, []);
  return (
    <div>
      {!isLoaded ? (
        
      <img src={loader} alt="logo" style={{width:"300px",height:"300px,",position:"absolute",top:"50%",left:"50%",  margin: "-150px 0 0 -150px",}}  />
 
       
        
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
