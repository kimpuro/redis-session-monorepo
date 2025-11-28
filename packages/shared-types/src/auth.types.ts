import { PublicUser } from './user.types';

/**
 * 회원가입 요청
 */
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

/**
 * 회원가입 응답
 */
export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: PublicUser;
}

/**
 * 로그인 요청
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 로그인 응답
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  user?: PublicUser;
}

/**
 * 로그아웃 응답
 */
export interface LogoutResponse {
  success: boolean;
  message: string;
}

/**
 * 현재 사용자 조회 응답
 */
export interface CurrentUserResponse {
  user: PublicUser | null;
  isAuthenticated: boolean;
}

