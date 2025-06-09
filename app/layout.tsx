import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { HeaderLink } from "@/components/HeaderLink";
import { SearchBox } from "@/components/SearchBox";

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
          'antialiased leading-normal'
        ].join(' ')}
      >
        <div className="flex flex-col">
          <div className="sticky top-0 z-10">
            <SearchBox />
          </div>
          <div className="p-4 flex flex-col md:flex-row gap-10">
            <div className="bg-white py-2 w-full md:w-[200px] shrink-0 flex flex-col gap-1 md:gap-4 sticky top-0 md:top-[60px] self-start">
              <Link href='/' className="font-semibold text-lg leading-snug">A book of <span className="text-emerald-400">Hymns</span></Link>
              <HeaderLink />
            </div>
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
