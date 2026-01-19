"use client";

import { useAuth } from "@/context/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/actions/post";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { isAdmin } from "@/lib/auth/admin";

export default function GuideWritePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user || !isAdmin(user.email)) {
                alert("관리자만 접근할 수 있습니다.");
                router.push("/guide");
            } else {
                setIsCheckingAdmin(false);
            }
        }
    }, [user, authLoading, router]);

    if (authLoading || isCheckingAdmin) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const formData = new FormData(e.currentTarget);
            // 카테고리를 강제로 'guide'로 설정
            formData.set("category", "guide");

            const result = await createPost(formData);

            if (result?.success) {
                router.push("/guide");
            }
        } catch (error) {
            console.error(error);
            alert("가이드 작성에 실패했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">취업가이드 작성</h1>
                    <p className="text-muted-foreground mb-6">
                        관리자 모드: 취업가이드 게시글을 작성합니다.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">제목</label>
                            <Input name="title" placeholder="가이드 제목을 입력하세요" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-medium">내용</label>
                            <Textarea
                                name="content"
                                placeholder="가이드 내용을 입력하세요 (Markdown 지원)"
                                className="min-h-[400px]"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                취소
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        작성 중...
                                    </>
                                ) : (
                                    "등록하기"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
