"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCardapio } from "@/services/produtos";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

export default function CardapioQRCodePage() {
  const [qrValue, setQrValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCardapio = async () => {
      try {
        setIsLoading(true);
        await getCardapio(); // Apenas para garantir que o PDF está disponível

        const qrUrl = `${window.location.origin}/api/cardapio/view`;
        setQrValue(qrUrl);
      } catch (error) {
        toast.error("Erro ao carregar cardápio");
        console.error("Erro ao buscar cardápio:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCardapio();
  }, []);

  const handleDownloadQRCode = () => {
    const qrCodeElement = document.getElementById("qr-code");

    if (qrCodeElement) {
      toast.promise(
        html2canvas(qrCodeElement).then((canvas) => {
          const link = document.createElement("a");
          link.download = "qr-code-cardapio.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        }),
        {
          loading: "Gerando imagem do QR Code...",
          success: "QR Code baixado com sucesso!",
          error: "Erro ao baixar QR Code",
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-100 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">QR Code do Cardápio</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6">
          {isLoading ? (
            <p>Carregando QR Code...</p>
          ) : (
            <>
              <div id="qr-code" className="p-4 bg-white border rounded-md">
                <QRCode
                  value={qrValue}
                  size={256}
                  level="H"
                  fgColor="#000000"
                  bgColor="#ffffff"
                />
              </div>
              <Button onClick={handleDownloadQRCode}>Baixar QR Code</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
