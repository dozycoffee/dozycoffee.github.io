# 도지커피 기술블로그

도지커피 팀이 개발하며 배우고 고민한 내용을 기록하는 기술 블로그입니다.

☕️ https://dozycoffee.github.io

## 기술 스택

- [Astro](https://astro.build) 7 (정적 사이트 생성)
- Markdown / MDX 콘텐츠 (Sätteri 마크다운 처리기)
- GitHub Actions + GitHub Pages 배포

## 시작하기

Node.js `>=22.12.0`이 필요합니다.

```bash
npm install
npm run dev       # 개발 서버 (http://localhost:4321)
```

| 명령어             | 설명                                               |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | 개발 서버 실행. 초안(`draft: true`) 글도 함께 표시 |
| `npm run build`    | 프로덕션 빌드 (`dist/`). 초안 글은 제외            |
| `npm run preview`  | 빌드 결과 미리보기                                 |
| `npm test`         | 플러그인, 글 생성 스크립트 테스트                  |
| `npm run new-post` | 새 글과 이미지 폴더 생성                           |

## 글 쓰기

```bash
npm run new-post -- "글 제목" "Learn|Tech|Project" "작성자 이름"
```

글 파일은 `src/content/article/`, 이미지는 `src/assets/article/<글 파일명>/`에 생성됩니다. 작성 절차, frontmatter 필드, 이미지 규칙, 콜아웃 문법은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

## 프로젝트 구조

```text
├── public/               # 파비콘, 배너 등 그대로 서비스되는 정적 파일
├── scripts/              # 글 생성 스크립트와 테스트
├── src/
│   ├── assets/           # 로고, 기본 썸네일, 글별 이미지 (빌드 시 최적화)
│   ├── components/       # 헤더, 푸터, 글 카드 등
│   ├── content/article/  # 글 (Markdown / MDX)
│   ├── layouts/          # 글 상세, 글 목록 레이아웃
│   ├── pages/            # 라우트 (홈, 카테고리, 글 상세, RSS, 검색 인덱스 등)
│   ├── plugins/          # 마크다운 플러그인 (콜아웃, 수식)과 테스트
│   ├── styles/           # 전역 스타일
│   └── consts.ts         # 사이트 제목, 카테고리 목록
└── astro.config.mjs
```

## 배포

`main` 브랜치에 머지되면 GitHub Actions가 빌드해서 GitHub Pages로 자동 배포합니다. PR에서는 테스트와 빌드가 실행되며, 통과해야 머지할 수 있습니다.

## 기여하기

글 작성, 코드 변경 모두 PR로 진행합니다. 자세한 방법은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.
