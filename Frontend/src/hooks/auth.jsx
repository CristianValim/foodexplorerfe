import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@FoodExplorer:user", JSON.stringify(user));
      localStorage.setItem("@FoodExplorer:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Nao foi possivel logar");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@FoodExplorer:user");
    localStorage.removeItem("@FoodExplorer:token");

    setData({});
  }

  async function getAllDishes() {
    try {
      const response = await api.get("/dishes");
      return response.data;
    } catch {
      alert("Nao foi possivel carregar os pratos");
    }
  }

  async function updateUserRole(newRole) {
    try {
      const response = await api.put("/users", { role: newRole });
      const updatedUser = { ...data.user, role: newRole };
      localStorage.setItem("@FoodExplorer:user", JSON.stringify(updatedUser));
      setData({ ...data, user: updatedUser });
      return response.data;
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil");
      }
      throw error;
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("@FoodExplorer:user");
    const token = localStorage.getItem("@FoodExplorer:token");

    if (user && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  const isAdmin = data.user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        getAllDishes,
        updateUserRole,
        user: data.user,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
