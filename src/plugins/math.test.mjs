import assert from 'node:assert/strict';
import { test } from 'node:test';
import { markdownToHtml } from 'satteri';
import math from './math.mjs';

const render = (md) =>
	markdownToHtml(md, { features: { math: true }, mdastPlugins: [math] }).html;

test('renders inline math with KaTeX', () => {
	const html = render('식 $E=mc^2$ 입니다');

	assert.match(html, /<span class="katex">/);
	assert.doesNotMatch(html, /\$E=mc\^2\$/);
	assert.doesNotMatch(html, /katex-display/);
});

test('renders block math in display mode', () => {
	const html = render('$$\n\\sum_{i=1}^n i\n$$');

	assert.match(html, /katex-display/);
});

test('shows an error instead of throwing on invalid TeX', () => {
	const html = render('$\\notacommand{$');

	assert.match(html, /katex/);
});

test('leaves a lone dollar sign untouched', () => {
	const html = render('가격은 $5 입니다');

	assert.doesNotMatch(html, /katex/);
	assert.match(html, /\$5/);
});
