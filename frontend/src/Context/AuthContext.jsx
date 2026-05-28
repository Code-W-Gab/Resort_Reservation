import {createContext, useContext, useEffect, useState} from "react";
import { me } from "../Service/authService";
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function fetchUser() {
    me()
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log(err)
        setUser(null)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <AuthContext.Provider
      value={{ user, setUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)
