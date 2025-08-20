import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Plan {
  id: string;
  nome: string;
  preco: number;
}

interface PaymentData {
  point_of_interaction?: {
    transaction_data?: {
      qr_code?: string;
      qr_code_base64?: string;
    };
  };
  id?: string;
  status?: string;
}

interface PaymentModalProps {
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  paymentData: PaymentData | null;
  selectedPlan: Plan | null;
  isLoading?: boolean;
}

export function PaymentModal({
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  paymentData,
  selectedPlan,
  isLoading = false,
}: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const qrCodeData = paymentData?.point_of_interaction?.transaction_data;

  const handleCopyPixCode = () => {
    if (qrCodeData?.qr_code) {
      navigator.clipboard.writeText(qrCodeData.qr_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!selectedPlan) return null;

  return (
    <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Pagamento via PIX</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">
              Preparando seu pagamento...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            {/* QR Code */}
            {qrCodeData?.qr_code_base64 ? (
              <div className="p-2 bg-white rounded-lg border">
                <img
                  src={`data:image/jpeg;base64,${qrCodeData.qr_code_base64}`}
                  alt="QR Code PIX"
                  className="w-50 h-50"
                  aria-label="QR Code para pagamento PIX"
                />
              </div>
            ) : (
              <div className="p-4 bg-muted rounded-lg border w-64 h-64 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  QR Code não disponível
                </p>
              </div>
            )}

            {/* Código PIX Copiável */}
            {qrCodeData?.qr_code && (
              <div className="w-full">
                <p className="text-sm text-muted-foreground mb-2 text-center">
                  Ou copie o código PIX:
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    disabled
                    value={qrCodeData.qr_code}
                    className="flex-1 p-3 bg-muted rounded-md text-sm font-mono break-all"
                    aria-label="Código PIX para copiar"
                  ></Input>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleCopyPixCode}
                    disabled={copied}
                    aria-label={copied ? "Código copiado" : "Copiar código PIX"}
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
              <p>
                3. Confirme o pagamento no valor de{" "}
                {selectedPlan.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            {/* Status e ID do Pagamento */}
            <div className="text-xs text-muted-foreground mt-4 space-y-1 text-center">
              {paymentData?.status && (
                <p className="flex items-center justify-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                        paymentData.status === "pending"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      } opacity-75`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${
                        paymentData.status === "pending"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    ></span>
                  </span>
                  Status: {formatPaymentStatus(paymentData.status)}
                </p>
              )}
              {paymentData?.id && <p>ID do pagamento: {paymentData?.id}</p>}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function formatPaymentStatus(status: string): string {
  const statusMap: Record<string, string> = {
    pending: "Aguardando pagamento",
    approved: "Aprovado",
    authorized: "Autorizado",
    in_process: "Em análise",
    rejected: "Rejeitado",
    cancelled: "Cancelado",
    refunded: "Reembolsado",
    charged_back: "Estornado",
  };

  return statusMap[status] || status;
}
