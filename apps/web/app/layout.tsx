import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChessMat',
  description: 'Online multiplayer chess for web, iOS and Android.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
