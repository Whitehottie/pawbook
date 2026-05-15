export interface AdminAccount {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'admin';
}

export const staticAdminAccounts: AdminAccount[] = [
  {
    id: 'admin-1',
    email: 'admin@pawbook.com',
    password: 'admin123',
    name: 'System Administrator',
    phone: '555-0001',
    role: 'admin'
  },
  {
    id: 'admin-2', 
    email: 'clinic.manager@pawbook.com',
    password: 'manager123',
    name: 'Clinic Manager',
    phone: '555-0002',
    role: 'admin'
  }
];
