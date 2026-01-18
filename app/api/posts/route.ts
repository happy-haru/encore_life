import { createPost, getPostsByCategory } from "@/lib/actions/post";
import { verifyApiAuth, unauthorizedResponse } from "@/lib/auth/api-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/posts
 * 새 커뮤니티 글 작성
 */
export async function POST(request: NextRequest) {
    // 인증 확인
    const user = await verifyApiAuth(request);
    if (!user) {
        return unauthorizedResponse();
    }

    try {
        const body = await request.json();
        const { title, content, category } = body;

        // 필수 필드 검증
        if (!title || !content || !category) {
            return NextResponse.json(
                { error: "Missing required fields: title, content, category" },
                { status: 400 }
            );
        }

        // FormData 생성 (Server Action은 FormData를 기대)
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);

        // Server Action 호출
        const newPost = await createPost(formData, { skipRedirect: true });

        // 성공 응답
        return NextResponse.json(
            {
                message: "Post created successfully",
                post: newPost
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("API Error creating post:", error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}

/**
 * GET /api/posts?category=xxx
 * 카테고리별 글 목록 조회
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get("category");

        if (!category) {
            return NextResponse.json(
                { error: "Category parameter is required" },
                { status: 400 }
            );
        }

        const posts = await getPostsByCategory(category);
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("API Error fetching posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}
