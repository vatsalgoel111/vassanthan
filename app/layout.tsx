import type {Metadata} from 'next';
import {Playfair_Display, Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vasanthakumar Guruvaiah | UAE Financial, Insurance & Real Estate Advisory',
  description:
    'Factual, transparent personal advisory for health insurance, real estate (Azizi Venice), wealth planning, and UAE visa documentation.',
  openGraph: {
    title: 'Vasanthakumar Guruvaiah | UAE Financial, Insurance & Real Estate Advisory',
    description:
      'Independent advisor for health insurance, Azizi Venice Dubai real estate, wealth planning, and UAE visa services.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vasanthakumar Guruvaiah | UAE Financial, Insurance & Real Estate Advisory',
    description:
      'Independent advisor for health insurance, Azizi Venice Dubai real estate, wealth planning, and UAE visa services.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#F8FAFC] text-slate-800 antialiased selection:bg-[#D4AF37] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
