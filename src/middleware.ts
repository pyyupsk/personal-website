import { $Enums } from '@prisma/client';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(request: NextRequest) {
    const session = await auth();

    if (session?.user.role !== $Enums.Role.OWNER) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
};