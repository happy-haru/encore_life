import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function createClient() {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // 빌드 시 환경 변수가 없을 경우 에러 방지를 위한 처리
    if (!supabaseUrl || !supabaseAnonKey) {
        return createServerClient(
            'https://placeholder.supabase.co',
            'placeholder-key',
            { cookies: { getAll: () => [], setAll: () => { } } }
        )
    }

    return createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
