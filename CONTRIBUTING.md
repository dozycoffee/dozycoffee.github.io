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

   `src/content/blog/글-제목.md` 파일이 아래처럼 생성됩니다.

   ```md
   ---
   title: '글 제목'
   description: ''
   author: '작성자 이름'
   category: 'Tech'
   tags: []
   pubDate: '2026-09-29'
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
| `heroImage`   | X                 | 상단 대표 이미지. `src/assets/`에 이미지를 두고 상대 경로로 지정. 생략 시 기본 썸네일 사용 |
| `draft`       | X (기본값 `true`) | `true`면 배포 시 목록/상세/RSS에서 제외. 공개하려면 `false`로 변경      |

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
```

Node.js `>=22.12.0`이 필요합니다.
