import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId?: string;
  username?: string;
  isLoggedIn: boolean;
}

// 세션 설정
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'redis-session-cookie',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 24시간
    sameSite: 'lax',
  },
};

// 세션 가져오기
export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  
  // 기본값 설정
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }
  
  return session;
}

