/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useTheme } from "@/contexts/theme-provider";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      // Simulação de exportação de dados
      await new Promise(resolve => setTimeout(resolve, 1500));
     
    } catch (error) {
   
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize sua experiência na plataforma
          </p>
        </div>
      </div>

      <Separator />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Aparência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Aparência</span>
            </CardTitle>
            <CardDescription>
              Personalize a aparência do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Tema</Label>
                <p className="text-sm text-muted-foreground">
                  Altere para o modo claro ou escuro
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={theme === "dark"} 
                  onCheckedChange={toggleTheme} 
                  aria-label="Alternar tema"
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Densidade</Label>
                <p className="text-sm text-muted-foreground">
                  Ajuste o espaçamento dos elementos
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Compacto
                </Button>
                <Button size="sm">Padrão</Button>
                <Button variant="outline" size="sm">
                  Amplo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Notificações</span>
            </CardTitle>
            <CardDescription>
              Controle como você recebe notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Notificações por e-mail</Label>
                <p className="text-sm text-muted-foreground">
                  Receba atualizações importantes por e-mail
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Notificações push</Label>
                <p className="text-sm text-muted-foreground">
                  Receba alertas em tempo real
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Privacidade e Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Privacidade e Dados</span>
            </CardTitle>
            <CardDescription>
              Gerencie seus dados e configurações de privacidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Exportar dados</Label>
                <p className="text-sm text-muted-foreground">
                  Baixe uma cópia dos seus dados em formato JSON
                </p>
              </div>
              <Button 
                variant="outline" 
                className="w-fit" 
                onClick={handleExportData}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Exportando...
                  </>
                ) : (
                  <>
                    Exportar Dados
                  </>
                )}
              </Button>
            </div>

            <div className="rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Excluir conta</Label>
                <p className="text-sm text-muted-foreground">
                  Esta ação não pode ser desfeita
                </p>
              </div>
              <Button 
                variant="destructive" 
                className="mt-4 w-fit" 
                disabled={isLoading}
              >
                Excluir Conta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}