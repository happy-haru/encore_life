"use client";

import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { KakaoLoginButton } from "@/components/auth/kakao-login-button";
import { InAppBrowserWarning } from "@/components/auth/in-app-browser-warning";
import { DevLoginButton } from "@/components/auth/dev-login-button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
    const searchParams = useSearchParams();
    const next = searchParams.get("next") || undefined;

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4">
            <InAppBrowserWarning />

            <div className="w-full max-w-md">
                {/* 로고 */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-col leading-none">
                                <span className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                    Encore
                                </span>
                                <span className="text-lg font-semibold text-muted-foreground tracking-wider">
                                    LIFE
                                </span>
                            </div>
                        </div>
                    </Link>
                    <p className="mt-4 text-lg text-muted-foreground">
                        경험이 빛나는 새로운 시작
                    </p>
                </div>

                {/* 로그인 카드 */}
                <div className="bg-background border-2 rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>

                    <div className="space-y-4">
                        {/* Kakao Login First for Korean Seniors */}
                        <KakaoLoginButton redirectTo={next} />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    또는
                                </span>
                            </div>
                        </div>

                        <GoogleLoginButton redirectTo={next} />

                        {/* 개발 환경 전용 테스트 버튼 */}
                        <DevLoginButton />

                        <div className="text-center text-sm text-muted-foreground">
                            로그인하면{" "}
                            <Link href="/terms" className="underline hover:text-primary">
                                이용약관
                            </Link>
                            {" "}및{" "}
                            <Link href="/privacy" className="underline hover:text-primary">
                                개인정보처리방침
                            </Link>
                            에 동의하는 것으로 간주됩니다.
                        </div>
                    </div>
                </div>

                {/* 하단 링크 */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                        ← 홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
