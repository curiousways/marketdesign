import React, { FC } from 'react';
import Link from 'next/link';

import { NavLink } from '../NavLink';
import Logo from '../Logo';

type NavProps = {
  activeClassName?: string;
};

export const Nav: FC<NavProps> = ({ activeClassName }: NavProps) => (
  <nav
    className="px-10 pb-8 pt-5 lg:flex justify-between items-end bg-white"
    aria-label="Main Navigation"
  >
    <Link href="/" aria-label="Exeter Lindsay">
      <Logo />
    </Link>
    <ul className="lg:flex gap-x-10 xl:gap-x-16 text-light-grey">
      <li>
        <NavLink href="/" activeClassName={activeClassName}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink href="/about-the-model" activeClassName={activeClassName}>
          About the model
        </NavLink>
      </li>
      <li>
        <NavLink href="/how-it-works" activeClassName={activeClassName}>
          How it works
        </NavLink>
      </li>
      <li>
        <NavLink href="/live-demo" activeClassName={activeClassName}>
          Live demo
        </NavLink>
      </li>
    </ul>
  </nav>
);
