/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function DeleteAccountDialog({
  isOpen,
  onClose,
  handleDeleteAccount,
  isLoading,
}: any) {
  const [confirmationText, setConfirmationText] = useState("");

  const isConfirmationCorrect =
    confirmationText.trim() === "Eu quero deletar a conta";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza absoluta?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente sua
            conta e removerá todos os dados associados do nosso servidor.
            <br />
            <strong>
              Para confirmar, digite: &quot;Eu quero deletar a conta&quot;
            </strong>
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder='Digite "Eu quero deletar a conta"'
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          disabled={isLoading}
        />

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => onClose(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteAccount}
            disabled={!isConfirmationCorrect || isLoading}
            variant="destructive"
          >
            {isLoading ? "Excluindo..." : "Excluir Conta"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
