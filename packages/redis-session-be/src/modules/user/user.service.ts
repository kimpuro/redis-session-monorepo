import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor() {
    // 테스트용 하드코딩된 사용자 데이터 초기화
    this.initializeTestUsers();
  }

  private async initializeTestUsers() {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    this.users = [
      new User({
        id: '1',
        email: 'test@example.com',
        password: hashedPassword,
        name: '테스트 사용자',
        createdAt: new Date(),
      }),
      new User({
        id: '2',
        email: 'admin@example.com',
        password: hashedPassword,
        name: '관리자',
        createdAt: new Date(),
      }),
    ];
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  // 비밀번호를 제외한 안전한 사용자 정보 반환
  getSafeUser(user: User): Omit<User, 'password'> {
    const { password, ...safeUser } = user;
    return safeUser;
  }
}

