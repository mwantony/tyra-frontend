/* eslint-disable @typescript-eslint/no-unused-vars */
// components/PaymentMethodDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "@/utils/currencyUtils";

type PaymentMethod = "dinheiro" | "cartao" | "pix" | "outro";

interface PaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  onConfirm: (method: PaymentMethod) => Promise<void>;
}

export function PaymentMethodDialog({
  open,
  onOpenChange,
  total,
  onConfirm,
}: PaymentMethodDialogProps) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("dinheiro");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsProcessing(true);
      await onConfirm(selectedMethod);
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao processar pagamento");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione o método de pagamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>{formatCurrency(total.toFixed(2))}</span>
            </div>
          </div>

          <RadioGroup
            value={selectedMethod}
            onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem
                value="dinheiro"
                id="dinheiro"
                className="peer sr-only"
              />
              <Label
                htmlFor="dinheiro"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="font-medium">Dinheiro</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="cartao"
                id="cartao"
                className="peer sr-only"
              />
              <Label
                htmlFor="cartao"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="font-medium">Cartão</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
              <Label
                htmlFor="pix"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="font-medium">PIX</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="outros"
                id="outros"
                className="peer sr-only"
              />
              <Label
                htmlFor="outros"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="font-medium">Outro</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Confirmar Pagamento"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
