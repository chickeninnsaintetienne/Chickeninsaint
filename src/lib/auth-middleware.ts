import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
        headers: new Headers({
            'x-pathname': request.nextUrl.pathname,
        }),
    })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Missing Supabase environment variables in middleware')
        return { supabaseResponse, user: null }
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                        headers: new Headers({
                            'x-pathname': request.nextUrl.pathname,
                        }),
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    let user = null

    try {
        const { data, error } = await supabase.auth.getUser()
        
        if (error) {
            console.error('Auth error in middleware:', error.message)
            
            const allCookies = request.cookies.getAll()
            const supabaseCookies = allCookies.filter(cookie => 
                cookie.name.startsWith('sb-') || 
                cookie.name.includes('supabase')
            )
            
            supabaseCookies.forEach(cookie => {
                supabaseResponse.cookies.delete(cookie.name)
            })
        } else {
            user = data.user
        }
    } catch (error) {
        console.error('Unexpected auth error in middleware:', error)
    }

    return { supabaseResponse, user }
}

