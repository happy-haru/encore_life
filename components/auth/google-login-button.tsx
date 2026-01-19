"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { useState } from "react";

export function GoogleLoginButton({ redirectTo }: { redirectTo?: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            const redirectUrl = new URL(`${window.location.origin}/auth/callback`);
            if (redirectTo) {
                redirectUrl.searchParams.set("next", redirectTo);
            }

            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: redirectUrl.toString(),
                },
            });

            if (error) {
                console.error("Error logging in:", error.message);
                alert("로그인 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            size="lg"
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 text-lg px-8 py-6 h-auto"
        >
            <Chrome className="mr-2 h-5 w-5" />
            {isLoading ? "로그인 중..." : "Google로 로그인"}
        </Button>
    );
}
