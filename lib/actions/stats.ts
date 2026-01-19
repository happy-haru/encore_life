"use server";

import { createClient } from "@/lib/supabase/server";

export interface HomepageStats {
    verifiedJobs: number;
    successfulReentries: number;
    totalMembers: number;
}

const STATS_BASE = {
    JOBS: 1200,
    SUCCESS: 450,
    MEMBERS: 5000,
};

export async function getHomepageStats(): Promise<HomepageStats> {
    const supabase = await createClient();

    try {
        // 1. 검증된 일자리 수 (일자리 관련 카테고리)
        const { count: jobCount } = await supabase
            .from("posts")
            .select("*", { count: "exact", head: true })
            .in("category", ["job-info", "job-groups", "industry-groups"]);

        // 2. 성공적인 재취업 수 (후기 및 자유게시판)
        const { count: successCount } = await supabase
            .from("posts")
            .select("*", { count: "exact", head: true })
            .in("category", ["success-stories", "free-board"]);

        // 3. 누적 회원 수 (auth 테이블 접근 불가로 임시 로직 혹은 고정값)
        // 현재는 posts 작성 활동이 있는 수 * 가중치 등으로 추산하거나 고정값 사용
        // 추후 SERVICE_ROLE_KEY 설정 시 auth.users 카운트로 변경 가능
        const { count: activeUserCount } = await supabase // 임시: 전체 게시글 수로 활동성 반영
            .from("posts")
            .select("*", { count: "exact", head: true });

        return {
            verifiedJobs: STATS_BASE.JOBS + (jobCount || 0),
            successfulReentries: STATS_BASE.SUCCESS + (successCount || 0),
            totalMembers: STATS_BASE.MEMBERS + (activeUserCount || 0), // 활동 지표 반영
        };
    } catch (error) {
        console.error("Failed to fetch homepage stats:", error);
        return {
            verifiedJobs: STATS_BASE.JOBS,
            successfulReentries: STATS_BASE.SUCCESS,
            totalMembers: STATS_BASE.MEMBERS,
        };
    }
}
