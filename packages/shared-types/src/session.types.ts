/**
 * Redis에 저장되는 세션 데이터
 */
export interface SessionData {
  userId: string;
  username: string;
  email: string;
  createdAt: number; // timestamp
  lastAccessedAt: number; // timestamp
}

/**
 * 세션 설정
 */
export interface SessionConfig {
  secret: string;
  cookieName: string;
  maxAge: number; // seconds
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'strict' | 'lax' | 'none';
}

