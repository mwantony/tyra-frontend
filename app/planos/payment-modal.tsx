/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface PaymentModalProps {
  isPaymentModalOpen: boolean;
  selectedPlan: any;
  setIsPaymentModalOpen: (open: boolean) => void;
  paymentData: {
    qr_code?: string;
    qr_code_base64?: string;
    payment_id?: string;
    // Outros campos que podem vir do Mercado Pago
  } | null;
}

export function PaymentModal({
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  paymentData,
  selectedPlan,
}: PaymentModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPixCode = () => {
    if (paymentData?.qr_code) {
      navigator.clipboard.writeText(paymentData.qr_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Pagamento via PIX</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6">
          {/* QR Code */}
          {paymentData?.qr_code_base64 && (
            <div className="p-4 bg-white rounded-lg border">
              <img
                src={`data:image/jpeg;base64,${paymentData.qr_code_base64}`}
                alt="QR Code PIX"
                className="w-64 h-64"
              />
            </div>
          )}

          {/* Código PIX Copiável */}
          {paymentData?.qr_code && (
            <div className="w-full">
              <p className="text-sm text-muted-foreground mb-2 text-center">
                Ou copie o código PIX:
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-muted rounded-md text-sm font-mono break-all">
                  {paymentData.qr_code}
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopyPixCode}
                  disabled={copied}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Instruções */}
          <div className="text-sm text-muted-foreground text-center space-y-2">
            <p>1. Abra seu app de pagamentos</p>
            <p>2. Escaneie o QR Code ou cole o código PIX</p>
            <p>3. Confirme o pagamento no valor de R$ {selectedPlan?.preco}</p>
          </div>

          {/* ID do Pagamento (opcional) */}
          {paymentData?.payment_id && (
            <div className="text-xs text-muted-foreground mt-4">
              <p>ID do pagamento: {paymentData.payment_id}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
