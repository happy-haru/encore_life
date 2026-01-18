import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // 빌드 시 환경 변수가 없을 경우 에러 방지를 위한 처리
    if (!supabaseUrl || !supabaseAnonKey) {
        return createBrowserClient(
            'https://placeholder.supabase.co',
            'placeholder-key'
        )
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
