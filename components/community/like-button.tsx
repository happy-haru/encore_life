"use client";

import { toggleLike } from "@/lib/actions/like";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
    postId: string;
    initialCount: number;
    initialIsLiked: boolean;
    isLoggedIn: boolean;
}

export function LikeButton({ postId, initialCount, initialIsLiked, isLoggedIn }: LikeButtonProps) {
    const [count, setCount] = useState(initialCount);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleToggle = async () => {
        if (!isLoggedIn) {
            if (confirm("로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?")) {
                const currentPath = window.location.pathname;
                router.push(`/auth/login?next=${encodeURIComponent(currentPath)}`);
            }
            return;
        }

        // Optimistic update
        const previousIsLiked = isLiked;
        const previousCount = count;

        setIsLiked(!isLiked);
        setCount(isLiked ? count - 1 : count + 1);

        startTransition(async () => {
            try {
                await toggleLike(postId);
            } catch (error) {
                // Revert on error
                setIsLiked(previousIsLiked);
                setCount(previousCount);
                console.error(error);
                console.error(error);
                alert(error instanceof Error ? error.message : "처리 중 오류가 발생했습니다.");
            }
        });
    };

    return (
        <div className="flex justify-center mt-12 mb-8">
            <Button
                size="lg"
                variant="outline"
                onClick={handleToggle}
                disabled={isPending}
                className={cn(
                    "rounded-full px-8 py-6 h-auto flex flex-col items-center gap-2 border-2 transition-all duration-300 hover:scale-105",
                    isLiked
                        ? "border-pink-500 bg-pink-50 text-pink-600 hover:bg-pink-100 hover:border-pink-600"
                        : "border-slate-200 hover:border-pink-300 hover:bg-slate-50 text-slate-600"
                )}
            >
                <Heart
                    className={cn(
                        "h-8 w-8 transition-all duration-300",
                        isLiked ? "fill-pink-500 text-pink-500 scale-110" : "text-slate-400"
                    )}
                />
                <div className="flex flex-col items-center leading-none">
                    <span className={cn("text-lg font-bold", isLiked && "text-pink-600")}>
                        {isLiked ? "공감해요" : "공감하기"}
                    </span>
                    <span className="text-sm font-medium opacity-80">
                        {count}명
                    </span>
                </div>
            </Button>
        </div>
    );
}
