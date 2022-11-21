export type RoleId = 'buyer' | 'seller' | 'generic';

export type Role = {
  label: string;
};

export type Roles = { [key in RoleId]: Role };
