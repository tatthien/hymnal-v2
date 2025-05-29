import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const sans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Thánh Ca Tin Lành',
    template: '%s | Thánh Ca Tin Lành',
  },
  description: "Thánh Ca Tinh Lành, Tôn Vinh Chúa Hằng Hữu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={[
          sans.className,
          'antialiased leading-normal max-w-[600px] p-4 mx-auto'
        ].join(' ')}
      >
        <header className="mb-10">
          <div>
            <Link href='/' className="font-bold text-lg leading-snug">Hymnal</Link>
            <span className="block text-sm text-gray-600">a &quot;digital&quot; book of hymns</span>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
