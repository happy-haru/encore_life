"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export function DevLoginButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const supabase = createClient();

    // 개발 환경이 아니면 렌더링하지 않음
    if (process.env.NODE_ENV !== "development") {
        return null;
    }

    const handleDevLogin = async () => {
        setIsLoading(true);
        setErrorMsg(null);
        const email = "test@example.com";
        const password = "password1234";

        try {
            // 1. 로그인 시도
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) {
                console.log("Login failed, attempting sign up...", signInError.message);

                // 2. 로그인 실패 시 회원가입 시도 (첫 실행 시)
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: "Test User",
                        }
                    }
                });

                if (signUpError) {
                    setErrorMsg(`가입 실패: ${signUpError.message}`);
                    setIsLoading(false);
                    return;
                }

                // 회원가입 직후 자동 로그인이 안 될 수도 있으니 다시 로그인 시도
                const { error: retryError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (retryError) {
                    setErrorMsg(`재로그인 실패: ${retryError.message}`);
                    setIsLoading(false);
                    return;
                }
            }

            // 3. 홈으로 이동
            window.location.href = "/";

        } catch (e: any) {
            console.error(e);
            setErrorMsg(`오류: ${e.message || "Unknown"}`);
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full mt-4 space-y-2">
            <Button
                variant="outline"
                onClick={handleDevLogin}
                disabled={isLoading}
                className="w-full border-dashed border-slate-400 text-slate-500 hover:bg-slate-50"
            >
                <Lock className="w-4 h-4 mr-2" />
                {isLoading ? "테스트 계정 접속 중..." : "테스트 계정으로 로그인 (Dev Only)"}
            </Button>
            {errorMsg && (
                <p className="text-red-500 text-xs text-center break-keep bg-red-50 p-2 rounded border border-red-100">
                    {errorMsg}
                </p>
            )}
        </div>
    );
}
