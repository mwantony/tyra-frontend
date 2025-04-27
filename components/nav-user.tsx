"use client";

import {
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-provider";
import { useState } from "react";
import { Button } from "./ui/button";
import CustomModal from "./custom-modal";
import Link from "next/link";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile, setOpenMobile } = useSidebar(); // Adicione setOpenMobile
  const { restaurante, logout } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = () => {
    logout();
    setOpenDialog(false);
  };

  // Função para fechar o sidebar no mobile
  const handleItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage
                  src={user.avatar}
                  alt={restaurante.nome_fantasia}
                />
                <AvatarFallback className="rounded-lg">
                  {restaurante.nome_fantasia?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {restaurante.nome_fantasia}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {restaurante.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {restaurante.nome_fantasia?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {restaurante.nome_fantasia}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {restaurante.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/conta" passHref>
                <DropdownMenuItem onClick={handleItemClick}>
                  <UserCircleIcon className="mr-2 h-4 w-4" />
                  <span>Conta</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/planos" passHref>
                <DropdownMenuItem onClick={handleItemClick}>
                  <CreditCardIcon className="mr-2 h-4 w-4" />
                  <span>Planos e Cobranças</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {
                setOpenDialog(true);
                handleItemClick(); // Fecha o sidebar ao clicar em Sair
              }}
            >
              <LogOutIcon className="mr-2 h-4 w-4 text-destructive" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      <CustomModal isOpen={openDialog} onClose={() => setOpenDialog(false)}>
        <h4 className="text-lg font-semibold mb-4">
          Tem certeza de que deseja sair?
        </h4>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setOpenDialog(false)}>
            Cancelar
          </Button>
          <Button onClick={handleLogout}>Confirmar</Button>
        </div>
      </CustomModal>
    </SidebarMenu>
  );
}