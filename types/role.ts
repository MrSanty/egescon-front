export interface Permission {
  id: string;
  action: string;
  description: string | null;
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  permissions?: Permission[]; // Los permisos son opcionales y pueden venir anidados
}
