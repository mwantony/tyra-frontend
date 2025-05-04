/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/mesas/[id]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMesa, liberarMesa, ocuparMesa, updateMesa } from "@/services/mesas";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  Clipboard,
  Phone,
  User,
  RockingChair,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function MesaDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [mesa, setMesa] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmOcupacao, setConfirmOcupacao] = useState(false);
  const [confirmLiberacao, setConfirmLiberacao] = useState(false);
  const [formData, setFormData] = useState({
    identificacao: "",
    capacidade: 4,
    status: "livre",
    observacoes: "",
  });
  const [ocupacaoData, setOcupacaoData] = useState({
    numero_comanda: "",
  });

  useEffect(() => {
    const loadMesa = async () => {
      try {
        const mesaData = await getMesa(Number(params.id));
        setMesa(mesaData);
        setFormData({
          identificacao: mesaData.identificacao,
          capacidade: mesaData.capacidade,
          status: mesaData.status,
          observacoes: mesaData.observacoes || "",
        });
      } catch (error) {
        toast.error("Erro ao carregar dados da mesa");
        router.push("/mesas");
      }
    };
    loadMesa();
  }, [params.id, router]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMesa(Number(params.id), formData);
      const updatedMesa = await getMesa(Number(params.id));
      setMesa(updatedMesa);
      setIsEditing(false);
      toast.success("Mesa atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar mesa");
    }
  };

  const handleOcuparSubmit = async (e: React.FormEvent) => {
    setConfirmOcupacao(true);
    e.preventDefault();
    try {
      await ocuparMesa(Number(params.id), ocupacaoData.numero_comanda);
      const updatedMesa = await getMesa(Number(params.id));
      setMesa(updatedMesa);
      setOcupacaoData({ numero_comanda: "" });
      toast.success("Mesa ocupada com sucesso!");
      setConfirmOcupacao(false);
    } catch (error) {
      setConfirmOcupacao(false);

      toast.error("Erro ao ocupar mesa");
    }
  };

  const handleLiberarMesa = async () => {
    setConfirmLiberacao(true);
    try {
      await liberarMesa(Number(params.id));
      const updatedMesa = await getMesa(Number(params.id));
      setMesa(updatedMesa);
      toast.success("Mesa liberada com sucesso!");
      setConfirmLiberacao(false);
    } catch (error) {
      setConfirmLiberacao(false);

      toast.error("Erro ao liberar mesa");
    }
  };

  const handleCancelarReserva = async () => {
    try {
      await liberarMesa(Number(params.id)); // Reutiliza a função de liberar para cancelar reserva
      const updatedMesa = await getMesa(Number(params.id));
      setMesa(updatedMesa);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      toast.error("Erro ao cancelar reserva");
    }
  };

  if (!mesa) {
    return (
      <div className="container mx-auto p-6 md:p-6 md:space-y-6">
        <div className="flex pb-4 md:pb-0 justify-between items-center">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-25 w-full" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-25 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 md:space-y-6">
      <div className="flex justify-between pb-4 md:pb-0 items-center">
        <h1 className="text-2xl font-bold">Detalhes da Mesa</h1>
        <Button variant="outline" onClick={() => router.push("/mesas")}>
          Voltar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Informações principais */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Informações da Mesa</CardTitle>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="identificacao">Identificação</Label>
                  <Input
                    id="identificacao"
                    value={formData.identificacao}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        identificacao: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacidade">Capacidade</Label>
                  <Input
                    id="capacidade"
                    type="number"
                    min="1"
                    value={formData.capacidade}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacidade: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="livre">Livre</SelectItem>
                      <SelectItem value="reservada">Reservada</SelectItem>
                      <SelectItem value="ocupada">Ocupada</SelectItem>
                      <SelectItem value="em_limpeza">Em limpeza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) =>
                      setFormData({ ...formData, observacoes: e.target.value })
                    }
                  />
                </div>

                <Button type="submit">Salvar Alterações</Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Identificação
                    </p>
                    <p className="font-medium">{mesa.identificacao}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Capacidade</p>
                    <p className="font-medium">{mesa.capacidade} pessoas</p>
                  </div>
                </div>
                {mesa.observacoes && (
                  <div className="flex items-start gap-4">
                    <Clipboard className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Observações
                      </p>
                      <p className="font-medium">{mesa.observacoes}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ações e status */}
        <div className="space-y-4 md:space-y-6">
          {/* Status da mesa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RockingChair className="w-5 h-5" />
                Status da Mesa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    mesa.status === "ocupada"
                      ? "destructive"
                      : mesa.status === "reservada"
                      ? "default"
                      : mesa.status === "em_limpeza"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {mesa.status.charAt(0).toUpperCase() + mesa.status.slice(1)}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {dayjs(mesa.updated_at).format("DD/MM/YYYY HH:mm")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Informações de reserva/ocupação */}
          {mesa.status === "reservada" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Reserva
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{mesa.nome_reserva}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-medium">{mesa.telefone_reserva}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Horário</p>
                    <p className="font-medium">
                      {dayjs(mesa.horario_reserva).format("DD/MM/YYYY HH:mm")}
                    </p>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  onClick={handleCancelarReserva}
                  className="w-full"
                >
                  Cancelar Reserva
                </Button>
              </CardContent>
            </Card>
          )}

          {mesa.status === "ocupada" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RockingChair className="w-5 h-5" />
                  Ocupação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Clipboard className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Comanda</p>
                    <p className="font-medium">{mesa.numero_comanda}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  disabled={confirmLiberacao}
                  onClick={handleLiberarMesa}
                  className="w-full"
                >
                  {confirmLiberacao ? "Liberando..." : "Liberar Mesa"}
                </Button>
              </CardContent>
            </Card>
          )}

          {mesa.status !== "ocupada" && (
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mesa.status === "livre" && (
                  <form onSubmit={handleOcuparSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="numero_comanda">Número da Comanda</Label>
                      <Input
                        id="numero_comanda"
                        value={ocupacaoData.numero_comanda}
                        onChange={(e) =>
                          setOcupacaoData({ numero_comanda: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button
                      disabled={confirmOcupacao}
                      type="submit"
                      className="w-full"
                    >
                      {confirmOcupacao ? "Ocupando..." : "Ocupar Mesa"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
