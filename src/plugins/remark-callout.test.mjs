import assert from 'node:assert/strict';
import { test } from 'node:test';
import { markdownToHtml } from 'satteri';
import callout from './remark-callout.mjs';

const render = (md) => markdownToHtml(md, { mdastPlugins: [callout] }).html;

test('converts [!NOTE] blockquote into a callout with the default title', () => {
	const html = render('> [!NOTE]\n> 내용입니다');

	assert.match(html, /<div class="callout callout-note">/);
	assert.match(html, /<p class="callout-title">참고<\/p>/);
	assert.match(html, /<p>내용입니다<\/p>/);
	assert.doesNotMatch(html, /\[!NOTE\]/);
});

test('uses the text after the marker as a custom title', () => {
	const html = render('> [!tip] 알아두면 좋아요\n> 본문');

	assert.match(html, /callout-tip/);
	assert.match(html, /<p class="callout-title">알아두면 좋아요<\/p>/);
	assert.match(html, /<p>본문<\/p>/);
});

test('handles a marker-only first paragraph followed by more blocks', () => {
	const html = render('> [!WARNING]\n>\n> 다음 문단\n>\n> - 항목');

	assert.match(html, /callout-warning/);
	assert.match(html, /<p class="callout-title">주의<\/p>/);
	assert.match(html, /<p>다음 문단<\/p>/);
	assert.match(html, /<li>항목<\/li>/);
});

test('leaves regular blockquotes and unknown types untouched', () => {
	assert.match(render('> 그냥 인용문'), /<blockquote>/);
	const unknown = render('> [!FOO]\n> 내용');
	assert.match(unknown, /<blockquote>/);
	assert.doesNotMatch(unknown, /callout/);
});
