// middleware.ts
import { NextResponse } from "next/server"

export function middleware(request: any) { // request: NextRequest
    const response = NextResponse.next()

    // check for session cart cookie
    if (!request.cookies.get("sessionCartId")) {
        // Generate new session card id cookie
        const sessionCartId = crypto.randomUUID()
        console.log("Generated new session cart:", sessionCartId)

        // clone the req headers
        const newRequestHeaders = new Headers(request.headers);

        // create new response and add the new headers
        const res = NextResponse.next({
            request: {
                headers: newRequestHeaders
            }
        })
        // set new generated sessionCartId in the response cookies
        res.cookies.set("sessionCartId", sessionCartId) // , { path: "/" }

        return res;
    }

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
// export { auth as middleware } from '@/auth.config'