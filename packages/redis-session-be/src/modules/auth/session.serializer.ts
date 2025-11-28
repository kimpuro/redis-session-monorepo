import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }

  serializeUser(user: any, done: (err: Error | null, id?: string) => void): void {
    done(null, user.id);
  }

  async deserializeUser(
    id: string,
    done: (err: Error | null, user?: any) => void,
  ): Promise<void> {
    try {
      const user = await this.authService.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}

