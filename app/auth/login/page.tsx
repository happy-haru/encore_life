import { GoogleLoginButton } from "@/components/auth/google-login-button";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4">
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
                        <GoogleLoginButton />

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
