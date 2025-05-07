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
import logoDark from '@/assets/img/logo-dark.png';

export default function CardapioQRCodePage() {
  const [qrValue, setQrValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { restaurante } = useAuth();
  const [confirmDownload, setConfirmDownload] = useState(false);
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
      const qrBuffer = qrImage.imageSync(qrValue, {
        type: "png",
        size: 10,
        margin: 2,
      });
  
      const blob = new Blob([qrBuffer], { type: "image/png" });
      const url = URL.createObjectURL(blob);
  
      const img = new Image();
      const logo = new Image();
  
      img.crossOrigin = "anonymous";
      logo.crossOrigin = "anonymous";
  
      img.src = url;
      logo.src = logoDark.src;
  
      const onAssetsLoaded = () => {
        const canvas = document.createElement("canvas");
  
        const padding = 30;
        const textHeight = 30;
        const logoHeight = 60;
        const totalExtraSpace = padding * 2 + textHeight + logoHeight;
  
        canvas.width = Math.max(img.width, 400);
        canvas.height = img.height + totalExtraSpace;
  
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.error("Erro ao obter o contexto do canvas");
          toast.error("Erro ao gerar imagem");
          setConfirmDownload(false);
          return;
        }
  
        // Fundo branco
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Logo
        const logoWidth = logoHeight * (logo.width / logo.height);
        ctx.drawImage(
          logo,
          canvas.width / 2 - logoWidth / 2,
          padding,
          logoWidth,
          logoHeight
        );
  
        // Nome do restaurante
        ctx.fillStyle = "#000000";
        ctx.font = "bold 24px Poppins"; // Substituir Poppins por Arial para compatibilidade
        ctx.textAlign = "center";
        ctx.fillText(
          restaurante.nome || "Cardápio Digital",
          canvas.width / 2,
          padding + logoHeight + 30
        );
  
        // QR Code
        const qrOffsetY = padding + logoHeight + textHeight + 20;
        ctx.drawImage(
          img,
          canvas.width / 2 - img.width / 2,
          qrOffsetY
        );
  
        // Instrução abaixo do QR
        ctx.font = "16px Arial";
        ctx.fillText(
          "Escaneie para acessar o cardápio digital",
          canvas.width / 2,
          qrOffsetY + img.height + 30
        );
  
        canvas.toBlob((finalBlob) => {
          if (!finalBlob) {
            console.error("Erro ao gerar o blob do canvas");
            toast.error("Erro ao gerar imagem");
            setConfirmDownload(false);
            return;
          }
  
          const downloadUrl = URL.createObjectURL(finalBlob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = `qr-code-cardapio-${(restaurante.nome || '')}`.replace(/\s+/g, '-').toLowerCase() + `.png`;
          link.click();
  
          setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
          setConfirmDownload(false);
          toast.dismiss();
        }, "image/png");
      };
  
      // Aguarda carregamento dos dois
      img.onload = () => {
        if (logo.complete) onAssetsLoaded();
        else logo.onload = onAssetsLoaded;
      };
  
      img.onerror = (e) => {
        console.error("Erro ao carregar imagem do QR:", e);
        toast.error("Erro ao gerar imagem");
        setConfirmDownload(false);
      };
  
      logo.onerror = (e) => {
        console.error("Erro ao carregar o logo:", e);
        toast.error("Erro ao gerar logo");
        setConfirmDownload(false);
      };
  
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
        {restaurante.plano_id !== 1 ? (
          <>
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
                      size={200}
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="mt-4 text-sm text-muted-foreground">
              Recurso não disponível no Plano Básico{" "}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}