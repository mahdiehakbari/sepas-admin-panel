import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userProfile = req.cookies.get('userProfile')?.value;

  if (userProfile && pathname === '/profile') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
