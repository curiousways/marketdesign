export type RoleId = 'buyer' | 'seller';

export type Role = {
  label: string;
};

export type Roles = { [key in RoleId]: Role };
