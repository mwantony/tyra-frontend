export function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, ""); 
  
    if (cleaned.length <= 10) {
      return cleaned.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else {
      return cleaned.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    }
  }
  