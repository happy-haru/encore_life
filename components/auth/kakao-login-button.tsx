"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react"; // Using MessageCircle as a generic speech bubble for Kakao
import { useState } from "react";

export function KakaoLoginButton({ redirectTo }: { redirectTo?: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    const handleKakaoLogin = async () => {
        try {
            setIsLoading(true);
            const redirectUrl = new URL(`${window.location.origin}/auth/callback`);
            if (redirectTo) {
                redirectUrl.searchParams.set("next", redirectTo);
            }

            const { error } = await supabase.auth.signInWithOAuth({
                provider: "kakao",
                options: {
                    redirectTo: redirectUrl.toString(),
                },
            });

            if (error) {
                console.error("Error logging in with Kakao:", error.message);
                alert("카카오 로그인 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleKakaoLogin}
            disabled={isLoading}
            size="lg"
            className="w-full bg-[#FEE500] hover:bg-[#FDD835] text-black border-none text-lg px-8 py-6 h-auto relative"
        >
            {/* Kakao often uses a specific speech bubble icon. MessageCircle is a close approximation in Lucide. 
                For production, a custom SVG is recommended, but this fits the requested stack. 
            */}
            <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-2 fill-black"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 3C5.373 3 0 7.373 0 12.766c0 3.518 2.292 6.626 5.736 8.36L4.54 24l4.98-3.29c.813.226 1.666.35 2.48.35 6.627 0 12-4.373 12-9.766C24 5.867 18.627 3 12 3z" />
            </svg>
            {isLoading ? "로그인 중..." : "카카오로 1초 만에 로그인"}
        </Button>
    );
}
