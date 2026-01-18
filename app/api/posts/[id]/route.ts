import { getPostById, updatePost, deletePost } from "@/lib/actions/post";
import { verifyApiAuth, unauthorizedResponse } from "@/lib/auth/api-auth";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

/**
 * GET /api/posts/:id
 * 글 상세 조회
 */
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = await params;
        const post = await getPostById(id);

        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error("API Error fetching post:", error);
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/posts/:id
 * 글 수정 (작성자만 가능)
 */
export async function PUT(
    request: NextRequest,
    { params }: RouteParams
) {
    // 인증 확인
    const user = await verifyApiAuth(request);
    if (!user) {
        return unauthorizedResponse();
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const { title, content, category } = body;

        // FormData 생성
        const formData = new FormData();
        formData.append("title", title || "");
        formData.append("content", content || "");
        formData.append("category", category || "");

        // Server Action 호출
        await updatePost(id, formData);

        return NextResponse.json(
            { message: "Post updated successfully", id },
            { status: 200 }
        );
    } catch (error) {
        console.error("API Error updating post:", error);
        return NextResponse.json(
            { error: "Failed to update post" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/posts/:id
 * 글 삭제 (작성자만 가능)
 */
export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
) {
    // 인증 확인
    const user = await verifyApiAuth(request);
    if (!user) {
        return unauthorizedResponse();
    }

    try {
        const { id } = await params;
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get("category") || "general";

        // Server Action 호출
        await deletePost(id, category);

        return NextResponse.json(
            { message: "Post deleted successfully", id },
            { status: 200 }
        );
    } catch (error) {
        console.error("API Error deleting post:", error);
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}

