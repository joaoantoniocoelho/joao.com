import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'João Coelho | Software Engineer',
  description: 'Experienced Full Stack Developer with a strong focus on Node.js, React, TypeScript, AWS, and scalable enterprise applications. Proven success on delivering high-performance, cloud-native solutions.',
  keywords: [
    'Senior Software Engineer',
    'Full Stack Developer',
    'Node.js Developer',
    'React Developer',
    'TypeScript Developer',
    'AWS Cloud Engineer',
    'Enterprise Software',
    'Microservices Architecture',
    'Backend Developer',
    'Cloud Applications',
    'João Coelho Portfolio',
    'Software Engineer Brazil'
  ],
  authors: [{ name: 'João Antonio Stoll Coelho' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://joaoac.com',
    title: 'João Coelho | Software Engineer',
    description: 'Full Stack Developer with expertise in Node.js, React, TypeScript, and AWS.',
    siteName: 'João Coelho Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'João Coelho | Software Engineer',
    description: 'Building modern, scalable applications using Node.js, React, TypeScript, and AWS.',
    creator: '@joaoac',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}