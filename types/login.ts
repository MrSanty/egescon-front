import { Menu } from './response';

export interface LoginResponseData {
  id: string;
  email: string;
  name: string;
  companyId: string;
  nit: string;
  isSuperAdmin: boolean;
  permissions: string[];
  menus: Menu[];
}
