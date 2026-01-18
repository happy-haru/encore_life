import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { getPostById, deletePost } from "@/lib/actions/post";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ArrowLeft, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function PostPage({ params }: { params: { id: string } }) {
    const post = await getPostById(params.id);

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

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <Button variant="ghost" asChild className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                        <Link href={`/community/${post.category}`} className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            목록으로 돌아가기
                        </Link>
                    </Button>

                    <div className="border-b pb-6 mb-8">
                        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                        <div className="flex items-center justify-between text-muted-foreground">
                            <div className="flex items-center gap-4">
                                <span className="font-medium text-foreground">{post.author_name}</span>
                                <span>•</span>
                                <span>{format(new Date(post.created_at), "PPP p", { locale: ko })}</span>
                            </div>
                            {isOwner && (
                                <form action={handleDelete}>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        삭제
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
                        {post.content}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
