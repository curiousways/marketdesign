import { FC } from 'react';
import { Nav } from '../Nav';

export const Footer: FC = () => (
  <footer className="p-10 gap-x-10 xl:gap-x-16 bg-green-dark lg:flex flex-row justify-end items-center text-white">
    <Nav
      className="items-center text-white"
      activeClassName="underline text-white"
      inactiveClassName="text-white"
      logoColor="white"
    />
    <span>© {new Date().getFullYear()} Exeter Lindsay</span>
  </footer>
);
