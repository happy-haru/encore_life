import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * API 라우트에서 JWT 토큰을 검증하고 사용자 정보를 반환
 */
export async function verifyApiAuth(request: NextRequest) {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.substring(7);
    const supabase = await createClient();

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return null;
        }

        return user;
    } catch {
        return null;
    }
}

/**
 * 인증되지 않은 요청에 대한 에러 응답
 */
export function unauthorizedResponse() {
    return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
    );
}
