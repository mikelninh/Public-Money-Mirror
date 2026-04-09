import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Public Money Mirror',
  description: 'Follow the flow. Every euro has a story.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

