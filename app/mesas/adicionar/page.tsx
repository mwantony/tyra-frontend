/* eslint-disable @typescript-eslint/no-explicit-any */
// app/mesas/nova/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { postMesa } from "@/services/mesas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function NovaMesaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identificacao: "",
    capacidade: 4,
    status: "livre",
    observacoes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await postMesa(formData);
      toast.success("Mesa criada com sucesso!");
      router.push("/mesas");
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error("Erro ao criar mesa:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container  p-6 py-8">
      <div className=" ">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Nova Mesa</h1>
          <p className="text-muted-foreground">
            Preencha os dados da nova mesa
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identificacao">Identificação*</Label>
              <Input
                id="identificacao"
                name="identificacao"
                placeholder="Ex: Mesa 1, VIP 2, Bar 3"
                value={formData.identificacao}
                onChange={handleChange}
                required
                maxLength={50}
              />
              <p className="text-sm text-muted-foreground">
                Nome ou número que identifica a mesa
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacidade">Capacidade*</Label>
              <Input
                id="capacidade"
                name="capacidade"
                type="number"
                min="1"
                max="20"
                value={formData.capacidade}
                onChange={handleChange}
                required
              />
              <p className="text-sm text-muted-foreground">
                Número de pessoas que cabem na mesa
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status*</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
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
                name="observacoes"
                rows={3}
                value={formData.observacoes}
                onChange={handleChange}
                maxLength={200}
              />
              <p className="text-sm text-muted-foreground">
                Informações adicionais sobre a mesa (opcional)
              </p>
            </div>
          </div>

          <div className="flex-col justify-end gap-4 md:flex-row w-full flex">
            <Button
              className="w-full md:w-auto"
              type="button"
              variant="outline"
              onClick={() => router.push("/mesas")}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              className="w-full md:w-auto"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar Mesa"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
