import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    
    if (!user) {
      return null;
    }

    const isPasswordValid = await this.userService.validatePassword(user, password);
    
    if (!isPasswordValid) {
      return null;
    }

    return this.userService.getSafeUser(user);
  }

  async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findById(id);
    
    if (!user) {
      return null;
    }

    return this.userService.getSafeUser(user);
  }
}

