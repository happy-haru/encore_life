"use client";

import { useAuth } from "@/context/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updatePost, getPostById } from "@/lib/actions/post";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const categories = [
    { id: "free-board", title: "자유게시판 (성공담/질문/멘토링)" },
    { id: "job-info", title: "취업정보 (면접/채용/직무)" },
    { id: "education", title: "교육·자격증" },
    { id: "regional", title: "지역 모임" },
];

export default function EditPostPage({ params }: { params: { id: string } }) {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        getPostById(params.id).then((data) => {
            if (data) {
                setPost(data);
            } else {
                alert("게시글을 찾을 수 없습니다.");
                router.push("/community");
            }
            setIsLoading(false);
        });
    }, [params.id, router]);

    if (authLoading || isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    if (!user || (post && user.id !== post.user_id)) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">권한이 없습니다</h1>
                    <Button onClick={() => router.back()}>돌아가기</Button>
                </main>
                <Footer />
            </div>
        );
    }

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            await updatePost(params.id, formData);
        } catch (error) {
            console.error(error);
            alert("글 수정에 실패했습니다.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">글 수정하기</h1>

                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium">카테고리</label>
                            <Select name="category" defaultValue={post.category} required>
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
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">제목</label>
                            <Input name="title" defaultValue={post.title} placeholder="제목을 입력하세요" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-medium">내용</label>
                            <Textarea
                                name="content"
                                defaultValue={post.content}
                                placeholder="내용을 입력하세요"
                                className="min-h-[300px]"
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
                                        수정 중...
                                    </>
                                ) : (
                                    "수정하기"
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
