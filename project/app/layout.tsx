import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Öğrenci Hayatı - Akıllı İndirim Takibi',
  description: 'Öğrenciler için market indirimlerini takip et, akıllıca alışveriş yap ve tasarruf et.',
  keywords: 'öğrenci, indirim, market, tasarruf, A101, BİM, ŞOK, Migros',
  authors: [{ name: 'Öğrenci Hayatı' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            <Layout>
              {children}
            </Layout>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}