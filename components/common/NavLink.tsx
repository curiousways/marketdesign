import { ReactChildren, ReactChild } from "react";

import { useRouter } from "next/router";

type NavLinkProps = { href: string; children: ReactChild | ReactChildren };

function NavLink({ children, href }: NavLinkProps) {
  const router = useRouter();

  const sharedStyles = `underline-offset-8 text-lg`;

  const styles =
    router.asPath === href
      ? `${sharedStyles} underline text-green-dark`
      : `${sharedStyles} no-underline hover:underline text-current`;

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={styles}>
      {children}
    </a>
  );
}

export default NavLink;
