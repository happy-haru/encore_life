import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { getPostsByCategory } from "@/lib/actions/post";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { PenSquare, User, Calendar, Heart } from "lucide-react";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const posts = await getPostsByCategory(category);

    // Map category ID to Korean title
    // Map category ID to Korean title
    const categoryTitles: Record<string, string> = {
        "free-board": "자유게시판",
        "job-info": "취업정보",
        "education": "교육·자격증",
        "regional": "지역 모임",
    };

    const title = categoryTitles[category] || "커뮤니티";

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{title}</h1>
                            <p className="text-lg text-slate-600">
                                {posts.length > 0
                                    ? `총 ${posts.length}개의 이야기가 있습니다.`
                                    : "아직 등록된 이야기가 없습니다."}
                            </p>
                        </div>
                        <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                            <Link href="/community/write">
                                <PenSquare className="mr-2 h-5 w-5" />
                                새 글 쓰기
                            </Link>
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {posts.length === 0 ? (
                            <div className="text-center py-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-white rounded-full shadow-sm">
                                        <PenSquare className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-slate-900">첫 번째 이야기를 들려주세요</h3>
                                        <p className="text-lg text-slate-500">당신의 경험이 누군가에게는 큰 힘이 됩니다.</p>
                                    </div>
                                    <Button asChild className="mt-4 rounded-full" size="lg">
                                        <Link href="/community/write">
                                            첫 글 작성하기
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/community/post/${post.id}`}
                                    className="block group bg-white rounded-2xl border border-slate-200 hover:border-primary/50 p-6 md:p-8 transition-all hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                                            {post.title}
                                        </h2>

                                        <p className="text-xl text-slate-600 line-clamp-2 leading-relaxed">
                                            {post.content}
                                        </p>


                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 mt-2 border-t border-slate-100">
                                            {/* 왼쪽: 글쓴이 + 시간 */}
                                            <div className="flex items-center gap-3 text-sm sm:text-base text-slate-500">
                                                <span className="font-semibold text-slate-700 flex items-center gap-2">
                                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">
                                                        {post.author_name[0]}
                                                    </div>
                                                    <span className="truncate max-w-[120px] sm:max-w-none">{post.author_name}</span>
                                                </span>
                                                <span className="text-slate-300">|</span>
                                                <span className="flex items-center gap-1 text-xs sm:text-sm">
                                                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })}
                                                </span>
                                            </div>

                                            {/* 오른쪽: 좋아요 + 더보기 */}
                                            <div className="flex items-center justify-between sm:justify-start gap-4">
                                                <div className="flex items-center gap-1.5 text-pink-600">
                                                    <Heart className="h-5 w-5 fill-pink-100" />
                                                    <span className="font-semibold">{post.like_count || 0}</span>
                                                </div>
                                                <span className="text-primary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform text-sm sm:text-base">
                                                    더 보기 <span aria-hidden="true">&rarr;</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </main >
            <Footer />
        </div >
    );
}
