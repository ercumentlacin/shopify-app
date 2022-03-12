import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default function Main({ children }: IProps) {
  return (
    <main className="main">
      {children}
    </main>
  );
}
