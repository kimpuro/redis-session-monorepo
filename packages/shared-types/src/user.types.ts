/**
 * 사용자 엔티티
 */
export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 비밀번호를 포함한 사용자 (내부 사용)
 */
export interface UserWithPassword extends User {
  passwordHash: string;
}

/**
 * 공개 사용자 정보 (비밀번호 제외)
 */
export type PublicUser = Omit<User, 'createdAt' | 'updatedAt'>;

