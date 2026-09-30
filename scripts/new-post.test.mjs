import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./new-post.mjs', import.meta.url));

const run = (root, ...args) =>
	execFileSync('node', [script, ...args], {
		env: { ...process.env, NEW_POST_ROOT: root },
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'pipe'],
	});

test('creates the post file and its image folder', () => {
	const root = mkdtempSync(join(tmpdir(), 'new-post-'));
	try {
		run(root, '테스트 글 제목', 'Tech', '작성자');

		const post = join(root, 'src/content/article/테스트-글-제목.md');
		const images = join(root, 'src/assets/article/테스트-글-제목');
		assert.ok(existsSync(post));
		assert.ok(existsSync(images));

		const content = readFileSync(post, 'utf8');
		assert.match(content, /title: '테스트 글 제목'/);
		assert.match(content, /# heroImage: '..\/..\/assets\/article\/테스트-글-제목\/thumbnail.webp'/);
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
});

test('accepts the Learn category', () => {
	const root = mkdtempSync(join(tmpdir(), 'new-post-'));
	try {
		run(root, '배운 것', 'Learn', '작성자');
		const content = readFileSync(join(root, 'src/content/article/배운-것.md'), 'utf8');
		assert.match(content, /category: 'Learn'/);
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
});

test('refuses to overwrite an existing post', () => {
	const root = mkdtempSync(join(tmpdir(), 'new-post-'));
	try {
		run(root, 'same title', 'Tech', '작성자');
		assert.throws(() => run(root, 'same title', 'Tech', '작성자'));
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
});

test('rejects an unknown category', () => {
	const root = mkdtempSync(join(tmpdir(), 'new-post-'));
	try {
		assert.throws(() => run(root, 'title', 'Unknown', '작성자'));
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
});
