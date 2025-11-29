'use client';

import dynamic from 'next/dynamic';
import { FontTestPDF } from '@/lib/pdf/font-test';

// @react-pdf/renderer는 클라이언트에서만 작동 (SSR 비활성화)
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p className="text-gray-600">PDF 도구 로딩 중...</p>,
  }
);

export default function TestPDFPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Week 0: PDF 한글 폰트 테스트</h1>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">테스트 목적</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>@react-pdf/renderer의 한글 폰트 렌더링 검증</li>
            <li>Gowun Batang (명조체) 임베딩 테스트</li>
            <li>Noto Sans KR (고딕체) 임베딩 테스트</li>
            <li>PDF 생성 속도 측정</li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">다운로드</h2>
          <PDFDownloadLink
            document={<FontTestPDF />}
            fileName="font-test-korean.pdf"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {({ loading }) =>
              loading ? 'PDF 생성 중...' : 'PDF 다운로드'
            }
          </PDFDownloadLink>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">확인 사항</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>한글이 깨지지 않고 정상 표시되는지</li>
            <li>명조체와 고딕체가 구분되는지</li>
            <li>특수문자(한자, 기호)가 표시되는지</li>
            <li>PDF 생성 속도가 2초 이내인지</li>
          </ul>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">기술 스택</h2>
          <ul className="space-y-1 text-sm">
            <li><strong>라이브러리:</strong> @react-pdf/renderer v4.3.1</li>
            <li><strong>폰트:</strong> Gowun Batang, Noto Sans KR (Google Fonts)</li>
            <li><strong>용지:</strong> A4 (210mm × 297mm)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
