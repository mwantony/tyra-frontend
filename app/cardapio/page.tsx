"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import qrImage from "qr-image";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-provider";

export default function CardapioQRCodePage() {
  const [qrValue, setQrValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { restaurante } = useAuth();
  const [confirmDownload, setConfirmDownload] = useState(false);
  // Cria uma referência para o QR Code
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const loadCardapio = async () => {
      try {
        setIsLoading(true);
        const qrUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/cardapio/${restaurante.id}`;
        setQrValue(qrUrl);
      } catch (error) {
        toast.error("Erro ao carregar o cardápio");
        console.error("Erro ao buscar cardápio:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCardapio();
  }, []);

  const handleDownloadQRCode = () => {
    setConfirmDownload(true);
    try {
      const pngBuffer = qrImage.imageSync(qrValue, {
        type: "png",
        size: 10,
        margin: 2,
      });

      const blob = new Blob([pngBuffer], { type: "image/png" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download = "qr-code-cardapio.png";
      link.href = url;
      link.click();

      // Limpar URL criada
      setTimeout(() => URL.revokeObjectURL(url), 100);
      setConfirmDownload(false);

      toast.dismiss();
    } catch (error) {
      console.error("Erro ao baixar QR Code:", error);
      toast.dismiss();
      setConfirmDownload(false);

      toast.error("Erro ao baixar QR Code");
    }
  };

  return (
    <div className="min-h-150 flex items-center justify-center px-4 ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Cardápio Digital
          </CardTitle>
          <CardDescription className="text-center">
            Escaneie ou baixe o QR Code abaixo
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                Carregando QR Code...
              </p>
            </div>
          ) : (
            <>
              <div
                ref={qrCodeRef}
                className="p-4 bg-white border rounded-md flex flex-col items-center"
              >
                <QRCode
                  value={qrValue}
                  size={256}
                  level="H"
                  fgColor="#000000"
                  bgColor="#ffffff"
                />
              </div>

              <a
                className="w-full mb-2"
                href={qrValue}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant={"outline"} className="w-full">
                  {"Baixar PDF"}
                </Button>
              </a>
              <Button
                onClick={handleDownloadQRCode}
                className="w-full"
                disabled={confirmDownload}
              >
                {confirmDownload ? "Baixando..." : "Baixar QR Code"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
