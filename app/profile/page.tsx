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

    // 로그인 제공자 정보 추출
    const provider = user.app_metadata?.provider || "email";
    const providerName = provider === "kakao" ? "카카오" : provider === "google" ? "구글" : "이메일";

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

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">연동 계정</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        {provider === "kakao" && (
                                            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 3C6.48 3 2 6.58 2 11C2 13.8 3.75 16.3 6.4 17.8L5.2 21.7C5.1 22 5.4 22.3 5.7 22.1L10.3 19.3C10.9 19.4 11.4 19.5 12 19.5C17.5 19.5 22 15.9 22 11C22 6.58 17.5 3 12 3Z" fill="#3C1E1E" />
                                                </svg>
                                                <span className="font-medium text-sm">{providerName}</span>
                                            </div>
                                        )}
                                        {provider === "google" && (
                                            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                </svg>
                                                <span className="font-medium text-sm">{providerName}</span>
                                            </div>
                                        )}
                                        {provider === "email" && (
                                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="font-medium text-sm">{providerName}</span>
                                            </div>
                                        )}
                                    </div>
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
