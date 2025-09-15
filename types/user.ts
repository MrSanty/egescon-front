import { Role } from './role';

export enum DocType {
  CC = 'CC',
  CE = 'CE',
  PPT = 'PPT',
  PASSPORT = 'PASSPORT',
}

export interface User {
  id: string;
  name: string;
  email: string;
  docType: DocType;
  docNum: string;
  isActive: boolean;
  companyId: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;

  role?: Role;
}
