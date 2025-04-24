/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [restaurante, setRestaurante] = useState<any>(null);

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

      const restaurante = response.data.restaurante;
      if (restaurante) {
        localStorage.setItem("restaurante", JSON.stringify(response.data));
        window.location.href = "/";
      }
    } catch (error) {
      toast.error("Email ou senha inválidos!");
      return;
    }
  };

  const signup = async (dados) => {
    try {
      await api.post("/signup", dados);

      window.location.href = "/login";
    } catch (error: any) {
      toast.error("Erro ao cadastrar", {
        description: "Verifique os dados e tente novamente",
      });
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
      .get(`/restaurantes/${restaurante?.id}`)
      .then((res) => {
        setRestaurante(res.data);

      
      })

      .catch((error) => {
        toast.error(error.response.data.message);
        if (
          error.response.data.message ===
          "Você precisa ter um plano ativo para usar o sistema."
        ) {
          router.push("/cobrancas");
        }
        if (restaurante.proxima_cobranca_em < dayjs().format("YYYY-MM-DD")) {
          toast.error(
            "Sua assinatura venceu, entre em contato com o suporte para mais informações."
          );
          router.push("/suporte");
        }
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
      <Toaster></Toaster>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): any => {
  return useContext(AuthContext);
};
