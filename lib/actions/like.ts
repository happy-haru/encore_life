"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("로그인이 필요합니다.");
    }

    // Check if like exists
    const { data: existingLike, error: checkError } = await supabase
        .from("post_likes")
        .select("*")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is 'not found'
        console.error("Error checking like:", checkError);
        if (checkError.code === '42P01' || checkError.code === 'PGRST205') {
            throw new Error("시스템 설정이 필요합니다. (DB 테이블 없음)");
        }
        throw new Error("공감 처리 중 오류가 발생했습니다.");
    }

    if (existingLike) {
        // Unlike
        const { error } = await supabase
            .from("post_likes")
            .delete()
            .eq("post_id", postId)
            .eq("user_id", user.id);

        if (error) throw new Error("공감 취소 실패");
    } else {
        // Like
        const { error } = await supabase
            .from("post_likes")
            .insert({
                post_id: postId,
                user_id: user.id
            });

        if (error) {
            console.error("Like toggle error:", error);
            if (error.code === '42P01' || error.code === 'PGRST205') { // relation does not exist
                throw new Error("시스템 설정이 필요합니다. (DB 테이블 없음)");
            }
            throw new Error("공감 실패");
        }
    }

    revalidatePath(`/community/post/${postId}`);
    return !existingLike; // Returns true if liked, false if unliked
}

export async function getLikeStatus(postId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Get count
    const { count, error: countError } = await supabase
        .from("post_likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", postId);

    if (countError) {
        console.error("Error fetching like count:", countError);
        return { count: 0, isLiked: false };
    }

    // Get user status
    let isLiked = false;
    if (user) {
        const { data, error } = await supabase
            .from("post_likes")
            .select("*")
            .eq("post_id", postId)
            .eq("user_id", user.id)
            .single();

        if (data) isLiked = true;
    }

    return { count: count || 0, isLiked };
}
