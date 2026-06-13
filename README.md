# 일본 생활/여행 회화 PWA

한국인이 일본 생활과 여행 중 인터넷 없이 쓰기 위한 오프라인 일본어 회화 앱입니다.

## 사용 방법

1. 이 폴더를 정적 웹 호스팅에 올립니다. GitHub Pages, Netlify, Vercel, 개인 서버 모두 가능합니다.
2. iPhone Safari에서 배포 주소에 접속합니다.
3. 공유 버튼을 누르고 "홈 화면에 추가"를 선택합니다.
4. 한국에서 출국 전에 비행기 모드로 바꾼 뒤 검색, 즐겨찾기, TTS 재생을 테스트합니다.

## 포함 기능

- 2,961개 일본 생활/여행 문장
- 한국어 검색, 태그 검색, 동의어 검색
- 앱 안의 단어장과 규칙으로 만드는 오프라인 작문
- 일본어 원문, 한글 발음, 한국어 뜻 표시
- 기기 내장 일본어 TTS 재생
- 크게 보기 모드
- 즐겨찾기와 최근 사용 로컬 저장
- 오프라인 캐시용 service worker
- iPhone 홈 화면 추가용 manifest와 아이콘

## 로컬 테스트

```bash
cd outputs/japan-travel-phrase-pwa
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173`을 열면 됩니다. service worker는 `file://`이 아니라 `localhost`나 HTTPS에서 동작합니다.

## 데이터 갱신

문장 데이터와 아이콘은 아래 명령으로 다시 생성할 수 있습니다.

```bash
node tools/generate-phrases.mjs
node tools/generate-icons.mjs
```
