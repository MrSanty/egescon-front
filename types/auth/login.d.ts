import { Menu } from '../shared/response';

export interface LoginResponseData {
  id: string;
  email: string;
  name: string;
  companyId: string;
  permissions: string[];
  menus: Menu[];
}
