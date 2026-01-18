"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function SettingsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-20">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">설정</h1>
                    <div className="p-12 border rounded-lg bg-muted/10 text-center">
                        <p className="text-muted-foreground">
                            환경 설정 기능이 준비 중입니다.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
