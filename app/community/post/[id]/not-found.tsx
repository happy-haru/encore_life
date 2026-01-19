"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function PostNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="bg-slate-50 p-8 rounded-full mb-6">
                <FileQuestion className="h-16 w-16 text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                게시글을 찾을 수 없습니다
            </h2>
            <p className="text-slate-600 text-lg mb-8 max-w-md break-keep leading-relaxed">
                요청하신 게시글이 삭제되었거나 존재하지 않는 주소입니다.<br />
                이전 페이지로 돌아가시거나 목록을 확인해주세요.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/community">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    커뮤니티 목록으로
                </Link>
            </Button>
        </div>
    );
}
