"use client";

import { deletePost } from "@/lib/actions/post";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
    postId: string;
    category: string;
}

export function DeleteButton({ postId, category }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        startTransition(async () => {
            try {
                await deletePost(postId, category);
                setShowConfirm(false);
                // Redirect to category list after successful deletion
                router.push(`/community/${category}`);
            } catch (error) {
                console.error(error);
                alert("글 삭제 중 오류가 발생했습니다.");
            }
        });
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfirm(true)}
                disabled={isPending}
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors pointer-events-auto"
            >
                <Trash2 className="h-4 w-4 mr-2" />
                삭제하기
            </Button>

            {/* Custom Modal Portal could be here, but for simplicity rendering inline with fixed position z-index */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full mx-4 border animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold mb-4 text-slate-900">글 삭제 확인</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            정말로 이 글을 삭제하시겠습니까?<br />
                            삭제된 글은 복구할 수 없습니다.
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setShowConfirm(false)}
                                className="px-5"
                            >
                                취소
                            </Button>
                            <Button
                                onClick={handleDelete}
                                disabled={isPending}
                                className="bg-red-600 hover:bg-red-700 text-white px-5"
                            >
                                {isPending ? "삭제 중..." : "네, 삭제합니다"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
