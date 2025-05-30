import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { HeaderLink } from "@/components/HeaderLink";

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
          'antialiased leading-normal max-w-[600px] p-6 mx-auto'
        ].join(' ')}
      >
        <div className="flex flex-col md:flex-row gap-10">
          <div className="bg-white py-2 w-full md:w-[150px] shrink-0 flex flex-col gap-0 md:gap-2 sticky top-0 md:top-4 self-start">
            <Link href='/' className="font-bold text-lg leading-snug text-left md:text-right">A book of Hymns</Link>
            <HeaderLink />
          </div>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
