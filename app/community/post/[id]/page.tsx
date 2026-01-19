import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { getPostById, deletePost } from "@/lib/actions/post";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ArrowLeft, User, Calendar, FolderOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/community/delete-button";
import { LikeButton } from "@/components/community/like-button";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const isOwner = user?.id === post.user_id;

    async function handleDelete() {
        "use server";
        if (!post) return;
        await deletePost(post.id, post.category);
        redirect(`/community/${post.category}`);
    }

    // 카테고리 한글 명칭 매핑
    const categoryTitles: Record<string, string> = {
        "success-stories": "재취업 성공 스토리",
        "industry-groups": "직종별 모임",
        "interview-reviews": "면접 후기 게시판",
        "mentoring": "멘토링 매칭",
        "education": "자격증/교육 정보",
        "qna": "Q&A 게시판",
        "regional": "지역별 모임",
    };

    const categoryTitle = categoryTitles[post.category] || "커뮤니티";

    // Fetch like status
    const { getLikeStatus } = await import("@/lib/actions/like");
    const { count: likeCount, isLiked } = await getLikeStatus(post.id);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto bg-background rounded-2xl shadow-sm border p-8 md:p-12">
                    {/* 상단 네비게이션 */}
                    <div className="mb-8">
                        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent text-lg text-muted-foreground hover:text-primary transition-colors">
                            <Link href={`/community/${post.category}`} className="flex items-center gap-2">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="font-medium">{categoryTitle} 목록으로</span>
                            </Link>
                        </Button>
                    </div>

                    {/* 헤더 섹션 */}
                    <div className="border-b-2 border-slate-100 pb-8 mb-10">
                        <div className="flex items-center gap-3 text-primary font-bold mb-4 bg-primary/10 w-fit px-4 py-1.5 rounded-full">
                            <FolderOpen className="h-4 w-4" />
                            <span>{categoryTitle}</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight text-slate-900 break-keep">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-between gap-4 text-slate-500 bg-slate-50 p-4 rounded-xl">
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    <span className="font-semibold text-slate-700 text-lg">{post.author_name}</span>
                                </div>
                                <div className="hidden md:block w-px h-4 bg-slate-300" />
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    <span className="text-lg">{format(new Date(post.created_at), "PPP p", { locale: ko })}</span>
                                </div>
                            </div>

                            {isOwner && (
                                <DeleteButton postId={post.id} category={post.category} />
                            )}
                        </div>
                    </div>

                    {/* 본문 콘텐츠 */}
                    <div className="prose prose-xl prose-slate max-w-none break-words whitespace-pre-wrap leading-loose text-slate-800">
                        {post.content}
                    </div>

                    {/* 공감 버튼 */}
                    <LikeButton
                        postId={post.id}
                        initialCount={likeCount}
                        initialIsLiked={isLiked}
                        isLoggedIn={!!user}
                    />

                    {/* 하단 네비게이션 (긴 글 읽은 후 편의성) */}
                    <div className="pt-10 border-t border-slate-100 flex justify-center">
                        <Button size="lg" asChild className="rounded-full px-8 py-6 text-lg">
                            <Link href={`/community/${post.category}`}>
                                목록으로 돌아가기
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
