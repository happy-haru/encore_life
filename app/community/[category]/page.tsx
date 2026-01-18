import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { getPostsByCategory } from "@/lib/actions/post";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { PenSquare } from "lucide-react";

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const category = params.category;
    const posts = await getPostsByCategory(category);

    // Map category ID to Korean title
    const categoryTitles: Record<string, string> = {
        "success-stories": "재취업 성공 스토리",
        "job-groups": "직종별 모임",
        "interview-reviews": "면접 후기 게시판",
        "mentoring": "멘토링 매칭",
        "education": "자격증/교육 정보",
        "qna": "Q&A 게시판",
        "regional": "지역별 모임",
    };

    const title = categoryTitles[category] || "커뮤니티";

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <Button asChild>
                            <Link href="/community/write">
                                <PenSquare className="mr-2 h-4 w-4" />
                                글쓰기
                            </Link>
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {posts.length === 0 ? (
                            <div className="text-center py-20 bg-muted/30 rounded-lg">
                                <p className="text-muted-foreground">아직 작성된 글이 없습니다. 첫 글을 작성해보세요!</p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/community/post/${post.id}`}
                                    className="block p-6 border rounded-lg hover:shadow-md transition-shadow bg-card"
                                >
                                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                    <div className="flex items-center text-sm text-muted-foreground gap-4">
                                        <span>{post.author_name}</span>
                                        <span>•</span>
                                        <span>
                                            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })}
                                        </span>
                                    </div>
                                    <p className="mt-3 text-muted-foreground line-clamp-2">
                                        {post.content}
                                    </p>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
