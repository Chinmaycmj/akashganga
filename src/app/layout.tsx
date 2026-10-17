import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AudioProvider } from '@/context/AudioContext';
import { UserProgressProvider } from '@/context/UserProgressContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'The Infinite Cosmos — Interactive Universe-Learning Platform',
  description:
    'Start at the center of Earth. Keep zooming outward through 14 cosmic stages to the edge of the observable universe. Experiment with black holes, orbital mechanics, and spacetime.',
  keywords: [
    'astronomy',
    'cosmology',
    'interactive 3D',
    'space simulation',
    'observable universe',
    'black hole',
    'general relativity',
    'educational',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white`}
      >
        <AudioProvider>
          <UserProgressProvider>
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </UserProgressProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
