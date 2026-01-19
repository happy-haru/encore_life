import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/auth/admin";
import { PenSquare, BookOpen } from "lucide-react";
import { getPostsByCategory } from "@/lib/actions/post";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default async function GuidePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const isUserAdmin = isAdmin(user?.email);

    // 'guide' 카테고리의 글 목록 가져오기
    const posts = await getPostsByCategory("guide");

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">취업가이드</h1>
                            <p className="text-lg text-slate-600">
                                성공적인 재취업을 위한 알짜 정보를 모았습니다.
                            </p>
                        </div>

                        {/* 관리자에게만 보이는 글쓰기 버튼 */}
                        {isUserAdmin && (
                            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                                <Link href="/guide/write">
                                    <PenSquare className="mr-2 h-5 w-5" />
                                    가이드 작성하기
                                </Link>
                            </Button>
                        )}
                    </div>

                    <div className="space-y-6">
                        {posts.length === 0 ? (
                            <div className="text-center py-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-white rounded-full shadow-sm">
                                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-slate-900">등록된 가이드가 없습니다</h3>
                                        <p className="text-lg text-slate-500">곧 유용한 정보가 업데이트될 예정입니다.</p>
                                    </div>
                                    {isUserAdmin && (
                                        <Button asChild className="mt-4 rounded-full" size="lg">
                                            <Link href="/guide/write">
                                                첫 가이드 작성하기
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/community/post/${post.id}`} // 상세 페이지는 커뮤니티와 공유
                                    className="block group bg-white rounded-2xl border border-slate-200 hover:border-primary/50 p-6 md:p-8 transition-all hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                                            {post.title}
                                        </h2>

                                        <p className="text-xl text-slate-600 line-clamp-2 leading-relaxed">
                                            {post.content}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
                                            <div className="flex items-center gap-4 text-base text-slate-500">
                                                <span className="font-semibold text-slate-700">관리자</span>
                                                <span className="text-slate-300">|</span>
                                                <span className="flex items-center gap-1">
                                                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })}
                                                </span>
                                            </div>
                                            <span className="text-primary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                읽어보기 <span aria-hidden="true">&rarr;</span>
                                            </span>
                                        </div>
                                    </div>
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
