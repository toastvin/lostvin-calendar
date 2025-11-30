import '@/styles/print.css';

export default function TestPrintPage() {
  return (
    <main>
      {/* 화면에만 표시되는 영역 */}
      <div className="no-print container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Week 0: 프린트 CSS 테스트</h1>

        <div className="space-y-4 mb-8">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">테스트 방법</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>브라우저의 인쇄 기능을 실행하세요 (Ctrl+P / Cmd+P)</li>
              <li>인쇄 미리보기에서 다음을 확인하세요:</li>
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                <li>이 파란색 안내 영역이 숨겨지는지</li>
                <li>페이지 나누기가 정상 작동하는지</li>
                <li>배경색이 출력되는지</li>
                <li>A4 크기가 맞는지</li>
              </ul>
            </ol>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">브라우저별 설정</h2>
            <div className="space-y-2 text-sm">
              <div>
                <strong className="text-blue-600">Chrome:</strong> "기타 설정" → "배경 그래픽" 체크
              </div>
              <div>
                <strong className="text-orange-600">Safari:</strong> 시스템 환경설정 → 배경색 출력 활성화
              </div>
              <div>
                <strong className="text-red-600">Firefox:</strong> "페이지 설정" → "배경색과 이미지 출력" 체크
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 프린트될 내용 - 페이지 1 */}
      <div className="w-[210mm] h-[297mm] p-12 bg-white mx-auto shadow-lg mb-8">
        <h1 className="text-4xl font-bold text-center mb-8">프린트 테스트 - 페이지 1</h1>

        <div className="space-y-6">
          <div className="p-4 bg-blue-100 rounded">
            <h2 className="text-2xl font-semibold mb-2">배경색 테스트</h2>
            <p>이 파란색 배경이 프린트에서도 보여야 합니다.</p>
          </div>

          <div className="p-4 bg-green-100 rounded">
            <h2 className="text-2xl font-semibold mb-2">초록색 배경 테스트</h2>
            <p>이 초록색 배경이 프린트에서도 보여야 합니다.</p>
          </div>

          <div className="p-4 bg-yellow-100 rounded">
            <h2 className="text-2xl font-semibold mb-2">노란색 배경 테스트</h2>
            <p>이 노란색 배경이 프린트에서도 보여야 합니다.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">달력 샘플 (2025년 1월)</h3>
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-2">일</th>
                  <th className="border border-gray-400 p-2">월</th>
                  <th className="border border-gray-400 p-2">화</th>
                  <th className="border border-gray-400 p-2">수</th>
                  <th className="border border-gray-400 p-2">목</th>
                  <th className="border border-gray-400 p-2">금</th>
                  <th className="border border-gray-400 p-2">토</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2 text-center"></td>
                  <td className="border border-gray-400 p-2 text-center"></td>
                  <td className="border border-gray-400 p-2 text-center"></td>
                  <td className="border border-gray-400 p-2 text-center">1</td>
                  <td className="border border-gray-400 p-2 text-center">2</td>
                  <td className="border border-gray-400 p-2 text-center">3</td>
                  <td className="border border-gray-400 p-2 text-center">4</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-center">5</td>
                  <td className="border border-gray-400 p-2 text-center">6</td>
                  <td className="border border-gray-400 p-2 text-center">7</td>
                  <td className="border border-gray-400 p-2 text-center">8</td>
                  <td className="border border-gray-400 p-2 text-center">9</td>
                  <td className="border border-gray-400 p-2 text-center">10</td>
                  <td className="border border-gray-400 p-2 text-center">11</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 페이지 나누기 */}
      <div className="page-break"></div>

      {/* 프린트될 내용 - 페이지 2 */}
      <div className="w-[210mm] h-[297mm] p-12 bg-white mx-auto shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">프린트 테스트 - 페이지 2</h1>

        <div className="space-y-6">
          <div className="p-4 bg-red-100 rounded">
            <h2 className="text-2xl font-semibold mb-2">페이지 나누기 테스트</h2>
            <p>이 내용은 새로운 페이지에 인쇄되어야 합니다.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">공휴일 표시 테스트</h3>
            <ul className="space-y-2">
              <li className="p-2 bg-red-50 rounded">
                <span className="font-semibold text-red-600">1월 1일</span> - 신정
              </li>
              <li className="p-2 bg-red-50 rounded">
                <span className="font-semibold text-red-600">3월 1일</span> - 삼일절
              </li>
              <li className="p-2 bg-red-50 rounded">
                <span className="font-semibold text-red-600">5월 5일</span> - 어린이날
              </li>
            </ul>
          </div>

          <div className="mt-8 p-4 border-2 border-dashed border-gray-400">
            <h3 className="text-lg font-semibold mb-2">✅ 확인 사항</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>페이지 1과 2가 별도 페이지로 분리되었는가?</li>
              <li>모든 배경색이 정상 출력되는가?</li>
              <li>파란색 안내 영역은 숨겨졌는가?</li>
              <li>표 테두리가 정상 출력되는가?</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
