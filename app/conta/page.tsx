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
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function RestaurantAccountPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notificationEnabled: true,
  });
  const { restaurante } = useAuth();

  // Carrega os dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Carrega plano atual

        // Preenche dados do restaurante
        if (restaurante) {
          setRestaurantData({
            name: restaurante.nome_fantasia || "",
            email: restaurante.email || "",
            phone: restaurante.telefone || "",
            address: restaurante.endereco || "",
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
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Minha Conta</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua conta e plano
          </p>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Coluna 1: Informações do Restaurante */}
        <div className="space-y-6 md:col-span-2">
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
                      {restaurantData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    {isEditing ? (
                      <Input
                        id="cnpj"
                        name="cnpj"
                        value={restaurante?.cnpj}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    ) : (
                      <div className="py-2 px-3 border rounded-md text-sm">
                        {restaurante?.cnpj || (
                          <Skeleton className="h-4 w-[200px]" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
             
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome_fantasia">Nome do Restaurante</Label>
                    {isEditing ? (
                      <Input
                        id="nome_fantasia"
                        name="nome_fantasia"
                        value={restaurante.nome_fantasia}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    ) : (
                      <div className="py-2 px-3 border rounded-md text-sm">
                        {restaurante?.nome_fantasia || (
                          <Skeleton className="h-4 w-[200px]" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="razao_social">Razão Social</Label>
                    {isEditing ? (
                      <Input
                        id="razao_social"
                        name="razao_social"
                        value={restaurante.razao_social}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    ) : (
                      <div className="py-2 px-3 border rounded-md text-sm">
                        {restaurante?.razao_social || (
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

                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-1">
                    <Label>Notificações por e-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber alertas e atualizações
                    </p>
                  </div>
                  <Switch
                    checked={restaurantData.notificationEnabled}
                    onCheckedChange={(checked) =>
                      setRestaurantData({
                        ...restaurantData,
                        notificationEnabled: checked,
                      })
                    }
                    disabled={!isEditing || isLoading}
                  />
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
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Atualize sua senha e configurações de segurança
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline">Alterar Senha</Button>
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
              <Button variant="outline" className="w-full">
                Central de Ajuda
              </Button>
              <Button variant="outline" className="w-full">
                Fale Conosco
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
