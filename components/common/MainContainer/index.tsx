import { FC, ReactNode } from 'react';

type MainContainerProps = {
  children: ReactNode;
};

export const MainContainer: FC<MainContainerProps> = ({
  children,
}: MainContainerProps) => (
  <main className="flex items-stretch font-poppins relative border-t border-green-dark min-h-screen">
    {children}
  </main>
);
