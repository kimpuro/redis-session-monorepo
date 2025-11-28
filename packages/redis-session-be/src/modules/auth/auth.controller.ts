import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Request() req, @Body() body: { email: string; password: string }) {
    return {
      message: '로그인 성공',
      user: req.user,
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req) {
    return new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) {
          reject(new UnauthorizedException('로그아웃 실패'));
        }
        req.session.destroy((sessionErr) => {
          if (sessionErr) {
            reject(new UnauthorizedException('세션 삭제 실패'));
          }
          resolve({ message: '로그아웃 성공' });
        });
      });
    });
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@CurrentUser() user: any) {
    return {
      user,
    };
  }

  @Get('status')
  async getAuthStatus(@Request() req) {
    return {
      authenticated: req.isAuthenticated(),
      user: req.user || null,
    };
  }

  @Get('session')
  @UseGuards(AuthGuard)
  async getSessionInfo(@Request() req) {
    const session = req.session;
    const sessionId = req.sessionID;
    
    return {
      sessionId,
      userId: req.user?.id,
      cookie: {
        maxAge: session.cookie.maxAge,
        expires: session.cookie.expires,
        httpOnly: session.cookie.httpOnly,
        secure: session.cookie.secure,
        sameSite: session.cookie.sameSite,
      },
    };
  }

  @Delete('session')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async expireSession(@Request() req) {
    return new Promise((resolve, reject) => {
      const sessionId = req.sessionID;
      
      req.logout((err) => {
        if (err) {
          reject(new UnauthorizedException('세션 만료 실패'));
        }
        req.session.destroy((sessionErr) => {
          if (sessionErr) {
            reject(new UnauthorizedException('세션 삭제 실패'));
          }
          resolve({ 
            message: '세션이 만료되었습니다',
            expiredSessionId: sessionId,
          });
        });
      });
    });
  }
}

