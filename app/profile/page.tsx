"use client";

import { useAuth } from "@/context/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다</h1>
                    <Button asChild>
                        <a href="/auth/login">로그인 하러 가기</a>
                    </Button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-10">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">내 프로필</h1>

                    <div className="bg-card border rounded-lg p-8 shadow-sm">
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name} className="object-cover" />
                                <AvatarFallback>{user.email?.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 space-y-4 text-center sm:text-left">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">이름</label>
                                    <p className="text-xl font-semibold">{user.user_metadata.full_name || "사용자"}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">이메일</label>
                                    <p className="text-lg">{user.email}</p>
                                </div>

                                <div className="pt-4">
                                    <Button variant="outline">프로필 수정</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
