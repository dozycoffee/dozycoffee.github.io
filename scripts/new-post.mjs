#!/usr/bin/env node
// npm run new-post -- "포스트 제목" "Learn|Tech|Project" ["작성자"]
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CATEGORIES = ['Learn', 'Tech', 'Project'];

const [, , titleArg, categoryArg, authorArg] = process.argv;

if (!titleArg || !categoryArg) {
	console.error('사용법: npm run new-post -- "포스트 제목" "Learn|Tech|Project" ["작성자"]');
	process.exit(1);
}

if (!CATEGORIES.includes(categoryArg)) {
	console.error(`category는 ${CATEGORIES.join(' 또는 ')} 중 하나여야 합니다.`);
	process.exit(1);
}

const slug = titleArg
	.trim()
	.toLowerCase()
	.replace(/[^a-z0-9가-힣\s-]/g, '')
	.replace(/\s+/g, '-');

if (!slug) {
	console.error('제목에서 유효한 파일명을 만들 수 없습니다. 영문/숫자/한글을 포함해 주세요.');
	process.exit(1);
}

const author =
	authorArg ??
	(() => {
		try {
			return execSync('git config user.name').toString().trim();
		} catch {
			return '';
		}
	})();

if (!author) {
	console.error('작성자를 확인할 수 없습니다. npm run new-post -- "제목" "작성자" 형태로 실행해 주세요.');
	process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
// NEW_POST_ROOT lets tests write somewhere other than the repo.
const root = process.env.NEW_POST_ROOT ?? join(__dirname, '..');
const articleDir = join(root, 'src', 'content', 'article');
const imageDir = join(root, 'src', 'assets', 'article', slug);
const filePath = join(articleDir, `${slug}.md`);

if (existsSync(filePath)) {
	console.error(`이미 같은 이름의 글이 존재합니다: ${filePath}`);
	process.exit(1);
}

const pubDate = new Date().toISOString().slice(0, 10);

const frontmatter = `---
title: '${titleArg.replace(/'/g, "''")}'
description: ''
author: '${author.replace(/'/g, "''")}'
category: '${categoryArg}'
tags: []
pubDate: '${pubDate}'
# heroImage: '../../assets/article/${slug}/thumbnail.webp'
draft: true
---

`;

mkdirSync(articleDir, { recursive: true });
mkdirSync(imageDir, { recursive: true });
writeFileSync(filePath, frontmatter);

console.log(`생성됨: ${filePath}`);
console.log(`이미지 폴더: ${imageDir} (썸네일과 본문 이미지를 여기에 넣으세요)`);
console.log('draft: true로 생성되었습니다. 공개하려면 draft를 false로 변경하세요.');
