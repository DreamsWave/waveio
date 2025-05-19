import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import { DemoBadge } from '@/components/DemoBadge';
import { routing } from '@/libs/i18nRouting';
import { ThemeProvider } from '@/libs/theme';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'default';
  const colorMode = cookieStore.get('color-mode')?.value || 'system';
  const themePc = cookieStore.get('theme-pc')?.value || 'inherit';
  const colorModePc = cookieStore.get('color-mode-pc')?.value || 'inherit';

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const initialScript = `
(function() {
const theme = "${theme}";
const colorMode = "${colorMode}";
const themePc = "${themePc}";
const colorModePc = "${colorModePc}";
const systemColorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const resolvedColorMode = colorMode === 'system' ? systemColorMode : colorMode;
document.documentElement.setAttribute('data-global-theme', \`\${theme}-\${resolvedColorMode}\`);
const pcColorMode = colorModePc === 'inherit' ? colorMode : colorModePc;
const pcResolvedColorMode = pcColorMode === 'system' ? systemColorMode : pcColorMode;
const pcResolvedTheme = themePc === 'inherit' ? \`\${theme}-\${resolvedColorMode}\` : \`\${themePc}-\${pcResolvedColorMode}\`;
document.documentElement.setAttribute('data-pc-theme', pcResolvedTheme);
})();
`;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initialScript }} />
      </head>
      <body className="font-sharetech">
        <ThemeProvider storageKey="theme">
          <NextIntlClientProvider>
            <PostHogProvider>
              {props.children}
            </PostHogProvider>
            <DemoBadge />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
