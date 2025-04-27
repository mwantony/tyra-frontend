/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useTheme } from "@/contexts/theme-provider";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { deleteRestaurante, getJsonRestaurante } from "@/services/restaurantes";
import { useAuth } from "@/contexts/auth-provider";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { restaurante } = useAuth();

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      const { url, fileName } = await getJsonRestaurante(restaurante.id);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
  
    } catch (error) {
      toast.error("Erro ao exportar dados");
      console.error("Erro na exportação:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteRestaurante(restaurante.id);
      toast.success("Conta excluída com sucesso");
    } catch (error) {
      toast.error("Erro ao excluir conta");
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
    }
  };
  return (
    <div className="flex flex-col h-full">
      <Toaster></Toaster>
      <div className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize sua experiência na plataforma
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex-1 p-4 lg:p-6 space-y-6 overflow-auto">
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

            <div className="flex flex-col gap-4 items-start justify-between rounded-lg border p-4 lg:flex-row lg:items-center">
  <div className="space-y-0.5">
    <Label className="text-base">Densidade</Label>
    <p className="text-sm text-muted-foreground">
      Ajuste o espaçamento dos elementos
    </p>
  </div>
  <div className="flex flex-wrap gap-2 w-full lg:w-auto">
    <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
      Compacto
    </Button>
    <Button size="sm" className="flex-1 lg:flex-none">
      Padrão
    </Button>
    <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
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
                {isLoading ? "Exportando..." : "Exportar Dados"}
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
                onClick={() => setIsDeleteDialogOpen(true)}
                disabled={isLoading}
              >
                Excluir Conta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>{" "}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tem certeza absoluta?</DialogTitle>
            <DialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente sua
              conta e removerá todos os dados associados do nosso servidor.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>Cancelar</Button>
            <Button
              onClick={handleDeleteAccount}
              disabled={isLoading}
              variant={"destructive"}
            >
              {isLoading ? "Excluindo..." : "Excluir Conta"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
