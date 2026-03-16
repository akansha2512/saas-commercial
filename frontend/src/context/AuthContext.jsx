// createContext() ek empty box banata hai
import { createContext, useEffect, useState, useContext } from "react";
// AuthContext = ek global locker
const AuthContext = createContext();
 
// AuthProvider ek wrapper component hai
// Jo bhi component iske andar hoga,
// wo AuthContext ka data use kar sakta hai
export const AuthProvider = ({children}) => {
    // user = currently logged-in user ka data
    // null ka matlab → user logged out hai
    const[user , setUser] = useState(null);
const [loading, setLoading] = useState(true);
    // React state refresh par reset ho jaata hai 
    // Isliye hum user ko localStorage me save karte hain
   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
        setUser(JSON.parse(storedUser));
    } else {
        setUser(null);
    }
    setLoading(false);
    }, []);
    // Login ke time kya hota hai?
    // Backend se user data aata hai
    // Us data ko:
    // React state me set karte ho
    // localStorage me save karte ho
    // Why both?
    // State → UI update ke liye
    // localStorage → refresh survive karne ke liye
    const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout,loading }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);