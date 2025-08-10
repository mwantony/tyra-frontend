import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export const CustomDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  confirm: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, confirm }) => {
  const handleClose = () => {
    // Remove pointer-events do body

    onClose();
    document.body.style.removeProperty('pointer-events'); // Reativa interações
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Fechar
          </Button>
          <Button className="ml-2" onClick={confirm}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
