import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Code Bear',
  description: 'Digital Agency',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}