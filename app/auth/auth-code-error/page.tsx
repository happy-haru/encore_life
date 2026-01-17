import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function AuthCodeErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const errorMessage = searchParams.error || "인증 처리 중 문제가 발생했습니다.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">로그인 오류</h1>
        <p className="mb-4 text-gray-600 bg-red-50 p-4 rounded-md border border-red-100 text-sm break-all">
          {errorMessage}
        </p>
        <p className="mb-8 text-sm text-gray-500">
          잠시 후 다시 시도해주시거나 관리자에게 문의해주세요.
        </p>
        <Button asChild className="w-full">
          <Link href="/auth/login">로그인 페이지로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
