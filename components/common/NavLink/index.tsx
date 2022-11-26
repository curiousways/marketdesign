import { FC, ReactNode } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { classNames } from '../../../utils';

type NavLinkProps = {
  href: string;
  children: ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
};

export const NavLink: FC<NavLinkProps> = ({
  children,
  href,
  activeClassName,
  inactiveClassName,
}: NavLinkProps) => {
  const router = useRouter();
  const isCurrent = router.asPath === href;

  return (
    <Link
      href={href}
      aria-current={isCurrent ? 'page' : undefined}
      className={classNames(
        'underline-offset-8 text-lg',
        isCurrent ? activeClassName : `hover:underline ${inactiveClassName}`,
      )}
    >
      {children}
    </Link>
  );
};
