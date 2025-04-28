/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { putRestaurante } from "@/services/restaurantes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function RestaurantAccountPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    nome_fantasia: "",
    razao_social: "",
    email: "",
    notificationEnabled: true,
  });
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const { restaurante, refreshRestaurante } = useAuth();

  // Carrega os dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (restaurante) {
          setRestaurantData({
            nome_fantasia: restaurante.nome_fantasia || "",
            razao_social: restaurante.razao_social || "",
            email: restaurante.email || "",
            notificationEnabled: true,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurante]);

  const handleSaveChanges = async () => {
    if (!restaurante) return;

    setIsLoading(true);
    try {
      const updatedData = {
        cnpj: restaurante.cnpj,
        nome_fantasia: restaurantData.nome_fantasia,
        razao_social: restaurantData.razao_social,
        email: restaurantData.email,
      };

      await putRestaurante(restaurante.id, updatedData);
      refreshRestaurante();
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!restaurante) return;
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    setIsLoading(true);
    try {
      const updatedData = {
        cnpj: restaurante.cnpj,
        nome_fantasia: restaurante.nome_fantasia,
        razao_social: restaurante.razao_social,
        email: restaurante.email,
        password: passwordData.newPassword,
      };

      await putRestaurante(restaurante.id, updatedData)
        .then(() => {
          toast.success("Dados atualizados com sucesso!");
        })
        .catch((error) => {
          toast.error("Erro ao atualizar dados");
          console.error("Erro ao atualizar dados:", error);
        });
      refreshRestaurante();
      setIsPasswordDialogOpen(false);
      setPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Toaster></Toaster>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 md:p-6">
        <div>
          <h1 className="text-2xl font-bold">Minha Conta</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua conta e plano
          </p>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 p-4 md:p-6 md:grid-cols-3">
        {/* Coluna 1: Informações do Restaurante */}
        <div className=" md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Restaurante</CardTitle>
              <CardDescription>
                Atualize os dados do seu estabelecimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/restaurant-placeholder.jpg" />
                    <AvatarFallback>
                      {restaurantData.nome_fantasia.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <div className="py-2 px-3 border rounded-md text-sm">
                      {restaurante?.cnpj || (
                        <Skeleton className="h-4 w-[200px]" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <Label htmlFor="nome_fantasia">Nome do Restaurante</Label>
                    {isEditing ? (
                      <Input
                        id="nome_fantasia"
                        name="nome_fantasia"
                        value={restaurantData.nome_fantasia}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    ) : (
                      <div className="py-2 px-3 border rounded-md text-sm">
                        {restaurantData.nome_fantasia || (
                          <Skeleton className="h-4 w-[200px]" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <Label htmlFor="razao_social">Razão Social</Label>
                    {isEditing ? (
                      <Input
                        id="razao_social"
                        name="razao_social"
                        value={restaurantData.razao_social}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    ) : (
                      <div className="py-2 px-3 border rounded-md text-sm">
                        {restaurantData.razao_social || (
                          <Skeleton className="h-4 w-[200px]" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="email">E-mail</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={restaurantData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    ) : (
                      <div className="py-2 px-3 border rounded-md text-sm">
                        {restaurantData.email || (
                          <Skeleton className="h-4 w-[200px]" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={isLoading}
                      >
                        Cancelar
                      </Button>
                      <Button onClick={handleSaveChanges} disabled={isLoading}>
                        {isLoading ? "Salvando..." : "Salvar Alterações"}
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Editar</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card de Segurança */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Atualize sua senha e configurações de segurança
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => setIsPasswordDialogOpen(true)}
                >
                  Alterar Senha
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna 2: Plano de Assinatura */}
        <div className="space-y-6">
          {/* Card de Suporte */}
          <Card>
            <CardHeader>
              <CardTitle>Suporte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href="mailto:againplayi7@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full" variant="outline">
                  againplayi7@gmail.com
                </Button>
              </a>
              <a
                href="https://wa.me/5549991042777"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full mt-4" variant="outline">
                  (49) 99104-2777
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Alteração de Senha */}
      <Dialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>
              Digite sua nova senha e confirme para atualizar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPasswordDialogOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button onClick={handlePasswordChange} disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Senha"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
