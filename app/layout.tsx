import "./globals.css";

import { Inter } from "next/font/google";
import { themeEffect } from "./theme-effect";
import { Analytics } from "./analytics";
import { Header } from "./header";
import { Footer } from "./footer";
import { doge } from "./doge";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yuuki008's blog",
  description: "ソフトウェアエンジニア Yuuki008 のブログです。開発の知見や技術的な挑戦、学びを共有しています。",
  openGraph: {
    title: "Yuuki008's blog",
    description: "ソフトウェアエンジニア Yuuki008 のブログです。開発の知見や技術的な挑戦、学びを共有しています。",
    url: "https://yuuki008.dev",
    siteName: "Yuuki008's blog",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nomu487495",
    creator: "@nomu487495",
  },
  metadataBase: new URL("https://yuuki008.com"),
};

export const viewport = {
  themeColor: "transparent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
      </head>

      <body className="dark:text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
