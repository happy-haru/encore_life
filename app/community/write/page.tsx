"use client";

import { useAuth } from "@/context/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createPost } from "@/lib/actions/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const categories = [
    { id: "free-board", title: "자유게시판 (성공담/질문/멘토링)" },
    { id: "job-info", title: "취업정보 (면접/채용/직무)" },
    { id: "education", title: "교육·자격증" },
    { id: "regional", title: "지역 모임" },
];

export default function WritePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    if (authLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    if (!user) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다</h1>
                    <p className="mb-6 text-muted-foreground">글을 작성하려면 로그인이 필요합니다.</p>
                    <Button onClick={() => router.push("/auth/login")}>로그인 하러 가기</Button>
                </main>
                <Footer />
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return; // Prevent double submission

        setIsSubmitting(true);
        try {
            const formData = new FormData(e.currentTarget);
            const result = await createPost(formData);
            // If successful, redirect to category page
            if (result?.success && result?.category) {
                router.push(`/community/${result.category}`);
            }
        } catch (error) {
            console.error(error);
            alert("글 작성에 실패했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">글쓰기</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2" onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
                            <label htmlFor="category" className="text-sm font-medium">카테고리</label>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="카테고리를 선택하세요" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* Hidden input to include category in form data */}
                            <input type="hidden" name="category" value={selectedCategory} />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">제목</label>
                            <Input name="title" placeholder="제목을 입력하세요" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-medium">내용</label>
                            <Textarea
                                name="content"
                                placeholder="내용을 입력하세요"
                                className="min-h-[300px]"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                취소
                            </Button>
                            <Button type="submit" disabled={isSubmitting || !selectedCategory}>
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
