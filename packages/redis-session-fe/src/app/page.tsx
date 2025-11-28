'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/status', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('인증 상태 확인 실패:', error);
      router.push('/login');
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
                <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Redis 세션 관리 시스템에 오신 것을 환영합니다
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
            {user && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  환영합니다, {user.name}님! 👋
                </h2>
                <p className="text-gray-600">
                  현재 로그인되어 있습니다. 상단 메뉴에서 사용자 정보와 세션 관리 페이지로 이동할 수 있습니다.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-blue-900">
                    사용자 정보
                  </h3>
                </div>
                <p className="text-sm text-blue-800 mb-3">
                  현재 로그인한 사용자의 상세 정보를 확인하세요.
                </p>
                <a href="/profile" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  보기 →
                </a>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-purple-900">
                    세션 관리
                  </h3>
                </div>
                <p className="text-sm text-purple-800 mb-3">
                  현재 세션 정보를 확인하고 관리하세요.
                </p>
                <a href="/session" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                  보기 →
                </a>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-green-900">
                    인증 완료
                  </h3>
                </div>
                <p className="text-sm text-green-800">
                  Redis 세션 기반 인증이 정상적으로 작동하고 있습니다.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                📚 시스템 정보
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">백엔드:</span>
                  <span className="ml-2 text-gray-600">NestJS + Redis</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">프론트엔드:</span>
                  <span className="ml-2 text-gray-600">Next.js 16</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">세션 저장소:</span>
                  <span className="ml-2 text-gray-600">Redis (node-redis)</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">인증 방식:</span>
                  <span className="ml-2 text-gray-600">Passport.js (Local)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

