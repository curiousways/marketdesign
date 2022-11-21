import Link from 'next/link';

import NavLink from './NavLink';
import Logo from './Logo';

const Nav = () => {
  return (
    <div className="px-10 pb-8 pt-5 lg:flex justify-between items-end bg-white">
      <Link href="/" passHref>
        <a aria-label="Exeter Lindsay">
          <Logo />
        </a>
      </Link>
      <ul className="lg:flex gap-x-10 xl:gap-x-16 text-light-grey">
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink href="/about-the-model">About the model</NavLink>
        </li>
        <li>
          <NavLink href="/how-it-works">How it works</NavLink>
        </li>
        <li>
          <NavLink href="/live-demo">Live demo</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
