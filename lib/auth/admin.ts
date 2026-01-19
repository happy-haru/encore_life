export function isAdmin(email: string | null | undefined): boolean {
    if (!email) return false;

    // 환경 변수에서 관리자 이메일 목록 가져오기 (콤마로 구분)
    // 예: ADMIN_EMAILS="admin@example.com,user@example.com"
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];

    return adminEmails.includes(email);
}
