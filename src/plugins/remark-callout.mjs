// Sätteri (mdast) plugin that turns GitHub-style alerts into callout boxes:
//
//   > [!NOTE] 선택적 제목
//   > 내용
//
// Blockquotes without a `[!TYPE]` marker are left untouched.

export const CALLOUT_TYPES = {
	note: '참고',
	tip: '팁',
	important: '중요',
	warning: '주의',
	caution: '위험',
};

const MARKER = /^\[!(\w+)\][ \t]*([^\n]*)\n?/;

export default {
	name: 'callout',
	blockquote(node, ctx) {
		const paragraph = node.children[0];
		const text = paragraph?.type === 'paragraph' ? paragraph.children[0] : undefined;
		if (text?.type !== 'text') return;

		const match = MARKER.exec(text.value);
		const type = match?.[1].toLowerCase();
		if (!match || !Object.hasOwn(CALLOUT_TYPES, type)) return;

		const title = match[2].trim() || CALLOUT_TYPES[type];
		const rest = text.value.slice(match[0].length);

		if (rest) {
			ctx.setProperty(text, 'value', rest);
		} else if (paragraph.children.length === 1) {
			ctx.removeChildAt(node, 0);
		} else {
			ctx.removeChildAt(paragraph, 0);
		}

		ctx.insertChildAt(node, 0, {
			type: 'paragraph',
			data: { hName: 'p', hProperties: { className: ['callout-title'] } },
			children: [{ type: 'text', value: title }],
		});
		ctx.setProperty(node, 'data', {
			hName: 'div',
			hProperties: { className: ['callout', `callout-${type}`] },
		});
	},
};
