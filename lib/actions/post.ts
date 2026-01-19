"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData, options?: { skipRedirect?: boolean }) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data, error } = await supabase.from("posts").insert({
        title,
        content,
        category,
        user_id: user.id,
        author_name: user.user_metadata.full_name || user.email?.split("@")[0] || "익명",
    }).select().single();

    if (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post");
    }

    revalidatePath(`/community/${category}`);
    revalidatePath("/community");

    // Return success with category for client-side redirect
    return { success: true, category };
}

export async function getPostsByCategory(category: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("posts")
        .select(`
            *,
            likes:post_likes(count)
        `)
        .eq("category", category)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    // Transform the data to include like_count
    return data.map(post => ({
        ...post,
        like_count: post.likes?.[0]?.count || 0
    }));
}

export async function getPostById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching post:", error);
        return null;
    }

    return data;
}

export async function deletePost(id: string, category: string) {
    const supabase = await createClient();

    // Check ownership is handled by RLS, but good to check user here too or let RLS handle it.
    // RLS will return error or 0 rows affected if not owner.

    const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting post:", error);
        throw new Error("Failed to delete post");
    }

    revalidatePath(`/community/${category}`);
}

export async function updatePost(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { error } = await supabase
        .from("posts")
        .update({
            title,
            content,
            category,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("user_id", user.id); // RLS handles this too, but good for safety

    if (error) {
        console.error("Error updating post:", error);
        throw new Error("Failed to update post");
    }

    revalidatePath(`/community/post/${id}`);
    revalidatePath(`/community/${category}`);
    redirect(`/community/post/${id}`);
}
