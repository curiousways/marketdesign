import Link from "next/link";

import Logo from "./LogoWhite";
import NavLink from "./NavLink";

const Footer = () => {
  return (
    <footer className="p-10 bg-green-dark lg:flex justify-between items-center">
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <ul className="lg:flex gap-x-10 xl:gap-x-16 text-white">
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
        <li>© {new Date().getFullYear()} Exeter Lindsay</li>
      </ul>
    </footer>
  );
};

export default Footer;
