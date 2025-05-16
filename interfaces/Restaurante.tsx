export interface Restaurante {
    id: string;
    cnpj: string;
    nome_fantasia: string;
    razao_social: string;
    email: string;
    whatsapp: string;
    password?: string; // geralmente omitido em contextos de front-end
    plano_assinado_em: string; // formato ISO (ex: "2025-05-16")
    proxima_cobranca_em: string;
    created_at: string;
    updated_at: string;
    plano_id: string;
  }
  