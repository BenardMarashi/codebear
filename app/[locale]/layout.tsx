import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import GradientBackground from '@/components/Gradientbackground';
import '../globals.css';
import '../../components/process-animations.css';


const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Code Bear - AI Automation Partner',
  description: 'Transforming workflows with AI powered automation',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className={outfit.className} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {/* Global animated background - appears across all pages */}
          <GradientBackground variant="global" />
          
          {/* Page content with relative positioning to appear above background */}
          <div className="relative z-10">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}