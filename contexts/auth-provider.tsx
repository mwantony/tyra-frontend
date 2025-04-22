/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [restaurante, setRestaurante] = useState(null);

  useEffect(() => {
    const storedRestaurante = JSON.parse(
      localStorage.getItem("restaurante") || "{}"
    );
    if (storedRestaurante) {
      setRestaurante(storedRestaurante.restaurante);
    }
  }, []);

  const login = async (email: any, password: any) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const token = response.data;
      localStorage.setItem("restaurante", JSON.stringify(token));

      window.location.href = "/";
    } catch (error) {
      alert("Email ou senha inválidos!");
      throw new Error(String(error));
    }
  };
  const signup = async (dados) => {
    try {
      await api.post("/signup", dados);

      window.location.href = "/login";
    } catch (error: any) {
      console.error(error);
      return error;
    }
  };

  const logout = async () => {
    setRestaurante(null);
    localStorage.removeItem("restaurante");
    window.location.reload();
  };
  const updateRestaurante = async (restaurante: any) => {
    await api
      .put(`/restaurante`, restaurante)
      .then((res) => {
        setRestaurante(res.data.restaurante);
        localStorage.setItem("formChanged", "false");
      })
      .catch((error) => {
        throw new Error(error.response.data.message);
      });
  };
  const refreshRestaurante = async () => {
    await api
      .get("/restaurante")
      .then((res) => {
        setRestaurante(res.data);
      })
      .catch((error) => {
        localStorage.removeItem("restaurante");
        throw new Error(error.response.data.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        restaurante,
        login,
        signup,
        logout,
        updateRestaurante,
        refreshRestaurante,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): any => {
  return useContext(AuthContext);
};
