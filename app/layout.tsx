import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/context/auth-context";
import { MenuProvider } from "@/context/menu-context";
import { InAppBrowserWarning } from "@/components/auth/in-app-browser-warning";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Encore Life",
  description: "경험이 빛나는 새로운 시작",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          <MenuProvider>
            <InAppBrowserWarning />
            {children}
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
