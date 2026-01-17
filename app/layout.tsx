import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "Encore Life - 경험이 빛나는 새로운 시작",
  description: "40-65세+ 중장년층을 위한 맞춤 재취업 플랫폼. 경력을 살려 새로운 시작을 준비하세요.",
  keywords: ["중장년 취업", "시니어 채용", "재취업", "경력직", "40대 채용", "50대 채용", "60대 채용"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
