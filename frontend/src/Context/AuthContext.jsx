import {createContext, useContext, useEffect, useState, useRef} from "react";
import { me } from "../Service/authService";
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  function fetchUser() {
    me()
      .then(res => {
        setUser(res.data.user)
      })
      .catch(err => {
        console.error("❌ Fetch error:", {
          status: err.response?.status,
          message: err.response?.data?.message,
          fullError: err.message
        })
        // 401 is expected when not logged in - don't treat as error
        if (err.response?.status === 401) {
          console.log("⚠️ Not authenticated - user will see login page")
        }
        setUser(null)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    if (fetchedRef.current) return;  // ← Prevent double calls
    fetchedRef.current = true;
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
