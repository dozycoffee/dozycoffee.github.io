# 기여 가이드

Dozy Coffee 기술 블로그에 글을 쓰거나 코드를 수정하는 방법입니다.

## 새 글 작성하기

1. 브랜치 생성

   ```bash
   git checkout -b post/글-주제
   ```

2. 스캐폴드 스크립트로 새 글 파일 생성

   ```bash
   npm run new-post -- "글 제목" "Tech|Project" "작성자 이름"
   ```

   `category`는 `Tech` 또는 `Project` 중 하나여야 합니다. `작성자 이름`을 생략하면 로컬 git 설정(`git config user.name`)이 자동으로 들어갑니다.

   `src/content/article/글-제목.md` 파일과 이미지 폴더 `src/assets/article/글-제목/`이 함께 생성됩니다. 글 파일은 아래처럼 만들어집니다.

   ```md
   ---
   title: '글 제목'
   description: ''
   author: '작성자 이름'
   category: 'Tech'
   tags: []
   pubDate: '2026-09-29'
   # heroImage: '../../assets/article/글-제목/thumbnail.webp'
   draft: true
   ---
   ```

3. 내용 작성 후 로컬에서 확인

   ```bash
   npm run dev
   ```

   초안(`draft: true`)은 `npm run dev`에서만 보이고, 배포된 사이트에는 노출되지 않습니다.

4. 공개할 준비가 되면 frontmatter의 `draft`를 `false`로 변경

5. 커밋 후 push, main으로 PR 생성

   ```bash
   git push -u origin post/글-주제
   ```

   PR을 열면 템플릿에 맞춰 체크리스트가 자동으로 채워집니다.

6. PR의 `build` CI 체크가 통과해야 머지할 수 있습니다 (frontmatter 오류, 깨진 MDX 문법 등을 자동으로 검출).

7. main으로 머지되면 GitHub Actions가 자동으로 빌드/배포합니다. 배포 후 https://dozycoffee.github.io 에서 몇 분 내로 반영됩니다.

## 이미지

썸네일과 본문 이미지는 모두 글의 이미지 폴더 `src/assets/article/<글 파일명>/`에 넣습니다. `npm run new-post`가 이 폴더를 만들어 줍니다. 글 파일(`src/content/article/`)에서 상대 경로로 가리킵니다.

```md
---
heroImage: '../../assets/article/글-제목/thumbnail.webp'
---

![흐름도 설명](../../assets/article/글-제목/flow.png)
```

- **형식**: jpg, png 등 어떤 형식으로 넣어도 됩니다. 빌드할 때 Astro가 자동으로 크기를 줄이고 WebP로 변환해서 배포하며, 저장소에 있는 원본은 그대로 유지됩니다. (SVG는 변환 없이 그대로 배포됩니다.)
- **크기**: 이미지는 한 번 커밋하면 git 이력에 계속 남습니다. 커밋 전에 가로 1600px 이하, 500KB 이하로 줄여 주세요.
- **썸네일 비율**: 목록과 글 상단에서 같은 이미지를 쓰며 표시 비율이 2:1이라, 1600×800처럼 2:1로 만드는 것을 권장합니다.
- **GIF/영상**: 저장소에 넣지 않고 외부 링크(유튜브 등)를 사용합니다.
- **설명(alt)**: `![설명](경로)`의 설명은 이미지가 안 보일 때와 스크린리더에 쓰이므로 비우지 말고 간단히 적어 주세요.

## Frontmatter 필드

| 필드          | 필수              | 설명                                                                    |
| ------------- | ----------------- | ------------------------------------------------------------------------ |
| `title`       | O                 | 글 제목                                                                 |
| `description` | O                 | 목록/RSS/메타태그에 쓰이는 요약                                         |
| `author`      | O                 | 작성자 표시 이름 (자유 문자열)                                          |
| `category`    | O                 | `Tech` 또는 `Project` 중 하나. 홈 화면 카테고리 탭 필터에 쓰임          |
| `tags`        | X (기본값 `[]`)   | 자유 태그 배열. 목록 카드에는 최대 3개까지만 노출                      |
| `pubDate`     | O                 | 발행일. `'YYYY-MM-DD'` 형식 권장                                        |
| `updatedDate` | X                 | 수정일. 있으면 상세 페이지에 "Last updated on" 표시                     |
| `heroImage`   | X                 | 상단 대표 이미지. 글의 이미지 폴더에 두고 상대 경로로 지정(아래 "이미지" 참고). 생략 시 기본 썸네일 사용 |
| `draft`       | X (기본값 `true`) | `true`면 배포 시 목록/상세/RSS에서 제외. 공개하려면 `false`로 변경      |

## 콜아웃

인용문 첫 줄에 `[!종류]`를 쓰면 노션 같은 콜아웃 박스가 됩니다. `[!종류]` 뒤에 글을 쓰면 제목으로 쓰이고, 생략하면 기본 제목이 들어갑니다.

```md
> [!NOTE]
> 참고할 내용입니다.

> [!TIP] 알아두면 좋아요
> 제목을 직접 지정할 수도 있습니다.
```

| 종류 | 기본 제목 |
| --- | --- |
| `NOTE` | 참고 |
| `TIP` | 팁 |
| `IMPORTANT` | 중요 |
| `WARNING` | 주의 |
| `CAUTION` | 위험 |

`[!종류]`가 없는 인용문은 일반 인용문으로 표시됩니다. 변환 로직은 `src/plugins/remark-callout.mjs`에 있습니다.

## PR 리뷰 시 확인할 점

블로그 글 PR은 코드 리뷰가 아니라 에디토리얼 리뷰에 가깝습니다. 기술적인 문제(스키마 오류, 문법 오류)는 CI가 잡아주니, 사람은 PR 템플릿 체크리스트(`draft` 상태, 오탈자, 민감정보, 링크, 이미지 용량) 위주로 훑어보면 됩니다.

## 코드/설정 변경

글이 아닌 코드나 설정을 변경하는 경우, 일반적인 PR 워크플로우를 따르면 됩니다. PR 템플릿의 체크리스트는 블로그 글 기준이니 무시하고 자유 형식으로 설명을 작성해도 됩니다.

## 로컬 개발 환경

```bash
npm install
npm run dev       # 개발 서버
npm run build     # 프로덕션 빌드 (CI와 동일)
npm run preview   # 빌드 결과 미리보기
npm test          # 플러그인, 글 생성 스크립트 테스트
```

Node.js `>=22.12.0`이 필요합니다.
