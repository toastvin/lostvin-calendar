import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold">Lostvin Calendar</h1>
      <p className="mt-2 text-gray-600 text-lg">프린트용 달력 제작 웹서비스</p>

      <div className="mt-8 space-y-4">
        <div className="p-6 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Week 0: 기술 검증 단계</h2>
          <p className="text-gray-700 mb-4">
            MVP 구현 전 핵심 기술 리스크를 검증합니다.
          </p>

          <div className="space-y-2">
            <Link
              href="/test-pdf"
              className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
            >
              📄 PDF 한글 폰트 테스트
            </Link>
            <Link
              href="/test-holidays"
              className="block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
            >
              🎉 공휴일 데이터 테스트
            </Link>
            <Link
              href="/test-print"
              className="block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-center"
            >
              🖨️ 프린트 CSS 테스트
            </Link>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">검증 항목</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>@react-pdf/renderer 한글 폰트 임베딩</li>
            <li>공휴일 데이터 라이브러리 선정</li>
            <li>URL 파라미터 설계</li>
            <li>@media print CSS 테스트</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
