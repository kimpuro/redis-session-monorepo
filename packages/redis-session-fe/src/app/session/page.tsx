'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

interface SessionInfo {
  sessionId: string;
  userId: string;
  cookie: {
    maxAge: number;
    expires: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: string;
  };
}

export default function SessionPage() {
  const router = useRouter();
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    checkAuthAndFetchSession();
  }, []);

  useEffect(() => {
    if (sessionInfo) {
      const timer = setInterval(() => {
        setRemainingTime(formatRemainingTime(sessionInfo.cookie.expires));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [sessionInfo]);

  const checkAuthAndFetchSession = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/status', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          fetchSessionInfo();
        } else {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('인증 상태 확인 실패:', error);
      router.push('/login');
    }
  };

  const fetchSessionInfo = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/session', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setSessionInfo(data);
        setRemainingTime(formatRemainingTime(data.cookie.expires));
      }
    } catch (error) {
      console.error('세션 정보 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleExpireSession = async () => {
    if (!confirm('현재 세션을 만료시키겠습니까? 로그인 페이지로 이동합니다.')) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/auth/session', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('세션 만료 실패:', error);
    }
  };

  const formatRemainingTime = (expires: string) => {
    const expiresDate = new Date(expires);
    const now = new Date();
    const diffMs = expiresDate.getTime() - now.getTime();
    
    if (diffMs <= 0) return '만료됨';
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">세션 관리</h1>
                <p className="mt-1 text-sm text-gray-500">
                  현재 Redis에 저장된 세션 정보를 확인하고 관리하세요
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                로그아웃
              </button>
            </div>
          </div>

          <Navigation />

          <div className="px-8 py-6">
            {sessionInfo && (
              <div className="max-w-4xl">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-8 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-purple-900 mb-2">
                        🔐 활성 세션
                      </h2>
                      <p className="text-purple-700">
                        Redis에 저장된 현재 세션 정보입니다
                      </p>
                    </div>
                    <button
                      onClick={handleExpireSession}
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      세션 만료시키기
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">세션 식별 정보</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">세션 ID</p>
                        <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded break-all">
                          {sessionInfo.sessionId}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">사용자 ID</p>
                        <p className="text-base text-gray-900">{sessionInfo.userId}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">세션 만료 정보</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">만료 시간</p>
                        <p className="text-base text-gray-900">
                          {new Date(sessionInfo.cookie.expires).toLocaleString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">남은 시간</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {remainingTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">쿠키 보안 설정</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            sessionInfo.cookie.httpOnly ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {sessionInfo.cookie.httpOnly ? (
                              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-semibold text-gray-900">HttpOnly</h4>
                          <p className="mt-1 text-sm text-gray-600">
                            {sessionInfo.cookie.httpOnly 
                              ? 'JavaScript에서 쿠키 접근 불가 (보안 강화)'
                              : 'JavaScript에서 쿠키 접근 가능'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            sessionInfo.cookie.secure ? 'bg-green-100' : 'bg-yellow-100'
                          }`}>
                            {sessionInfo.cookie.secure ? (
                              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-semibold text-gray-900">Secure</h4>
                          <p className="mt-1 text-sm text-gray-600">
                            {sessionInfo.cookie.secure 
                              ? 'HTTPS 연결에서만 쿠키 전송'
                              : 'HTTP/HTTPS 모두 쿠키 전송 (개발 모드)'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-semibold text-gray-900">SameSite</h4>
                          <p className="mt-1 text-sm text-gray-600">
                            {sessionInfo.cookie.sameSite.toUpperCase()} - CSRF 공격 방지
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-semibold text-gray-900">MaxAge</h4>
                          <p className="mt-1 text-sm text-gray-600">
                            {Math.floor(sessionInfo.cookie.maxAge / 1000 / 60 / 60)}시간 ({Math.floor(sessionInfo.cookie.maxAge / 1000 / 60 / 60 / 24)}일)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-800">
                        세션 정보는 Redis에 <code className="bg-blue-100 px-1 py-0.5 rounded">sess:{sessionInfo.sessionId}</code> 키로 저장되어 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

