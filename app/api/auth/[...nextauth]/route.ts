import { handlers } from "@/auth.config";
import { NextResponse } from "next/server";

// async function GET() {
//         return NextResponse.json({success:true})
// }

export const { GET, POST } = handlers;
// export { handler as GET, handler as POST }