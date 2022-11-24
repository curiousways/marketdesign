import React, { FC } from 'react';
import Link from 'next/link';

import { NavLink } from '../NavLink';
import { Logo } from '../Logo';
import { classNames } from '../../../utils';

type NavProps = {
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  logoColor?: string;
};

export const Nav: FC<NavProps> = ({
  className,
  activeClassName,
  inactiveClassName,
  logoColor,
}: NavProps) => (
  <nav
    className={classNames('lg:flex justify-between items-end', className)}
    aria-label="Main Navigation"
  >
    <Link href="/" aria-label="Exeter Lindsay">
      <Logo color={logoColor} />
    </Link>
    <ul className="lg:flex gap-x-10 xl:gap-x-16 text-light-grey">
      <li>
        <NavLink
          href="/"
          activeClassName={activeClassName}
          inactiveClassName={inactiveClassName}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          href="/about-the-model"
          activeClassName={activeClassName}
          inactiveClassName={inactiveClassName}
        >
          About the model
        </NavLink>
      </li>
      <li>
        <NavLink
          href="/how-it-works"
          activeClassName={activeClassName}
          inactiveClassName={inactiveClassName}
        >
          How it works
        </NavLink>
      </li>
      <li>
        <NavLink
          href="/live-demo"
          activeClassName={activeClassName}
          inactiveClassName={inactiveClassName}
        >
          Live demo
        </NavLink>
      </li>
    </ul>
  </nav>
);
